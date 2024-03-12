// if (process.env.NODE_ENV !== "PRODUCTION") {
//     require(`dotenv`).config()
// }


const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mapBoxToken = process.env.MAPBOX_TOKEN;
const taberuPass = process.env.TABERU_EMAILPASS;
require('dotenv').config();

const engine = require(`ejs-mate`);

const app = express();


app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.engine('ejs', engine);

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
// app.use((req, res, next) => {
//     console.log('Current page:', req.originalUrl);
//     next();
// });

// Require:
// var postmark = require("postmark");

// Send an email:



// var postmarkClient = new postmark.ServerClient("a615e36f-a93d-42a0-bb86-879c7c9b1a1e");
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








app.post('/process_booking', (req, res) => {
    const { name, email, guests, time, date } = req.body;
    console.log(name, time, email, guests, date);
    res.send(req.body)

    // Validate and sanitize inputs if needed

    // const transporter = nodemailer.createTransport({
    //     service: 'zoho',
    //     auth: {
    //         user: 'manager@taberu.co.uk',
    //         pass: 'taberuPass'
    //     }
    // });

    // const mailOptions = {
    //     from: 'manager@taberu.co.uk',
    //     to: 'manager@taberu.co.uk',
    //     subject: 'New Booking',
    //     text: ` Hello, i would like to book a table for Name: ${name}\nEmail: ${email}\nNumber of Guests: ${guests} on ${date} at ${time}`
    // };

    // transporter.sendMail(mailOptions, (error, info) => {
    //     if (error) {
    //         console.error(error);
    //         res.status(500).send('Internal Server Error');
    //     } else {
    //         console.log('Email sent: ' + info.response);
    //         res.send('Booking submitted successfully!');
    //     }
    // });
});
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});