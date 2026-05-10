const express = require("express");
const mongoose = require("mongoose");
const Topic = require("../model/Topic");
const app = express();
const dotenv = require('dotenv');
dotenv.config();
app.use(express.json());

let isConnected = false;

const connectDB = async () => {
  if (isConnected) return;

  await mongoose.connect(process.env.MONGO_URL);
  isConnected = true;
  console.log("DB Connected");
};

app.use(async (req, res, next) => {
  await connectDB();
  next();
});

app.get("/",  (req, res) => {
  res.send("Backend API is running...");
});


// 📌 GET ALL TOPICS
app.get("/topics", async (req, res) => {
  const topics = await Topic.find();
  res.json(topics);
});

app.post("/topic", async (req, res) => {

  try {
    //For array of obj
    if(Array.isArray(req.body)){
            for (const item of req.body) {

        if (!item.name || !item.desc) {
          return res.status(400).json({
            message: "All fields are required"
          });
        }

      }
      const Topics = await Topic.insertMany(req.body)
       res.status(201).json(Topics);
    }else{
       const {name, desc } = req.body;
  if (!name || !desc) {
    return res.status(400).json({
      message: "All fields are required"
    });
  }
//for single obj
  const newTopic = new Topic({ name, desc });
    await newTopic.save();
    res.status(201).json(newTopic);
    }
  } catch (error) {
    res.status(500).json({
      message: "Error creating topic"
    });
  }
});

// 🔍 PARAMS SEARCH (MAIN IMPORTANT PART)
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

app.put("/topic/:id", async(req,res)=>{
 try{ const {id} = req.params
const {name, desc} = req.body
const updateTopic = await Topic.findByIdAndUpdate(
  id,
  {name, desc},
 { returnDocument: "after" }
)
if(!updateTopic){
  return res.status(404).json({
    "message":"id not match "
  })
}
res.status(200).json(updateTopic)}
catch(err){
   res.status(500).json({
      message: "Error updating topic"
})}
})      

app.delete("/topic/:id", async(req,res)=>{
  try {
     const {id} = req.params
// const {name, desc} = req.body
const deletedTopic = await Topic.findByIdAndDelete(id)
console.log("deletedTopic ------------>" , deletedTopic);

  if (!deletedTopic) {
      return res.status(404).json({
        message: "Topic not found"
      });
    }

    res.status(200).json({
      message: "Topic deleted successfully",
      deletedTopic
    });
    
  } catch (error) {
    res.status(500).json({
      message: "Error deleting topic"
    });
  }
})
//OR
// 🔍 OPTIONAL: SEARCH BY ID (extra impress feature)
// app.get("/topic/id/:id", async (req, res) => {
//   const id = req.params.id

//   const found = await Topic.findById(id)

//   if (!found) {
//     return res.status(404).json({
//       message: "Topic not found"
//     });
//   }

//   res.json(found);
// });


// module.exports = app;
const PORT = process.env.PORT

export default app

