const mongoose= require('mongoose');
mongoose.connect("mongodb+srv://sethu:geethu@cluster0.ngvcutp.mongodb.net/ffsd").then(()=>{
  console.log('Sucessfully Connected');
  
}).catch((err)=>{
  console.log(err);
  
})

const offerSchema = new mongoose.Schema({
 image:String,
 title:String,
  description:String
  
});

const Offer=mongoose.model("Offer",offerSchema);

const offer =new Offer({
  image:"no img",
  title:"Offer 1",
 description:"Get 10% off on your first medicine order Offer expiry : 30/4/2023"
     
});

Fruit.updateOne({_id:"6444d53451b611be7da8e153"},{image:""})  .then(function () {
  console.log("Successfully saved defult items to DB");
})
.catch(function (err) {
  console.log(err);
});




// Offer.insertMany([offer])  .then(function () {
//   console.log("Successfully saved defult items to DB");
// })

// .catch(function (err) {
//   console.log(err);
// });
