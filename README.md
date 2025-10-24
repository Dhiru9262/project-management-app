🎓 Project Management System

A full-stack MERN web application that allows students to create and manage academic projects while enabling teachers/instructors to review and approve them.

🚀 Tech Stack

Frontend: React.js, Tailwind CSS, Axios

Backend: Node.js, Express.js

Database: MongoDB (Mongoose ODM)

Authentication: Passport.js with Session & Cookies

📋 Features
🧑‍🎓 Student Features

Create a new project with details like title, course, instructor, problem statement, objective, approach, tools used, timeline, and expected outcome.

Add team members (name and email).

View all projects where the student is a team member.

👩‍🏫 Teacher Features

View all projects assigned to them as an instructor.

Review pending projects and approve or provide feedback.

⚙️ Common Features

Secure backend API routes.

Structured MongoDB schema for project management.

Real-time updates (with future WebSocket support planned).

🧩 Folder Structure
project-management/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── passport.js
│   ├── controllers/
│   │   └── projectController.js
│   ├── models/
│   │   └── Project.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── user.js
│   │   └── projectRoutes.js
│   ├── server.js
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CreateProject.jsx
│   │   │   ├── MyProjects.jsx
│   │   │   └── TeacherDashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── .env
├── package.json
└── README.md

⚙️ Installation
1️⃣ Clone the repository
git clone https://github.com/yourusername/project-management.git
cd project-management

2️⃣ Setup Backend
cd backend
npm install


Create a .env file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
SESSION_SECRET=your_session_secret
PORT=5000


Run the backend server:

npm run dev

3️⃣ Setup Frontend
cd ../frontend
npm install
npm run dev


Access the app at:
👉 http://localhost:5173

🌐 API Endpoints
Project Routes
Method	Endpoint	Description
POST	/api/projects	Create new project
GET	/api/projects/my-projects?email={email}	Get all projects of a specific student
GET	/api/projects/teacher-projects?email={email}	Get all projects assigned to a teacher
🧠 Example Project Schema
{
  title: String,
  teamMembers: [{ name: String, email: String }],
  course: { name: String, code: String },
  instructor: { name: String, email: String },
  problemStatement: String,
  objective: String,
  approach: String,
  toolsUsed: [String],
  timeline: String,
  expectedOutcome: String,
  status: { type: String, default: "Pending" }
}

📦 Future Improvements

Add real-time project updates using WebSocket or Socket.IO.

Enable file upload for project reports.

Integrate notification system for approval updates.

Role-based authentication (Student, Mentor, Admin).

👨‍💻 Contributors

Dhiraj Kumar — Developer & Designer
