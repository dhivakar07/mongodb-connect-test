require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("DB connected ");
  })
  .catch((err) => {
    console.log("DB connected Failed" + err);
  });

const Fruits = mongoose.model("Fruits", { name: String }, "fruits");

app.get("/fruitsdata", (req, res) => {
  Fruits.find()
    .then((response) => {
      res.send(response);
    })
    .catch((response) => {
      console.log("Error in retrieving Data");
    });
});

app.post("/addfruit", (req, res) => {
  const newfruit = req.body.newfruit;
  const newFruit = new Fruits({ name: newfruit });
  newFruit.save().then(() => {
    console.log("New Fruit Saved Successfully");
  });
});
app.get("/", function (req, res) {
  res.send("Backend Server Started...");
});
module.exports = app;
