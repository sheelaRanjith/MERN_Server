const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ----------------------
// Connect to Database
// ----------------------
connectDB();

// ----------------------
// API Routes
// ----------------------
app.use("/api/user", require("./routes/UserRoutes"));

// ----------------------
// Serve React build (Frontend)
// ----------------------
const clientBuildPath = path.join(__dirname, "../client/build");

if (process.env.NODE_ENV === "production") {
  app.use(express.static(clientBuildPath));

  // SPA routing fix: use /* instead of *
  app.get("/*", (req, res) => {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  });
}

// ----------------------
// Server Port
// ----------------------
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
