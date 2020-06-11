var express = require('express');
var logger = require('connect-logger');
var cookieParser = require('cookie-parser');
var session = require('cookie-session');
var request = require('request');
var axios = require('axios');

var port = 5000;
var app = express();


app.post('/auth', function (req, res) {
  const token = req.header('Authorization').replace('Bearer ', '');
  axios
    .post('https://graph.microsoft.com/v1.0/me', {
      headers: { Authorization: `Bearer ${ token }` }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server is listening on port ${ port }!`);
});