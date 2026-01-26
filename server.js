const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");          // ✅ ADD THIS
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

// 🔥 MUST BE BEFORE ROUTES
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// API routes
app.use("/api/user", require("./routes/UserRoutes"));

// React build
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// SPA fallback
app.use((req, res, next) => {
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
