# 🌟 **IMAGIFY — AI TEXT-TO-IMAGE SAAS**

> *Turn your words into stunning visuals — powered by ClipDrop AI and built with MERN + Vite.*

---

<p align="center">

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
<img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" />
<img src="https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
<img src="https://img.shields.io/badge/Razorpay-02042B?style=for-the-badge&logo=razorpay&logoColor=white" />
<img src="https://img.shields.io/badge/ClipDrop%20API-FF6C37?style=for-the-badge" />
<img src="https://img.shields.io/badge/Framer%20Motion-E415A8?style=for-the-badge&logo=framer&logoColor=white" />
<img src="https://img.shields.io/badge/React--Toastify-FF9800?style=for-the-badge" />
<img src="https://img.shields.io/badge/Deploy-Render-46E3B7?logo=render&logoColor=white" />

</p>

<p align="center">
  <img src="client/src/assets/screenshot1.png" width="45%" />
  <img src="client/src/assets/screenshot2.png" width="45%" />
</p>

<p align="center">
  <img src="client/src/assets/screenshot3.png" width="45%" />
  <img src="client/src/assets/screenshot4.png" width="45%" />
</p>

---
## 🚀 The project is live on  
👉 [Click here to view the live site][![Deployed on Render](https://img.shields.io/badge/Deployed%20on-Render-blue?logo=render)](https://imagify-ai-text-to-image-generator-woww.onrender.com/)

# ⭐ **Project Overview (STAR Method)**

## **S — Situation**

Creating visuals often requires skill, time, and design tools. Many AI image tools are expensive or lack a smooth credit-based workflow. Imagify solves this with a simple, powerful, credit-based AI image generator.

---

## **T — Task**

Build a SaaS where users can:

* Register/login securely
* Generate AI images from prompts
* Get 5 free credits on signup
* Buy more credits using Razorpay
* Store user & transaction data in MongoDB
* Enjoy smooth UI animations

---

## **A — Action**

### 🔐 Implemented Authentication

* JWT-based login/signup
* Protected backend routes with middleware

### 🧩 Backend Architecture

* Node + Express for APIs
* MongoDB connection via `mongodb.js`
* Controllers for images & users
* Separate route files for clean structure

### 🤖 ClipDrop AI Integration

* Converts text prompts into professional images
* Deducts credits automatically

### 💳 Razorpay Payment Gateway

* Three credit plans
* Verified payments server-side
* Stores transactions to MongoDB

### 🎨 Frontend (React + Vite)

* Fast UI builds via Vite
* Framer Motion animations
* Toast notifications
* Context API for auth & credits
* Organized as pages, components & assets

---

## **R — Result**

Imagify delivers:

* ⚡ Instant text-to-image generation
* 🔐 Secure JWT-protected workflows
* 💳 Real Razorpay payment integration
* ✔️ Clean UI with animations
* 🔄 Full credit system & transaction history

A fully functional SaaS project demonstrating real-world payment flow, authentication, API integration & scalable architecture.

---

# 🚀 **Features**

* AI image generator using ClipDrop
* JWT Authentication
* Credit system (5 free + paid plans)
* Razorpay checkout
* Smooth UI animations
* Toast notifications
* Fast builds with Vite

---

# 🛠 **Tech Stack**

### **Frontend**

* React
* Vite
* Framer Motion
* React-Toastify

### **Backend**

* Node.js
* Express.js
* JWT Authentication
* Razorpay SDK
* ClipDrop API

### **Database**

* MongoDB + Mongoose

---

# 📥 Installation & Setup

## Clone Repository

```bash
git clone https://github.com/yourusername/imagify.git
cd imagify
```

---

# 🧩 Frontend Setup

```bash
cd client
npm install
npm run dev
```

### Frontend `.env`

```
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key
```

---

# 🔧 Backend Setup

```bash
cd server
npm install
npm run server
```

### Backend `.env`

```
MONGO_URI=your_mongo_uri
JWT_SECRET=your_secret
CLIPDROP_API_KEY=your_clipdrop_key

RAZORPAY_KEY_ID=your_key_id
RAZORPAY_KEY_SECRET=your_secret
```

---

# 📂 Folder Structure 

## **Client (React + Vite)**

```
client/
│
├── index.html
├── .env
│
└── src/
    ├── assets/
    │
    ├── components/
    │
    ├── context/
    │
    ├── pages/
    │
    ├── App.jsx
    ├── main.jsx
    └── index.css
```

---

## **Server (Node + Express)**

```
server/
│
├── server.js
├── .env
│
├── config/
│   └── mongodb.js
│
├── controllers/
│   ├── imageController.js
│   └── userController.js
│
├── middlewares/
│   └── auth.js
│
├── models/
│   ├── transactionModel.js
│   └── usermodel.js
│
└── routes/
    ├── imageRoutes.js
    └── userRoutes.js
```

---

# 📌 API Overview

### **User API**

| Method | Route                | Description       |
| ------ | -------------------- | ----------------- |
| POST   | `/api/user/register` | Register new user |
| POST   | `/api/user/login`    | User login        |

### **AI Image API**

| POST | `/api/image/generate` | Generate AI image (requires auth) |

### **Payment API**

| POST | `/api/user/create-order` | Create Razorpay order |
| POST | `/api/user/verify-payment` | Verify payment & credit user |

---

# 🙌 Contributing

PRs, suggestions & enhancements are welcome!

---

# 📝 License

MIT License © 2025 Imagify

---
