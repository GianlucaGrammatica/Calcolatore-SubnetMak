const express = require('express')
const ejs = require('ejs');
const ip = require('ip');

const portNumber = 2000;
const ipAddress = '127.0.0.1';

function getAbsoluteUrl(uri) {
  return 'http://' + ipAddress + ':' + portNumber + '/' + uri;
}

const app = express();
app.locals.baseUrl = getAbsoluteUrl('');

// Static files
app.use(express.static('public'));

// Body parser ???
app.use(express.urlencoded({ extended: true }));

// Template engine
app.set('view engine', 'ejs');

app.get(['/', '/index', 'home'], (req, res) => {
  res.render('index', { error: null });
});

app.get(['/calc-subnet'], (req, res) => {
  res.render('calc-subnet', { error: null });
});

app.post(['/calc-subnet'], (req, res) => {
  let ip = req.body.ip;
  let cidr = parseInt(req.body.cidr);

    console.log(`Blup: ${ip} - ${cidr}`)

  let array = ip.split(".");
  let finalthing ="";

  console.log(`eeeee: ${array}`)

  array.forEach(cuartino => {
    finalthing += toBase(cuartino, 2);
  });

  let neededBits = 32 - cidr;

  console.log(finalthing)
  let bitUsati = finalthing.slice(-neededBits)

  console.log(`naaaa: ${finalthing} titi ${bitUsati}`)
});


function toBase(num, base){
  return parseInt(num).toString(base);
}

app.listen(portNumber, ipAddress, () => {
  console.log(`Server ready at http://${ipAddress}:${portNumber}`)
})