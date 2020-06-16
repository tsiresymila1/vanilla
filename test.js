var Payement = require('vanillapay');
var express = require('express');
var path = require('path');
var engine = require('ejs-locals');
var bodyParser = require('body-parser');
// get Paiment instance.
//TsiresyMila(AT534)
var public_key = "feb6caab0c2322bebd8c65c0033df32f05134142509199a7c6";
var private_key = "726575ae5c96ce22879a742b33a3fb1d7a17c86ac43da96b96";

var client_id = "179_2kt85b5gybc440o48o880go4g08g4k4oo8kkkooos08cs4o0sk";
var client_secret = "pia5gn4xsis0ow8sgg0ss84wc88sog8sg0scw0sksocs84o4c";

console.log(Payement)

var payment = Payement("https://vanillashop.herokuapp.com", client_id, client_secret, public_key, private_key);

console.log(payment);
payment.sayHi()
// payment.initPaie("1", 500, "Tsiresy Mila", "RP 235230", "3.217.51.200", function (idpayment) {
//     console.log(idpayment);
//     //res.render('pages/index');
// });