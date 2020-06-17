var Payment = require('./vanillapay');
var express = require('express');
var path = require('path');
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
//TsiresyMila(AT534)
var public_key = "6a10ca0036e408a2306bbb26788be3f6ddc759abe5a19692ef";
var private_key = "e7f3b743de4374128c7076813d2ee36b16e67720c6fe4018b2";

var client_id = "179_2kt85b5gybc440o48o880go4g08g4k4oo8kkkooos08cs4o0sk";
var client_secret = "pia5gn4xsis0ow8sgg0ss84wc88sog8sg0scw0sksocs84o4c";
// get Paiment instance.
var payment = new Payment("https://vanillapay.glitch.me", client_id, client_secret, public_key, private_key);

var app = express();
// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'))
app.engine('ejs', engine)
app.set('view engine', 'ejs')
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());

// use res.render to load up an ejs view file

// index page
app.get('/', function (req, res) {
    res.render('pages/index');
});

app.post('/', function (req, res) {
    console.log(req.body.montant)
    payment.initPaie("1", req.body.montant, "Digi-Talent", "RP 235230", "52.22.30.237", function (idpayment) {
        console.log(idpayment);
        res.render('pages/index');
    }, function (error) {
        res.render('pages/error', { data: error });
    });
});

// about page 
app.get('/error', function (req, res) {
    res.render('pages/error', { data: req.body });
});

app.post('/error', function (req, res) {
    console.log(req.body);
    res.render('pages/error', { data: req.body });
});

app.get('/back', function (req, res) {
    res.render('pages/back', { data: req.body });
});

app.post('/back', function (req, res) {
    console.log(req.body);
    res.render('pages/back', { data: req.body });
});

app.get('/notif', function (req, res) {
    res.render('pages/notif', { data: req.body });
});

app.post('/notif', function (req, res) {
    console.log(req.body);
    res.render('pages/notif', { data: req.body });
});

app.listen(process.env.PORT || 5000, function () {
    console.log('Server running on port 5000');
});
