const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const salonRoutes = require("./routes/salons");
const bookingRoutes = require("./routes/bookings");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/salons", salonRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/", (req, res) => {
  res.json({
    message: "Lumiere App API is running",
    endpoints: {
      health: "/api/health",
      salons: "/api/salons",
      bookings: "/api/bookings",
      users: "/api/users",
      auth: "/api/auth"
    }
  });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.method} ${req.url}` });
});

app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`⚠️ API: http://localhost:${PORT}/api`);
  console.log(`✔ Health: http://localhost:${PORT}/api/health`);
});
