/* import { image } from 'qr-image';
import fs from 'fs';

//Create a new qr image for Link

let qr = image('https://kdweathers.netlify.app/', { type: 'png' });
qr.pipe(fs.createWriteStream('qr.png')); */

import express from "express";
let app = express();
let port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/post", (req, res) => {
  res.sendStatus(200);
});

app.put("/user/kamal", (req, res) => {
  res.sendStatus(200);
});

app.patch("/user/kamal", (req, res) => {
  res.sendStatus(200);
});

app.delete("/user/kamal", (req, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log("listening on port");
});
