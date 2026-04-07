const express = require("express");
const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());

// Demo endpoints
app.post("/activate", (req, res) => {
  res.json({ message: "✅ تم التفعيل (Demo)" });
});

app.post("/stop", (req, res) => {
  res.json({ message: "🛑 تم الإيقاف (Demo)" });
});

// IMPORTANT FOR RENDER
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("🔥 Server running on port " + PORT);
});
