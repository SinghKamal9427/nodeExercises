import  express  from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";

let app = express();

const __dirname = dirname(fileURLToPath(import.meta.url))
console.log(__dirname) 


app.use(express.urlencoded({extended:true}))

//Custom MIDDLEWARE
const auth = (req, res, next) => {
    next()
}
app.use(auth);
const data = {
    title:"EJS tags",
    seconds:new Date().getSeconds(),
    items:["apple", "banana", "cherry"],
    htmlContent:"<em>This text is embeded</em>"
};

app.get("/",(req,res)=>{
   
    
res.render("index.ejs",{data});  
})

app.post("/submit",(req, res)=>{
    let fName = req.body["firstName"];
    let length = fName.length; 
    console.log(length)
    res.render("index.ejs",{ data, length })
console.log(req.body)
})

app.listen(3000,()=>{
    console.log("port is running")
})

