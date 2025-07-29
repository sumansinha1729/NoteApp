# 📝 Note App

A full-stack Notes app built with **TypeScript**, **Express.js**, **MongoDB**, and **React + Vite**. It includes OTP-based authentication, note creation/deletion features, and mobile-first UI design.

---

## 📁 Project Structure

note-app/
├── server/ # Express + MongoDB backend
│ ├── controllers/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ ├── utils/
│ ├── config/
│ ├── index.ts # Backend entry point
│ └── .env
└── client/ # Vite + React frontend
├── src/
├── public/
├── vite.config.ts
└── .env


---

## 🚀 Features

- OTP-based signup & login via email
- JWT authentication (stored in localStorage)
- Add/delete notes per user
- Mobile-first design (with responsive desktop view)
- Separate backend and frontend projects
- Deployed via **Render** (backend) and **Vercel** (frontend)

---

## 🔧 Technologies Used

### Backend
- Node.js, Express, TypeScript
- MongoDB + Mongoose
- JWT for authentication
- Nodemailer for sending OTPs

### Frontend
- React + Vite + TypeScript
- Axios for API requests
- Tailwind CSS for styling
- React Router

---

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sumansinha1729/NoteApp
cd note-app



1. Setup Backend

cd server
npm install


Create .env file in /server

env
Copy
Edit
PORT=5000
MONGODB_URI=your-mongodb-uri
JWT_SECRET=your-jwt-secret
MAIL_USER=your-gmail@example.com
MAIL_PASS=your-app-password

📝 Make sure the Gmail account has App Password enabled (for Nodemailer to send OTP).

Run in development
bash
Copy
Edit
npm run dev



2. Setup Frontend

cd ../client
npm install

Create .env file in /client
VITE_API_URL=http://localhost:5000/api

Run the frontend
npm run dev

The app should now be running at http://localhost:5173 



🌐 Deployment
Backend (Render)
1. Go to https://render.com
2.Click New Web Service
3.Connect GitHub repo (choose note-app)
4.Set root directory to /server
5.Set build command: npm run build
6.Set start command: npm start
7.Add the following environment variables (same as your .env file)


After deployment, note your Render backend URL, e.g.:

https://note-api.onrender.com



Frontend (Vercel)
1.Go to https://vercel.com
2.Click New Project
3.Import from GitHub
4.Set root directory to /client
5.Add this environment variable:

.env
VITE_API_URL=https://noteapp-backend-eb23.onrender.com/api

6.Deploy and done ✅


🧪 Testing the App
1.Open frontend (/client)
2.Sign up using a valid email
3.Check OTP in the email inbox
4.Log in and start taking notes!

📬 Contact
Made with 💙 by Suman Sinha
Email: sumansinha437@gmail.com
GitHub: https://github.com/sumansinha1729