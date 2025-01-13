# 🌟 WorkGrid (MERN Stack)

![MERN](https://img.shields.io/badge/MERN-Stack-61DAFB?logo=mongodb&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=white&style=for-the-badge)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white&style=for-the-badge)
![React](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=white&style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![JWT](https://img.shields.io/badge/JWT-000000?logo=JSON%20web%20tokens&logoColor=white&style=for-the-badge)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?logo=tailwind-css&logoColor=white&style=for-the-badge)
![NPM](https://img.shields.io/badge/NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge)

---

## 📖 Table of Contents

1. [About the Project](#about-the-project)
2. [Features](#features)
3. [Demo](#demo)
4. [Screenshots](#screenshots)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contact](#contact)

---

## 📋 About the Project

The **WorkGrid** is a web application designed to help teams manage tasks, track tasks progress, and collaborate in real-time. Built with the MERN stack, it offers a modern and intuitive interface.WorkGrid combines powerful task management with engaging visual tools(Piecharts,Graphs) to enhance team productivity and project oversight.

---

## ✨ Features

- 🗂️ **Task Management**: Create, update, and assign tasks.
- 📊 **Dashboard**: View overall project progress and timelines.
- 📈 **Visualization**: Use pie charts and graphs for clear and insightful data representation.
- 📅 **Activity Timeline**: Track and visualize project milestones and activities.

---

## 🎥 Demo

[Watch the demo video](https://drive.google.com/file/d/1upQrRyZfOlg6CngRLucBqnukfN0NOYyY/view?usp=sharing ) to see the website in action.

---

## 📷 Screenshots

<img width="946" alt="Dashboard" src="https://github.com/user-attachments/assets/dbb51e2a-30ca-4d2a-a7a2-4693ac55ee22">

#

<img width="941" alt="Tasks" src="https://github.com/user-attachments/assets/4d3e6ad3-bbb3-4842-b418-050c3b5cd9a7">

---

## 📷 Diagrams

![Screenshot 2024-09-14 152934](https://github.com/user-attachments/assets/3ffedd1b-73c7-4028-bec5-d0365482956b)

#

![Screenshot 2024-09-14 152952](https://github.com/user-attachments/assets/82a91757-fb73-44a8-bcb3-c39e865a22f9)

---

## ⚙️ Frontend/Backend Installation

To run the application locally, follow these steps:

1. Clone the repository(Backend):
   ```bash
   git clone https://github.com/Alisherkhan032/hackathon-backend.git
2. Navigate to the project directory:
    ```bash
   cd hackathon-backend
3. Install dependencies for backend:
    ```bash
   npm install
4. Create a .env file and add the following environment variables(Backend):
    ```bash
   DB_URI = yourMongooseURI
   JWT_SECRET=yourJWTsecret
5. Start the server(Backend):
   ```bash
   nodemon app.js
## Register Admin

To register an admin user through Postman, follow these steps:

1. **Open Postman** and create a new `POST` request.

2. **Set the request URL** to:
   http://localhost:3006/auth/register

3. **Set the request method** to `POST`.

4. **Go to the "Body" tab** in Postman.

5. **Select "raw"** and choose `JSON` from the dropdown menu.

6. **Enter the following JSON data** in the body:
   ```json
   {
    "username": "admin",
    "email": "admin@xyz.com",
    "password": "123456789",
    "role": "admin"
   }

https://github.com/user-attachments/assets/6e8f162a-4647-47ea-922d-fab6a8281294

7. **Enter the following JSON data**
   Click "Send" to submit the request.
5. Link for Frontend
   [Go to Frontend](https://github.com/abhishekbansal2312/hackathon-frontend.git)
6. Navigate to the project directory:
    ```bash
   cd hackathon-frontend
7. Install dependencies for Frontend:
    ```bash
   npm install
8. Start the server(Frontend):
   ```bash
   npm run start


## 🚀 Usage
- Access the app at `http://localhost:3000`.
- **Create Tasks**: Use the dashboard to add new tasks.
- **Update Tasks**: Edit existing tasks from the task list.
- **Assign Tasks**: Assign tasks to team members.

## 📬 Contact

**Project Maintainer's:**

- 👤 **Ali Sher Khan, Abbas Akbar, Abhishek Bansal**
- 🔗 GitHub: [github.com/alisherkhan](https://github.com/Alisherkhan032),[github.com/abbasakbar](https://github.com/abbasakbar1221),[github.com/abhishekbansal](https://github.com/abhishekbansal2312)






