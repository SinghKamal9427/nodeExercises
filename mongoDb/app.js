import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/test");

const schema2 = new mongoose.Schema({
    _id:Number,
    class:String
})

const schemea = new mongoose.Schema({
  _id: Number,
  name: {
    type: String,
    required: [true, "please check there is no name"],
  },
  Rollno: Number,
  new:String,
  class:schema2
});



let fruits = mongoose.model("fruits", schemea);

let classN = mongoose.model("class" , schema2)
/* 
const classNa = new classN({
    _id:1,
    class:"first"
})

const student1 = new fruits({
  _id: 10,
  name: "kamal",
  Rollno: 2,
class:classNa
});




 student1.save()  */
/* people.insertMany([student1,student2]) */

/*  fruits.updateOne({_id: 8},{new:"john"}).then((res)=>console.log(res)).catch((err=>console.log(err)))  

fruits.deleteOne({_id:1}).then(res=>console.log(res)).catch((err)=>console.log(err)) */
 
fruits.find({}).exec().then(res => console.log(res)).catch(err => console.log(err))

/* mongoose.connection.close() */
