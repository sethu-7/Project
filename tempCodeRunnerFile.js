
// app.post('/signup', async (req, res) => {
//     try {

//         let newpatient = new patient({
//             name: req.body.name,
//             password: req.body.password,
//             phoneNumber: req.body.phoneNumber,
//             email: req.body.email,
//             address: req.body.address,
//            emergencyNumber: req.body.emergencyNumber

//         });

//         await newpatient.save();


//         res.redirect('/dashboard')

//     } catch {
//         res.status(500).send('Error creating patient');
//     }
// });


// app.listen(5000, () => {
//     console.log('Server listening on port 5000');
// });