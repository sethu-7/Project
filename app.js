const sqlite3= require("sqlite3").verbose();
const express= require("express");
const bodyparser=require("body-parser");
const path = require("path");

const app=express();
const port=5000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));


app.set("view engine","ejs");

app.use(express.static(path.join(__dirname,'public')));


app.listen(port,()=>{
    console.log(`connected to the port ${port}`);
})

app.get("/",(req,res)=>{
    res.render('index');
})


app.get("/payments",(req,res)=>{
    res.render('payments');
})


app.get("/offers",(req,res)=>{
    res.render('offers');
})

app.get("/1",(req,res)=>{
    res.render('1');
})

app.get('/dashboard', (req, res) => {
    const ddata = `SELECT p_name,p_id,status FROM docdata ORDER BY p_id`;
    db.all(ddata, (err, rows) => {
        if (err) {
            console.log(err.message);
        }
        console.log('display');
        res.render('dashboard', { model: rows });
    });
});

app.get("/doctor_list",(req,res)=>{
    res.render('doctor_list');
})
app.get("/doctor_patients",(req,res)=>{
    res.render('doctor_patients');
})
app.get("/doctor_profile",(req,res)=>{
    res.render('doctor_profile');
})
app.get("/doctor_project_final",(req,res)=>{
    res.render('doctor_project_final');
})
app.get("/doctor_today_visits",(req,res)=>{
    res.render('doctor_today_visits');
})
app.get("/login_signup2",(req,res)=>{
    res.render('login_signup2');
})

const db= new sqlite3.Database('./public/mydatabase.db',sqlite3.OPEN_READWRITE,(err)=>{
    if(err) return console.error(err.message);

    console.log("connected to database");
})