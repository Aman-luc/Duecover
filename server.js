const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const Due = require("./models/Due");



//MongoDB Connection
async function connectDB() {
  try {
    console.log("Trying MongoDB connection...");
    await mongoose.connect(
      "mongodb+srv://Aman-duecover:aman123@cluster0.d8culuw.mongodb.net/duecover"
    );
    console.log("MongoDB connected ✅");
  } catch (error) {
    console.error("MongoDB connection error ❌:", error.message);
  }
}

connectDB();


// ✅ CORS CONFIG (IMPORTANT)
app.use(cors({
  origin: "http://127.0.0.1:5500",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(express.json());

app.get("/dues", async (req, res) => {
  const dues = await Due.find().sort({ createdAt: -1 });
  res.json(dues);
});


app.post("/add-due", async (req, res) => {
  try {
    const due = new Due(req.body);
    await due.save();

    console.log("Saved in DB 👉", due);
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false });
  }
});



app.get("/dues", (req, res) => {
  res.json(dues);
});




