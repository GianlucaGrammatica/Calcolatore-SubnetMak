const express = require('express')
const ejs = require('ejs');

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

app.get('/', (req, res) => {
  res.render('home', { error: null });
});

app.listen(portNumber, ipAddress, () => {
  console.log(`Server ready at http://${ipAddress}:${portNumber}`)
})