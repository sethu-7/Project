// const express=require('express')
// const app=express()
// const mongoose=require('mongoose');
// const morgan = require('morgan');
// // const doctor=require('../Project/model/doctor')
// const bd=require('body-parser')
// const path=require('path');
// const authroute=require('./route/authrouet');
// const e = require('express');
// const bodyParser = require('body-parser');

// app.set("view engine","ejs")
// app.use(express.static(path.join(__dirname,'public/images')))
// mongoose.connect('mongodb+srv://sethu:geethu@cluster0.ngvcutp.mongodb.net/?retryWrites=true&w=majority',{useNewUrlParser:true},{useNewTopology:true})
// const db= mongoose.connection


// db.on('error',(err)=>{
//     console.log(err)
// })

// db.once('open',()=>{
//     console.log("connection established")
// })

// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())


// // app.get('/doctor_project_final',(req,res)=>{
// //     res.render('doctor_project_final')
// // })

// // app.post('/doctor_project_final',(req,res)=>{
// //     let newdoc=new doctor({
// //         Name:req.body.doc_name,
// //         Password:req.body.doc_id,
// //         PhoneNumber:req.body.ph_no,
// //         Adress:req.body.address,
// //         Specialization:req.body.spcl,
// //         Experience:req.body.exp,
// //         Email:req.body.email,
// //     });
// //     newdoc.save();
// //     res.redirect('/dashboard');

// // })

// const port=5000;
// app.listen(port,()=>{
//     console.log("connected")
// })

// app.use('../route',authroute)

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const doctor = require('./model/doctor')
const patient = require('./model/patient')

const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs")
app.use(express.static('public/images'));
const upload = multer({ dest: 'public/files/' });

mongoose.connect('mongodb+srv://sethu:geethu@cluster0.ngvcutp.mongodb.net/ffsd', { useNewUrlParser: true }, { useUnofiedToppology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Connected to MongoDB database');

});




// app.use(bodyParser.json());
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../uploads')
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalname)
//     }
// });

// const upload = multer({ storage: storage });



app.get('/doctor_project_final', (req, res) => {
    doctor.find({experience:{$gte:9}}).then( function (doctors) {
        // if (err) {
        //     console.error(err);
        //     return res.status(500).send('Error occurred');
        //   }
        res.render('doctor_project_final', {
            doctorlist: doctors
        })
    })
})
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})
app.get('/doctor_profile', (req, res) => {
    res.render('doctor_profile')
})
app.get('/login_page1', (req, res) => {
    res.render('login_page1')
})
app.get('/appointment-page', (req, res) => {
    doctor.find({email:req.query.email}).then(function(doct){
        res.render('appointment-page',{
            doc:doct
        })

    })
})
app.get('/', (req, res) => {
    res.render('introduction')
})
app.get('/header', (req, res) => {
    
    res.render('header')
})
app.get('/after-login', (req, res) => {
    
    res.render('after-login')
})
app.get('/doctor_list', (req, res) => {
    const spcl=req.query.Spec
    
    doctor.find({Specialization:spcl}).then(function(doctorss) {
        res.render('doctor_list',{
            list:doctorss
        })
        
        
    })
})

app.post('/login', (req, res) => {
    try {
        // const email = req.body.email
        const password = req.body.password
        console.log('useremail')


        const useremail = doctor.findOne({ email: req.body.email });
        if (useremail.password === password) {
            res.redirect('introduction');

        }
        else {
            send("password incorrect")
            res.redirect('introduction')
        }
    }
    catch (error) {
        res.status(400).send("inavalid email")
    }
})



app.post('/submit', upload.single('file'), async (req, res) => {
    try {

        let newdoctor = new doctor({
            name: req.body.name,
            password: req.body.password,
            phoneNumber: req.body.phoneNumber,
            email: req.body.email,
            district: req.body.district,
            Specialization: req.body.Specialization,
            experience: req.body.experience,
            timeslot1:req.body.timeslot1,
            timeslot2:req.body.timeslot2,
            timeslot3:req.body.timeslot3,
            file: req.body.file


        });

        // const file = {
        //     data: req.file.buffer,
        //     contentType: req.file.mimetype,

        // };

        // const result = db.collection('doctor').insertOne(file);
        // console.log('File saved to database:', result.insertedId);
        await newdoctor.save();


        res.redirect('/dashboard')

        // res.status(201).send('doctor created successfully');
    } catch {
        res.status(500).send('Error creating docto');
    }
});


// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// });







app.post('/signup', async (req, res) => {
    try {

        let newpatient = new patient({
            patient_name: req.body.patient_name,
            patient_password: req.body.patient_password,
            patient_phoneNumber: req.body.patient_phoneNumber,
            patient_email: req.body.patient_email,
            patient_address: req.body.patient_address,
            patient_emergencyNumber: req.body.patient_emergencyNumber

        });

        await newpatient.save();


        res.redirect('/doctor_project_final')

    } catch {
        res.status(500).send('Error creating patient');
    }
});


app.listen(5000, () => {
    console.log('Server listening on port 5500');
});