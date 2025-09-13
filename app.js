const express = require('express')
const ejs = require('ejs');
const ipFun = require('ip');

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
  res.render('calc-subnet', {showRes: false});
});

app.post(['/calc-subnet'], (req, res) => {

  let ip = req.body.ip;
  let cidr = parseInt(req.body.cidr);

  console.log(`Blup: ${ip} - ${cidr}`)

  subnetMask = ipFun.fromPrefixLen(cidr);
  let subnet = ipFun.subnet(ip, subnetMask);

  console.log(`subnetMask: ${subnet}`, subnet)

  res.render('calc-subnet', {showRes: true, subnet: subnet , ip: ip})
});


function toBase(num, base){
  return parseInt(num).toString(base);
}

app.listen(portNumber, ipAddress, () => {
  console.log(`Server ready at http://${ipAddress}:${portNumber}`)
})