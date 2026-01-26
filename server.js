const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const connectDB = require("./config/db"); // 👈 DB import

dotenv.config(); // 👈 env load
connectDB();     // ✅ IMPORTANT (idhu missing before)

const app = express();

// Middleware
app.use(express.json());

// API routes
app.use("/api/user", require("./routes/UserRoutes"));

// Serve React build
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// SPA fallback
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
