const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://sethu:geethu@cluster0.ngvcutp.mongodb.net/ffsd").then(()=>{
  console.log('Sucessfully Connected');
  
}).catch((err)=>{
  console.log(err);
  
})

const passvalSchema = new mongoose.Schema({
 Name:String,
 password:String
});

const Pass=mongoose.model("Pass",passvalSchema);

const pass1 =new Pass({
  Name:"Yash",
  password:"yash@01"
});
const pass2 =new Pass({
  Name:"Setu",
  password:"setu@01"
});
const pass3 =new Pass({
  Name:"Epshita",
  password:"epshita@01"
});
const pass4 =new Pass({
  Name:"Porvitha",
  password:"porvitha@01"
});
const pass5 =new Pass({
  Name:"Pruthviraj",
  password:"pruthviraj@01"
});


// Pass.insertMany([pass1,pass2,pass3,pass4,pass5])  .then(function () {
//   console.log("Successfully saved defult items to DB");
// })
// .catch(function (err) {
//   console.log(err);
// });
