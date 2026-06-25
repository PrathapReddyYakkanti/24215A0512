const express = require("express");
const cors = require("cors");
const Log = require("./logger");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
  await Log(
    "backend",
    "info",
    "route",
    "Root endpoint accessed successfully"
  );

  res.json({
    message: "Logging Middleware Working",
  });
});

app.get("/error", async (req, res) => {
  await Log(
    "backend",
    "error",
    "route",
    "Dummy error endpoint called"
  );

  res.status(500).json({
    message: "Dummy Error",
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});