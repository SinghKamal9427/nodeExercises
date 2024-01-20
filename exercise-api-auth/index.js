import express from "express";
import axios from "axios";

const app = express();

const _baseUrl = "https://secrets-api.appbrewery.com/";


//Will need updated crediantials
let crediantials = {
  username: "kamaljatt9427",
  password: "jatt123",
  apiKey: "fdd12726-4607-41fc-b9b8-ff2247237f6d",
  token:"88b8474d-51d6-42d3-bdc6-9ade59377f96"
};


//Basic AUTHENTICATION using username and password.
app.get("/", async (req, res) => {
  try {
    const response = await axios.get(_baseUrl + "all?page=1", {
      auth: {
        username: crediantials.username,
        password: crediantials.password,
      },
    });
    res.render("apiAuth.ejs", { secret: response.data[0].secret });
  } catch (error) {
    console.log(error.message);
  }
});


//KEY AUTHORIZATION using key
app.get("/keyAuth",async (req, res) => {
  try {
    const response =await axios.get(_baseUrl + "filter",{
        params:{
            score:5,
            apiKey:crediantials.apiKey
        }
    });
    res.render("apiAuth.ejs" ,{secret : response.data[0].secret});
  } catch (error) {
    console.log(error.message);
  }
});

//TOKEN AUTHORIZATION using token

app.get("/tokenAuth",async(req,res)=>{
    try{
const response = await axios(_baseUrl + "secrets/3", {
  headers:{
    Authorization:  `Bearer ${crediantials.token}`
  }
})
res.render("apiAuth.ejs" , {secret:response.data.secret})
    }catch(error){
console.log(error.message)
    }
})

app.listen(3000, () => {
  console.log("port is running");
});
