import express from "express";

const app = express();

app.use(express.urlencoded({ extended: true }));

//RANDOM API
app.get("/random", (req, res) => {
  const random = Math.floor(Math.random() * Data.length);
  res.json(Data[random]);
});

//FILTER API
app.get("/filter/:id", (req, res) => {
  const filter = Data.filter((val) => val.id == req.params.id); //req.query.id FOR QUERY PARAMETERS

  if (req.params.id <= Data.length) {
    res.json(filter);
  } else {
    res.json({ error: "No Data found" });
  }
});

//CREATE DATA[With key logic]
app.post("/post", (req, res) => {
  const keys = Object.keys(req.body);
  const ids = Data.length + 1;
  let num = 0;
  keys.map((val) => {
    if (val == "type" || val == "text") {
      num += 1;
    }
  });
  if (num == 2) {
    const data = {
      id: ids,
      joke: req.body.text,
    };
    Data.push(data);
    res.json(data);
  } else {
    res.json({"error" : "check key value "});
  }
});

//EDIT DATA [without key logic]
app.put("/put/:id",(req,res)=>{
    console.log(req.params.id)
    const filter = Data.filter((val)=>val.id == req.params.id)
    console.log(filter)
    if(filter){
    const data = {
        id : parseInt(req.params.id),
        joke: req.body.type
    }
    if(filter.length > 0){
    Data.splice(parseInt(req.params.id)-1,1,data);
    console.log(Data);
    res.json(data)}
    else{
        res.json({error:"id not found"})
    }
}
})

//PATCH DATA
app.patch("/patch/:id",(req,res)=>{
    const ids = parseInt(req.params.id)
    const find = Data.find((val)=>val.id == ids)
    console.log(find)
    if(find){
    const data = {
        id : ids,
        joke: req.body.type || find.joke,
    }
    if(find){
    Data.splice(ids-1,1,data);
    console.log(Data);
    res.json(data)}
    else{
        res.json({error:"id not found"})
    }
}
})

//Delete SINGLE USER DATA 
app.delete("/delete/:id",(req,res)=>{
  const ids =  parseInt(req.params.id);
  const updated = Data.filter((val)=>val.id !== ids)
  res.json(updated)
})

//DELETE ALL DATA
const key = "1-2-3-4"
app.delete("/deletee/all",(req,res)=>{
  if (key == req.query.key){
    Data.length = 0;
    res.sendStatus(200)
  }else{
    res.status(404).json({error:"key is not valid"})
  }
  
})

app.listen(3000, () => {
  console.log("port is running");
});

let Data = [
  {
    id: 1,
    joke: "very Funny",
  },
  {
    id: 2,
    joke: "very Good",
  },
  {
    id: 3,
    joke: "very bad",
  },
  {
    id: 4,
    joke: "very Much",
  },
  {
    id: 5,
    joke: "very better",
  },
  {
    id: 6,
    joke: "very Nice",
  },
  {
    id: 7,
    joke: "very Nice",
  },
];
