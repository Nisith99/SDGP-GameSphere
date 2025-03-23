import express from "express";
import User from "../models/user.model.js";

const router = express.Router();

console.log("stats.route.js loaded");

router.post("/test-user", async (req, res) => {
    try {
      const testUser = new User({
        name: "Test User",
        username: "testuser" + Date.now(),
        email: "test" + Date.now() + "@example.com",
        password: "$2a$10$yhZjauvfsm.4fY5MWRYdrOoUkbpbJ/TwKtYV882dYKg/4fNW71kdG",
        averageRating: 4.5,
        achievements: [
          { rankType: "district", rankValue: "1", score: 100 },
          
        ],
      });
      await testUser.save();
      console.log("Test user added:", testUser);
      res.status(201).json({ message: "Test user added", user: testUser });
    } catch (error) {
      console.error("Error adding test user:", error);
      res.status(500).json({ message: "Error adding test user", error });
    }
});

router.get("/test", async (req, res) => {
  try {
    const users = await User.find().select("name").lean();
    console.log("Test route hit, users found:", users);
    res.status(200).json(users);
  } catch (error) {
    console.error("Test route error:", error);
    res.status(500).json({ message: "Test failed", error });
  }
});

export default router;