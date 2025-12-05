import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
try {
     const token = req.headers.token;

     if (!token) {
     return res.json({ success: false, message: "No token provided" });
     }

     const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;  // <-- MAIN FIX (tutorial method)

     next();
} catch (error) {
     return res.json({ success: false, message: "Invalid token" });
     }
};

export default userAuth;
