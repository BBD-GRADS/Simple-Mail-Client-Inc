const express = require("express");
const { json } = require("express");
const authRoutes = require("./routes/authRoutes");
const emailRoutes = require("./routes/emailRoutes");
const authenticateSession = require("./middleware/authMiddleware");
const { port } = require("./config");
const path = require("path");

const app = express();

// Middlewares
app.use(json());

// Routes
//app.use("/auth", authRoutes);
// app.get("/test", authenticateSession, (req, res) => {
//   res.json({ message: "Authenticated!", user: req.user });
// });

app.use("/email", emailRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Best API EU" });
});

module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
