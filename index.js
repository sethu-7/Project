const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const doctor = require('./model/doctor')
const patient=require('./model/patient')
const medicines = require('./model/medicines')
const app = express();
const session = require('express-session')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json());
app.set("view engine", "ejs")
app.use(express.static('public/images'));
const upload = multer({ dest: 'public/files/' });
app.use(session({
    secret: "secret-key",
    resave: false,
    saveUninitialized: false,

}));

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


// Render offers in EJS file

const offerSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String

});

const Offer = mongoose.model("Offer", offerSchema);

app.get('/offers', async (req, res) => {
    try {
        const offers = await Offer.find();
        res.render('offers', { offers });
    } catch (err) {
        console.error('Error retrieving offers:', err);
        res.status(500).send('Internal server error');
    }
});


// Handle form submission
app.post('/offers', async (req, res) => {
    try {
        const { title, description, image } = req.body;

        // Create a new offer object and set its properties
        const offer = new Offer({
            title,
            description,
            image // set the image field to the imageUrl from the req.body
        });

        // Save the offer object to the database
        await offer.save();

        res.status(201).json({ message: 'Offer added successfully' });
    } catch (err) {
        console.error('Error adding offer:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




//deletion
// Handle DELETE request to delete an offer by its title
app.delete('/offers/:title', async (req, res) => {
    try {
        const title = req.params.title;

        // Find the offer with the matching title and delete it
        const deletedOffer = await Offer.findOneAndDelete({ title });

        if (!deletedOffer) {
            // If no offer with the matching title was found, return a 404 Not Found error
            res.status(404).send('Offer not found');
            return;
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting offer:', err);
        res.status(500).send('Internal server error');
    }
});


// app.get('/medicines', async (req, res) => {
//     try {
//         const medicines = await medicines.find();
//         res.render('medicines', { medicines });
//     } catch (err) {
//         console.error('Error retrieving medicines:', err);
//         res.status(500).send('Internal server error');
//     }
// });


// Handle form submission
app.post('/medicines', async (req, res) => {
    try {
        const { image, name, m_id, cost, description, added } = req.body;

        // Create a new offer object and set its properties
        const med = new medicines({
            image,
            name,
            m_id,
            cost,
            description,
            added
            // set the image field to the imageUrl from the req.body
        });

        // Save the offer object to the database
        await med.save();

        res.status(201).json({ message: 'Medicine added successfully' });
    } catch (err) {
        console.error('Error adding medicine:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});




//deletion
// Handle DELETE request to delete an offer by its title
app.delete('/medicines/:name', async (req, res) => {
    try {
        const name = req.params.name;

        // Find the offer with the matching title and delete it
        const deleted_med = await medicines.findOneAndDelete({ name });

        if (!deleted_med) {

            res.status(404).send('medicine not found');
            return;
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting medicine:', err);
        res.status(500).send('Internal server medicine');
    }
});




app.get('/doctor_project_final', (req, res) => {
    doctor.find({ experience: { $gte: 14 } }).then(function (doctors) {
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
app.get('/fsd', (req, res) => {
    res.render('fsd')
})

app.get('/doctor_profile', (req, res) => {
    doctor.find({ email: req.session.email }).then(function (perdoc) {
        res.render('doctor_profile', {
            per: perdoc
        })

    })
})
app.get('/admin', (req, res) => {
    // const query = doctor.find();
    doctor.find({ email: req.query.email }).then(function (perdoc) {
        // if(!req.query.email){
        //     alert("doctor not present")
        // }

        res.render('admin_page', {
            per: perdoc
        })

    })

    // const deldoc=doctor.findOne({email:req.query.email})
})

// app.get('/appointment-page', (req, res) => {
//     doctor.find({ email: req.query.email }).then(function (doct) {
//         res.render('appointment-page', {
//             doc: doct
//         })

//     })
// })
app.get('/', (req, res) => {
    res.render('introduction')
})
app.get('/login', (req, res) => {

    res.render('login')
})
app.get('/login_patient', (req, res) => {

    res.render('login_patient')
})
app.get('/doctor_list', (req, res) => {
    const spcl = req.query.Spec

    doctor.find({ $or: [{ Specialization: spcl }, { district: req.query.Spec }] }).then(function (doctorss) {
        res.render('doctor_list', {
            list: doctorss
        })


    })

})

// app.post('/del',async(req,res)=>{
//     try{
//         const em=req.body.email
//         console.log(em)


app.get('/project_final', (req, res) => {

    res.render('project_final')
})
app.get('/doctor_dashboard', (req, res) => {

    res.render('doctor_dashboard')
})
app.get('/doctor_todays_visits', (req, res) => {

    res.render('doctor_todays_visits')
})
app.get('/doctor_patients', (req, res) => {

    res.render('doctor_patients')
})
app.get('/admin_password_validation', (req, res) => {
    res.render('admin_password_validation')
})

const passvalSchema = new mongoose.Schema({
    Name: String,
    password: String
  });

  // Create a model for the collection
  const Pass = mongoose.model('Pass', passvalSchema);

  // Route for the login form submission
  app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
      // Look for a document in the Pass collection with the given username and password
      const result = await Pass.findOne({ Name: username, password });
      if (result) {
        // Credentials are valid
        res.json({ success: true });
      } else {
        // Credentials are invalid
        res.json({ success: false });
      }
    } catch (err) {
      console.error('Error checking credentials:', err.message);
      res.status(500).json({ success: false });
    }
  });
app.get('/medicines_list', (req, res) => {


    medicines.find({}).then(function (medi) {
        res.render('medicines', {
            search: medi
        })


    })

})
app.get('/single_med', (req, res) => {


    medicines.find({}).then(function (medic) {
        res.render('medicines', {
            mee: medic
        })


    })

})
app.get('/viewcart_final', (req, res) => {
    medicines.find({ added: 'true' }).then(function (cartt) {
        // if (err) {
        //     console.error(err);
        //     return res.status(500).send('Error occurred');
        //   }
        res.render('viewcart_final', {
            cartitems: cartt
        })
    })
})

app.get('/medi', (req, res) => {
    // const query = doctor.find();
    medicines.find({ name: req.query.name }).then(function (namee) {
        // if(!req.query.email){
        //     alert("doctor not present")
        // }

        res.render('medicines', {
            search: namee
        })

    })

    // const deldoc=doctor.findOne({email:req.query.email})
})

app.get('/medi', (req, res) => {
    // const query = doctor.find();
    medicines.find({ name: req.query.name }).then(function (namee) {
        // if(!req.query.email){
        //     alert("doctor not present")
        // }

        res.render('medicines', {
            search: namee
        })

    })

    // const deldoc=doctor.findOne({email:req.query.email})
})

//             email: req.body.email

//         })

//         console.log(user)

//         await doctor.findByIdAndDelete({_id:req.params.id},(error,result)=>{
//             console.log(user.params.id)

//             if (error) {
//                 res.send('Error while deleting document:');
//               } else {
//                 console.log('Document deleted successfully:', result);
//               }
//         })
//         console.log("gsghs")
//     }
//     catch(error){
//         res.status(400).send("inavalid email")

//     }

// })


app.delete('/admin/:email', async (req, res) => {
    try {
        const email = req.params.email;

        // Find the offer with the matching title and delete it
        const deldoc = await doctor.findOneAndDelete({ email });

        if (!deldoc) {
            // If no offer with the matching title was found, return a 404 Not Found error
            res.status(404).send('doctor not found');
            return;
        }

        res.status(204).send();
    } catch (err) {
        console.error('Error deleting odoctor', err);
        res.status(500).send('Internal server error');
    }
});




app.post('/login', async (req, res, next) => {
    try {
        const user = await doctor.findOne({

            email: req.body.email,
            password: req.body.password
        })




        if (user) {
            req.session.email = user.email;

            res.redirect('/doctor_profile')
        }
        else {
            send("password incorrect")
            // res.redirect('introduction')
        }
    }
    
    catch (error) {
        res.status(400).send("inavalid email")
    }
})
app.post('/loginPat', async (req, res, next) => {
    try {
        const user = await patient.findOne({

            email: req.body.email,
            password: req.body.password
        })




        if (user) {
            // req.session.email = user.email;

            res.redirect('/')
        }
        else {
            send("password incorrect")
            // res.redirect('introduction')
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
            timeslot1: req.body.timeslot1,
            timeslot2: req.body.timeslot2,
            timeslot3: req.body.timeslot3,
            cvv: req.body.cvv


        });

        // const file = {
        //     data: req.file.buffer,
        //     contentType: req.file.mimetype,

        // };

        // const result = db.collection('doctor').insertOne(file);
        // console.log('File saved to database:', result.insertedId);
        await newdoctor.save();
        req.session.email = newdoctor.email;

        res.redirect('/doctor_profile')

        // res.status(201).send('doctor created successfully');
    } catch (error){
        res.status(500).send(error);
    }
});


// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// });


app.get('/admin_page', (req, res) => {
    res.render('admin_page')
})

app.get('/index', (req, res) => {
    res.render('index')
})



app.get('/payments', (req, res) => {
    res.render('payments')
})




// app.post('/signup', async (req, res) => {
//     try {

//         let newpatient = new patient({
//             patient_name: req.body.patient_name,
//             patient_password: req.body.patient_password,
//             patient_phoneNumber: req.body.patient_phoneNumber,
//             patient_email: req.body.patient_email,
//             patient_address: req.body.patient_address,
//             patient_emergencyNumber: req.body.patient_emergencyNumber

//         });

//         await newpatient.save();


//         res.redirect('/doctor_project_final')

//     } catch {
//         res.status(500).send('Error creating patient');
//     }
//     //     catch (error) {
//     //     res.status(400).send("inavalid email")
//     // }
// })





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
                fee: req.body.fee,
                timeslot1: req.body.timeslot1,
                timeslot2: req.body.timeslot2,
                timeslot3: req.body.timeslot3,
                cvv: req.body.cvv


            });

            // const file = {
            //     data: req.file.buffer,
            //     contentType: req.file.mimetype,

            // };

            // const result = db.collection('doctor').insertOne(file);
            // console.log('File saved to database:', result.insertedId);
            await newdoctor.save();
            req.session.email = newdoctor.email;

            res.redirect('/doctor_profile')

            // res.status(201).send('doctor created successfully');
        } catch {
            res.status(500).send('Error creating docto');
        }
    });


// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// });


app.get('/admin_page', (req, res) => {
    res.render('admin_page')
})
app.get('/license', (req, res) => {
    res.render('files')
})

app.get('/index', (req, res) => {
    res.render('index')
})



app.get('/payments', (req, res) => {
    res.render('payments')
})




app.post('/signup', async (req, res) => {
    try {

        let newpatient = new patient({
            patient_name: req.body.patient_name,
            patient_password: req.body.patient_password,
            patient_phoneNumber: req.body.patient_phoneNumber,
            patient_email: req.body.patient_email,
            patient_address: req.body.patient_address,
            patient_emergencyNumber: req.body.patient_emergencyNumber,
            patient_dateOfConsultation: req.body.patient_dateOfConsultation,
            patient_timeOfConsultation: req.body.patient_timeOfConsultation,
            patient_online:req.body.patient_online,
            patient_doctor: req.body.patient_doctor

        });

        await newpatient.save();
        // req.session.patient_email = newpatient.email;


        res.redirect('/doctor_project_final')

        // mongoose.connect(dbUrl, { useNewUrlParser: true });

        // Search the collection
        // const collection = mongoose.connection.collection('ffsd.patients');

  // Add the new fields
//   collection.updateOne({ patient_email: req.session.patient_email }, { $set: { patient_dateOfConsultation: req.body.patient_dateOfConsultation, patient_timeOfConsultation: req.body.patient_timeOfConsultation } }, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });

// collection.updateOne(
//     { patient_email: req.session.patient_email },
//     { $set: { patient_dateOfConsultation: new Date() } },
//     (err, result) => {
//       if (err) throw err;
//       console.log('Document updated');
//       client.close();
//     }
//   );


// const collection = mongoose.connection.collection('ffsd.patients');

// collection.findOneAndUpdate({ patient_email: req.session.patient_email }, { $set: { patient_dateOfConsultation: req.body.patient_dateOfConsultation, patient_timeOfConsultation: req.body.patient_timeOfConsultation }, $setOnInsert: { patient_dateOfConsultation: req.body.patient_dateOfConsultation, patient_timeOfConsultation: req.body.patient_timeOfConsultation } }, { upsert: true }, (err, result) => {
//     if (err) throw err;
//     console.log(result);
//   });


    } catch {
        res.status(500).send('Error creating patient');
    }
});


    // const CartItem = require('./model/medicines');

    // Route to add a medicine to the cart
    app.post('/viewcart', async (req, res) => {
      const { m_id } = req.body;
      try {
        // Find the medicine by ID and update the "added" field to true
        const k=await medicines.findOneAndUpdate(m_id, { added: "true" });
        // Add the medicine to the cart
        // const cartItem = new CartItem({
        //   name: medicine.name,
        //   price: medicine.cost
        // });
        // await cartItem.save();
        res.redirect('/medicines_list');
        console.log("added")
        
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  });

app.listen(5500, () => {
    console.log('Server listening on port 5500');
});
