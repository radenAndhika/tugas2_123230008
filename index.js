// Import Package dan File
const express = require("express");
const path = require("path");
const sequelize = require("./config/database");
const noteRoutes = require("./routes/noteRoutes");

// Inisialisasi Express dan Cors
const app = express();
const cors = require("cors");

// Izinkan origin frontend lokal yang umum dipakai saat development
app.use(cors({
  origin: ['http://localhost', 'http://localhost:5173', 'http://127.0.0.1:5500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true // Jika butuh kirim cookie/session
}));

// Middleware untuk parsing JSON
app.use(express.json());

// Frontend utama
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/styles.css", (req, res) => {
  res.sendFile(path.join(__dirname, "styles.css"));
});

app.get("/app.js", (req, res) => {
  res.sendFile(path.join(__dirname, "app.js"));
});

// Setting Routes
require("./schema/Note"); // Untuk generate Tabel Notes
app.use("/api/v1/notes", noteRoutes); // Untuk setting routes notes

// Jalankan Server terlebih dahulu agar Cloud Run health check lulus
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);

  // Sync Database dengan retry
  const syncDB = (attempt = 1) => {
    sequelize.sync()
      .then(() => {
        console.log("Database synced successfully");
      })
      .catch((err) => {
        console.error(`Database sync attempt ${attempt} failed:`, err.message);
        if (attempt < 5) {
          console.log(`Retrying in 5 seconds...`);
          setTimeout(() => syncDB(attempt + 1), 5000);
        } else {
          console.error("Database sync failed after 5 attempts.");
        }
      });
  };

  syncDB();
});
