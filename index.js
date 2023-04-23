const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const doctor = require('./model/doctor')
const patient = require('./model/patient')

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


app.get('/medicines', async (req, res) => {
    try {
        const medicines = await medicines.find();
        res.render('medicines', { medicines });
    } catch (err) {
        console.error('Error retrieving medicines:', err);
        res.status(500).send('Internal server error');
    }
});


// Handle form submission
app.post('/medicines', async (req, res) => {
    try {
        const { name, m_id, cost, description, added } = req.body;

        // Create a new offer object and set its properties
        const med = new medicines({
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



router.post("/viewcart_final", async (req, res) => {
    const {  name,m_id, cost } = req.body;

    const userId = "5de7ffa74fff640a0491bc4f"; //TODO: the logged in user id

    try {
        let cart = await medicines.findOne({ userId });

        if (cart) {
            //cart exists for user

            let itemIndex = cart.findIndex(p => p.m_id == m_id);

            if (itemIndex > -1) {
                //product exists in the cart, update the quantity
                let productItem = cart.[itemIndex];
                
                cart.[itemIndex] = productItem;
            } else {
                //product does not exists in cart, add new item
                cart.push({ name, m_id, cost });
            }
            cart = await cart.save();
            return res.status(201).send(cart);
        } else {
            //no cart for user, create new cart
            const newCart = await medicines.create({
                userId,
                products: [{ name, m_id, cost}]
            });

            return res.status(201).send(newCart);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
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

app.get('/doctor_profile', (req, res) => {
    doctor.find({ email: req.session.email }).then(function (perdoc) {
        res.render('doctor_profile', {
            per: perdoc
        })

    })
})
app.get('/admin', (req, res) => {
    // const query = doctor.find();
    doctor.find({}).then(function (perdoc) {
        res.render('admin_page', {
            per: perdoc
        })

    })
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
app.get('/doctor_list', (req, res) => {
    const spcl = req.query.Spec

    doctor.find({ $or: [{ Specialization: spcl }, { district: req.query.Spec }] }).then(function (doctorss) {
        res.render('doctor_list', {
            list: doctorss
        })


    })

})

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
            file: req.body.file


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
            patient_emergencyNumber: req.body.patient_emergencyNumber

        });

        await newpatient.save();


        res.redirect('/after-login')

    } catch {
        res.status(500).send('Error creating patient');
    }
});





app.listen(5500, () => {
    console.log('Server listening on port 5500');
});
