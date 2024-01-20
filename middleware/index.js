import express from 'express';
import {dirname} from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';

let app = express();

//(DIRECTORY NAME)
let __dirname = dirname(fileURLToPath(import.meta.url));


//parse json bodies (BODY-PARSER Middleware)
app.use(express.json());


//urlencoded parse URL encoded bodies-usually html forms (BODY-PARSER Middleware)
app.use(express.urlencoded({extended:true}));


//PASSWORD AUTH(CUSTOM Middleware) 
let auth = false;
const logger = (req,res,next)=>{
    if(req.body["password"] == 12345){
        auth = true;
    }
   next();
}
app.use(logger);


//log information about incoming http req (MORGAN Middleware)
app.use(morgan("tiny"));

//get (HTTP ROUTES)
app.get("/",( req ,res)=>{
  res.sendFile(__dirname + "/public/index.html")   
})

//Post (HTTP ROUTES)
app.post("/submit", (req, res)=>{
    let values = Object.values(req.body)
    console.log(values)
    if(auth){
        res.send(auth  + " Password match ")
    }else{
        res.redirect("/");
    }
   
})

app.listen(3000, ()=>{
    console.log("port is running")
})