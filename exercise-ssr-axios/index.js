import express from "express";
import axios from "axios";

let app = express();

app.use(express.urlencoded({ extended: true }));

//To add css and images
app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    res.render("randomTasks.ejs", response.data);
    console.log(response.data);
  } catch (error) {
    console.log(error.message);
  }
});

app.post("/submit", async (req, res) => {
  console.log(req.body);
  try {
    const response = await axios.get(
      `https://bored-api.appbrewery.com/filter?type=${req.body.tasks}&$particpants=${req.body.particpants}`
    );
    res.render("randomTasks.ejs", response.data[0])
    console.log(response.data[0]);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(3000, () => {
  console.log("port is running");
});
