const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/userRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Initialize Express app
const app = express();

// Load environment variables
dotenv.config();

if (!process.env.DB_URI) {
  console.error("Error: DB_URI is not set in .env file");
  process.exit(1);
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI);
    console.log("Connected to the database");
  } catch (err) {
    console.error("Database connection error:", err.message);
    process.exit(1);
  }
};

// Middleware setup
const corsOptions = {
  origin: "https://timely-entremet-ff9eb7.netlify.app", // Replace with your frontend's URL
  // origin: "http://localhost:3000",
  credentials: true, // Allow credentials (cookies, authorization headers)
  // optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/auth", authRoutes);
app.use("/task", taskRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("Hello World");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

// Start server and connect to the database
const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 3006;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error.message);
    process.exit(1);
  }
};

startServer();
