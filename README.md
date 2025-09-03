# 📌 Project Management App

A full-stack project management web application built with **MERN stack (MongoDB, Express, React, Node.js)** and Vite for the frontend.  
The app simplifies project submission, team collaboration, and mentor approval in a structured workflow.

---

## 🚀 Features

- **Login with Email only** (Students and Mentors)
- **Project Submission:**
  - A student submits a project with title + synopsis
  - Adds other students as team members (by email)
- **Team Member Responses:**
  - Invited students can Accept / Reject project invitations
  - If any member rejects → project is rejected
  - If all accept → project goes to mentor
- **Mentor Approval:**
  - Mentor can Approve / Reject projects
  - Only approved projects are saved permanently in the database

---

## 🛠 Tech Stack

- **Frontend:** React (Vite), Axios, React Router
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Mongoose ODM)
- **Auth & Security:** JWT (for sessions), CORS, dotenv

---

## 📂 Project Structure

project-management-app/
│
├── backend/ # Express + MongoDB API
│ ├── config/ # Database connection
│ ├── controllers/ # Request handlers
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API endpoints
│ ├── middleware/ # Auth middlewares
│ ├── server.js # Entry point
│
├── frontend/ # React + Vite frontend
│ ├── src/
│ │ ├── pages/ # Login, Dashboard, Project, Mentor
│ │ ├── components/ # Navbar, ProjectCard, etc.
│ │ ├── services/ # Axios API calls
│ │ └── context/ # Auth context / state management
│
└── README.md

👨‍💻 Author

Dhiraj — Student at Gurukul Kangri University
