const express = require("express");
const path = require("path");
const app = express();

// Serve API routes
app.use("/api/user", require("./routes/UserRoutes"));

// Serve React build folder
const clientBuildPath = path.join(__dirname, "../client/build");
app.use(express.static(clientBuildPath));

// SPA fallback: serve index.html for unknown routes
app.use((req, res, next) => {
  // Only for GET requests (ignore API calls)
  if (req.method === "GET" && !req.path.startsWith("/api")) {
    res.sendFile(path.join(clientBuildPath, "index.html"));
  } else {
    next();
  }
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
