var Payment = require('vanillapay');
var express = require('express');
var path = require('path');
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
// get Paiment instance.
//TsiresyMila(AT534)
var public_key = "d575a554eb6ff6cad76d4ba89c74ab69b477427e7ef9334eb3";
var private_key = "b8e4f2141e64a79bf5724456cb2181ab08294f1a10cb6e8b71";

var public_key1 = "e06dc3eed370eacd5ec554bbd2ea4f9bfb4cae4c22836c91dc"
var private_key1 = "7911240462573087c6da0678f8ee7f58607cd5437f453ce3fb"

var client_id = "179_2kt85b5gybc440o48o880go4g08g4k4oo8kkkooos08cs4o0sk";
var client_secret = "pia5gn4xsis0ow8sgg0ss84wc88sog8sg0scw0sksocs84o4c";

var payment = new Payment("https://vanillashop.herokuapp.com", client_id, client_secret, public_key, private_key);

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
    payment.initPaie("1", req.body.montant, "Tsiresy Mila", "RP 235230", "172.26.36.26", function (idpayment) {
        console.log(idpayment);
        res.render('pages/index');
    },function(error){
        payment = new Payment("https://vanillashop.herokuapp.com", client_id, client_secret, public_key1, private_key1);
        payment.initPaie("1", req.body.montant, "Tsiresy Mila", "RP 235230", "172.26.11.153", function (idpayment) {
            console.log(idpayment);
            res.render('pages/index');
        },function(error){
            //payment = new Payment("https://vanillashop.herokuapp.com", client_id, client_secret, public_key, private_key);
            res.render('pages/error', { data: error });
        });
        //res.render('pages/error', { data: error });
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
