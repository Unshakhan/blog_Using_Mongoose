const express = require("express");
const mongoose = require("mongoose");
const Topic = require("../model/Topic");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("Connected to MongoDB");
})
.catch((err)=>{
    console.error("Error connecting to MongoDB:", err);
})

// ✅ HOME ROUTE
app.get("/",  (req, res) => {
  res.send("Backend API is running...");
});


// 📌 GET ALL TOPICS
app.get("/topics", async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

app.post("/topics", async (req, res) => {
  const {name, desc } = req.body;
  if (!name || !desc) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }

  try {
    const newTopic = new Topic({ name, desc });
    await newTopic.save();
    res.status(201).json(newTopic);
  } catch (error) {
    res.status(500).json({
      message: "Error creating topic"
    });
  }
});

// 🔍 PARAMS SEARCH (MAIN IMPORTANT PART)
//: iska mutlub param jo url me diya jayega, usko hum req.params se access kar sakte hain
app.get("/topic/:name", async (req, res) => {
  const name = req.params.name.toLowerCase();
  const foundTopic = await Topic.findOne({ name: name });
  

  if (!foundTopic) {
    return res.status(404).json({
      message: "Topic not found"
    });
  }

  res.json(foundTopic);
});


// 🔍 OPTIONAL: SEARCH BY ID (extra impress feature)
app.get("/topic/id/:id", async (req, res) => {
  const id = req.params.id

  const found = await Topic.findById(id)

  if (!found) {
    return res.status(404).json({
      message: "Topic not found"
    });
  }

  res.json(found);
});


module.exports = app;
