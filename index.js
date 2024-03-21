// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require(`dotenv`).config()
// }

require('dotenv').config();


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const taberuPass = process.env.TABERU_EMAILPASS;
const nodemailer = require("nodemailer");


const engine = require(`ejs-mate`);

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.json());




app.get('/', (req, res, next) => {
    const url = req.originalUrl;
    console.log(req.originalUrl)
    res.render('home', { url, layout: 'layouts/boilerplate' })
})

app.get('/booking', (req, res, next) => {
    const url = req.originalUrl;
    console.log(req.originalUrl)
    res.render('booking', { url })
})
app.get('/orders', (req, res, next) => {
    res.render('takeaway')
})
app.get('/contact', (req, res) => {
    res.render('contact')
})



const axios = require('axios');
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_TOKEN;

app.get('/mapbox-styles', async (req, res) => {
    try {
        // Fetch Mapbox styles from Mapbox API
        const response = await axios.get(`https://api.mapbox.com/styles/v1/mapbox/streets-v11?access_token=${MAPBOX_ACCESS_TOKEN}`);

        // Serve the styles to the client
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching Mapbox styles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.use(express.static('public'));



const validateInputs = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Middleware to define validation rules for booking inputs
const validateBookingInputs = [
    body('name').trim().escape(),
    body('email').trim().isEmail().normalizeEmail(),
    body('guests').toInt(),
    body('time').trim().escape(),
    body('date').toDate(),
    validateInputs // Include the validateInputs middleware to validate the inputs
];

const validateContactInputs = [
    body('name').trim().escape(),
    body('email').trim().isEmail().normalizeEmail(),
    body('number').trim().isNumeric().isLength({ min: 10, max: 15 }),
    body('text').trim().escape(),
    validateInputs
];




app.post('/process_booking', validateBookingInputs, (req, res) => {
    const { name, email, guests, time, date } = req.body;
    console.log(name, time, email, guests, date);


    // Validate and sanitize inputs if needed

    const transporter = nodemailer.createTransport({
        service: 'zoho',
        auth: {
            user: 'manager@taberu.co.uk',
            pass: taberuPass
        }
    });

    const mailOptions = {
        from: 'manager@taberu.co.uk',
        to: 'manager@taberu.co.uk',
        subject: `New Booking for ${name}`,
        text: ` Hello, i would like to book a table for Name: ${name}\nEmail: ${email}\nNumber of Guests: ${guests} on ${date} at ${time}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);

            res.render('goodbooking');
        }
    });
});
app.post('/process_contact', validateContactInputs, (req, res) => {

    const { name, email, number, text } = req.body;
    const transporter = nodemailer.createTransport({
        service: 'zoho',
        auth: {
            user: 'manager@taberu.co.uk',
            pass: taberuPass
        }
    });

    const mailOptions = {
        from: 'manager@taberu.co.uk',
        to: 'manager@taberu.co.uk',
        subject: 'Contact Submission',
        text: ` ${text}\n  Name:${name}\nEmail: ${email}\nContact NUmber: ${number}}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } else {
            console.log('Email sent: ' + info.response);
            res.send('Booking submitted successfully!');
        }
    });
})
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});