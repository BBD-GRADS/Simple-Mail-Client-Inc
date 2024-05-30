const express = require("express");
const { json } = require("express");
const emailRoutes = require("./routes/emailRoutes");
const authenticateSession = require("./middleware/authMiddleware");
const { port, frontendUrl } = require("./config");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require('path');


const app = express();

// Middlewares
app.use(bodyParser.json({ limit: "10mb" }));

const corsOptions = {
  origin: frontendUrl,
  credentials: true, // to allow cookies to be sent
};
app.use(cors(corsOptions));

// Routes
app.use("/email", authenticateSession, emailRoutes);

app.use(express.static(path.join(__dirname, "..", "../client")));
 
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "../client/public/index.html"));
});



module.exports = app;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
