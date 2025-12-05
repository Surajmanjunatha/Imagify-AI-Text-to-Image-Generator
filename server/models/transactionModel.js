import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId, // ✅ FIXED
    ref: "users",
    required: true
  },
  planId: { type: String, required: true },      // e.g., Basic / Advanced
  planName: { type: String, required: true },    // readable name
  amount: { type: Number, required: true },      // ₹ amount (not paise)
  credits: { type: Number, required: true },
  payment: { type: Boolean, default: false },

  razorpayOrderId: { type: String },             // ✅ required for verify
  razorpayPaymentId: { type: String },           // (filled during verify)

}, { timestamps: true });                        // auto date

const transactionModel =
  mongoose.models.transaction ||
  mongoose.model("transaction", transactionSchema);

export default transactionModel;
