import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [storeName, setStoreName] = useState("");
  const [rating, setRating] = useState("");
  const [review, setReview] = useState("");
  const [ratings, setRatings] = useState([]);

  const loadRatings = async () => {
    const r = await axios.get("http://localhost:5000/ratings");
    setRatings(r.data);
  };

  useEffect(() => {
    loadRatings();
  }, []);

  const submitRating = async () => {
    await axios.post("http://localhost:5000/rate", {
      storeName,
      rating,
      review,
    });

    alert("Rating saved!");
    loadRatings();
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Store Rating App</h1>

      <input
        type="text"
        placeholder="Store Name"
        onChange={(e) => setStoreName(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Rating"
        onChange={(e) => setRating(e.target.value)}
      />
      <br /><br />

      <textarea
        placeholder="Write review"
        onChange={(e) => setReview(e.target.value)}
      ></textarea>

      <br /><br />
      <button onClick={submitRating}>Submit Rating</button>

      <h2>All Ratings</h2>
      {ratings.map((r) => (
        <div
          key={r._id}
          style={{
            border: "1px solid gray",
            padding: "10px",
            marginTop: "10px",
          }}
        >
          <h3>{r.storeName}</h3>
          <p>⭐ {r.rating}</p>
          <p>{r.review}</p>
        </div>
      ))}
    </div>
  );
}

export default App;
