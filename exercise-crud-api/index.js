import express from "express";
import axios from "axios";

const app = express();

const _baseUrl = "https://secrets-api.appbrewery.com/";

let crediantials = {
  username: "kamaljatt9427",
  password: "jatt123",
  apiKey: "fdd12726-4607-41fc-b9b8-ff2247237f6d",
  token: "88b8474d-51d6-42d3-bdc6-9ade59377f96",
};

const bearerToken = {
  headers: {
    Authorization: `Bearer ${crediantials.token}`,
  },
};

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("crud.ejs");
});

app.post("/get", async (req, res) => {
  const id = req.body.ids;
  try {
    const response = await axios(_baseUrl + `secrets/${id}`, bearerToken);
    res.render("crud.ejs", { secret: JSON.stringify(response.data) });
  } catch (error) {
    res.render("crud.ejs", { secret: JSON.stringify(error.message) });
  }
});

app.post("/post", async (req, res) => {
  const { ids, secrets, scores } = req.body;
  try {
    const response = await axios.post(
      _baseUrl + "secrets",
      {
        secret: secrets,
        score: scores,
      },
      bearerToken
    );
    res.render("crud.ejs", { secret: JSON.stringify(response.data) });
  } catch (error) {
    res.render("crud.ejs", { secret: JSON.stringify(error.message) });
  }
});

app.post("/put", async(req, res) => {
    const { ids, secrets, scores } = req.body;
    try {
      const response = await axios.put(
        _baseUrl + `secrets/${ids}`,
        {
          secret: secrets,
          score: scores,
        },
        bearerToken
      );
      res.render("crud.ejs", { secret: JSON.stringify(response.data) });
    } catch (error) {
      res.render("crud.ejs", { secret: JSON.stringify(error.message) });
    }
});

app.post("/Patch", (req, res) => {
  console.log(req.body);
});

app.post("/delete", async(req, res) => {
    const id= req.body.ids;
    try {
      const response = await axios.delete(
        _baseUrl + `secrets/${id}`,
        bearerToken
      );
      res.render("crud.ejs", { secret: JSON.stringify(response.data) });
    } catch (error) {
      res.render("crud.ejs", { secret: JSON.stringify(error.message) });
    }
});

app.listen(3000, () => {
  console.log("port is running");
});
