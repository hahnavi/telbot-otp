const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', require('./routes/user'));
app.use('/otp', require('./routes/otp'));

module.exports = app;
