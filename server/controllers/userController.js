import userModel from "../models/usermodel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import razorpay from 'razorpay'
import transactionModel from "../models/transactionModel.js";

const registerUser = async (req, res) => {
     try{
          const {name, email, password} = req.body;

          if(!name || !email || !password){
               return res.json({success: false, message: 'Missing details'})
          }

          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)

          const userData = {
               name,
               email,
               password : hashedPassword
          }

          const newUser = new userModel(userData)
          const user = await newUser.save()

          const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);

          res.json({success: true, token, user: {name: user.name, _id: user._id}})

     } catch(error) {
          console.log(error)
          res.json({success: false, message: error.message})
     }
}

const loginUser = async (req, res)=>{
     try {
          const {email,password} = req.body
          const user = await userModel.findOne({email})

          if(!user){
               return res.json({success: false, message: 'User does not exist'})
          }
          const isMatch = await bcrypt.compare(password, user.password)

          if(isMatch){
               const token = jwt.sign({id: user._id}, process.env.JWT_SECRET)
               res.json({success: true, token, user: {name: user.name, _id: user._id}})
          }else{
               return res.json({success: false, message: 'Invalid credentials'})
          }
     } catch (error) {
          console.log(error)
          res.json({success: false, message: error.message})
     }
}

const userCredits = async (req, res)=>{
     try {
          const userId = req.userId;

          const user = await userModel.findById(userId)
          res.json({success: true, credits: user.creditBalance, user: {name: user.name, _id: user._id}})

     } catch (error) {
          console.log(error.message)
          res.json({success: false, message: error.message})
     }
}

const razorpayInstance = new razorpay({
     key_id : process.env.RAZORPAY_KEY_ID,
     key_secret : process.env.RAZORPAY_KEY_SECRET,
});

const PLANS = {
  Basic: { name: "Basic", credits: 100, amount: 100 },
  Advanced: { name: "Advanced", credits: 500, amount: 250 },
  Business: { name: "Business", credits: 5000, amount: 400 }
};

const paymentRazorpay = async (req, res) => {
  try {
    const userId = req.userId;
    const { planId } = req.body;

    if (!userId || !planId) {
      return res.json({ success: false, message: "Missing details" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    const plan = PLANS[planId];
    if (!plan) return res.json({ success: false, message: "Invalid plan" });

    const transaction = await transactionModel.create({
      userId,
      planId,
      planName: plan.name,
      amount: plan.amount,
      credits: plan.credits
    });

    const options = {
      amount: plan.amount * 100,
      currency: "INR",
      receipt: transaction._id.toString()
    };

    const order = await razorpayInstance.orders.create(options);

    transaction.razorpayOrderId = order.id;
    await transaction.save();

    res.json({ success: true, order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

import crypto from "crypto";

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.json({ success: false, message: "Incomplete payment data" });
    }

    // Validate signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(sign)
      .digest("hex");

    if (expectedSign !== razorpay_signature) {
      return res.json({ success: false, message: "Payment verification failed" });
    }

    // Fetch order info
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    const transactionId = orderInfo.receipt;

    const transaction = await transactionModel.findById(transactionId);
    if (!transaction)
      return res.json({ success: false, message: "Transaction not found" });

    if (transaction.payment)
      return res.json({ success: false, message: "Payment already processed" });

    const user = await userModel.findById(transaction.userId);
    if (!user)
      return res.json({ success: false, message: "User not found" });

    // Add credits
    user.creditBalance += transaction.credits;
    await user.save();

    // Mark payment done
    transaction.payment = true;
    transaction.razorpayPaymentId = razorpay_payment_id;
    await transaction.save();

    res.json({ success: true, message: "Credits added successfully" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};


export {registerUser, loginUser, userCredits, paymentRazorpay, verifyRazorpay};

