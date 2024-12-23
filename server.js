// server.js: Main entry point
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

const port = process.env.APP_PORT;
const dbUrl = process.env.DATABASE_HOST + "/" + process.env.DATABASE_NAME;
// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", require("./routes/user.routes"));
app.use("/api/transactions", require("./routes/transaction.routes"));
app.use("/api/earnings", require("./routes/earning.routes"));

// Connect to MongoDB

mongoose
  .connect(dbUrl, {
    serverSelectionTimeoutMS: 5000,
    autoCreate: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Error connecting to MongoDB:", error));

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
// Socket.IO Connection
io.on("connection", (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Listen for events from clients
  socket.on("disconnect", () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Notify clients in real-time (Example)
function notifyUserAboutEarnings(userId, earnings) {
  io.emit("earningsUpdate", { userId, earnings });
}

// Start the server
app.listen(port, () => {
  console.log(
    `Server running at ${process.env.APP_SCHEMA}://${process.env.APP_HOST}:${port}`
  );
});

module.exports = { notifyUserAboutEarnings };
