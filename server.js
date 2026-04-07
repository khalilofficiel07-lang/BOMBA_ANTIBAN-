const express = require("express");
const path = require("path");

const app = express();

// Static files
app.use(express.static(path.join(__dirname, "public")));

// FIX: route /
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use(express.json());

// Demo APIs
app.post("/activate", (req, res) => {
  res.json({ message: "✅ تم التفعيل (Demo)" });
});

app.post("/stop", (req, res) => {
  res.json({ message: "🛑 تم الإيقاف (Demo)" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🔥 Server running on port " + PORT);
});
