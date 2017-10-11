 var express = require('express');
   var bodyParser = require('body-parser');
   var mysql = require('mysql');
   var app = express();
var fs=require('fs');
var http=require('http');
var https=require('https');
    app.use(bodyParser.json({limit: '50mb'}));
    app.use(express.static('public'));

  var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'testn'
   });
   connection.connect();
var options = {
 key: fs.readFileSync('privkey.pem'),
 cert: fs.readFileSync('cert.pem')
}
    app.post('/blah', function(req, res, next) {
    var cope = req.body;
    console.log('request received:', req.body);
   var query = connection.query('insert into form set ?', cope, function (err,     result) {
    if (err) {
        console.error(err);
        return res.send(err);
    } else {
        return res.send('Ok');
    }
    });
    //res.send('received the data.');
    });
    var server = http.createServer(app).listen(3000);
var server1 = https.createServer(options,app).listen(3443);
console.log('server running on 3443')