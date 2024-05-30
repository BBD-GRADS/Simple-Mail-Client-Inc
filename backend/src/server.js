const express = require("express");
const { json } = require("express");
const emailRoutes = require("./routes/emailRoutes");
const authenticateSession = require("./middleware/authMiddleware");
const { port } = require("./config");

const app = express();

// Middlewares
app.use(json());

// Routes
app.use("/email", authenticateSession, emailRoutes);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Best API EU" });
});

module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
