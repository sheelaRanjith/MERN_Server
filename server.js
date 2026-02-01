const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();

/* =====================
   MIDDLEWARES (FIRST)
===================== */
app.use(cors({
  origin: "*", // allow Vercel frontend
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

/* =====================
   API ROUTES (FIRST!)
===================== */
app.use("/api/user", require("./routes/UserRoutes"));

/* =====================
   SERVE REACT BUILD
===================== */
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

/* =====================
   SPA FALLBACK
   (IMPORTANT FIX)
===================== */
app.get("*", (req, res) => {
  if (!req.path.startsWith("/api")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  }
});

/* =====================
   START SERVER
===================== */
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
