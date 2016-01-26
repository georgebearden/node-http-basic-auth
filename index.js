var express = require('express');
var basicAuth = require('basic-auth');
var bodyParser = require('body-parser');

function notAuthenticated(res) {
    res.set('WWW-Authenticate', 'Basic realm=localhost');
    return res.sendStatus(401);
};

var authenticate = function(req, res, callback) {
  var user = basicAuth(req);
  if (!user || !user.name || !user.pass) {
    return notAuthenticated(res);
  }

  if (user.name === 'george' && user.pass === '123456') {
    // pass the username with the request body.
    req.body.username = user.name;
    return callback(null)
  } else {
    return notAuthenticated(res);
  }
};

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/login', authenticate, function(req, res) {
  console.log(req.body);
  res.sendStatus(200);
});

app.listen(3000);
