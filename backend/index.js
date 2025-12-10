const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/storeRatings")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const RatingSchema = new mongoose.Schema({
  storeName: String,
  rating: Number,
  review: String,
});

const Rating = mongoose.model("Rating", RatingSchema);

app.get("/", (req, res) => {
  res.send("Backend Working!");
});

app.post("/rate", async (req, res) => {
  const { storeName, rating, review } = req.body;

  try {
    const newRating = new Rating({ storeName, rating, review });
    await newRating.save();
    res.json({ message: "Rating saved!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving rating" });
  }
});

app.get("/ratings", async (req, res) => {
  const ratings = await Rating.find();
  res.json(ratings);
});

app.listen(5000, () => console.log("Server running on port 5000"));
