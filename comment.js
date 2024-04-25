// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/comment', function (req, res) {
    fs.readFile(__dirname + "/" + "comment.json", 'utf8', function (err, data) {
        console.log(data);
        res.end(data);
    });
})

app.post('/comment', function (req, res) {
    fs.readFile(__dirname + "/" + "comment.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data.push(req.body);
        fs.writeFile(__dirname + "/" + "comment.json", JSON.stringify(data), function (err) {
            if (err) {
                console.log(err);
            }
        });
        res.end(JSON.stringify(data));
    });
})

app.delete('/comment', function (req, res) {
    fs.writeFile(__dirname + "/" + "comment.json", '[]', function (err) {
        if (err) {
            console.log(err);
        }
        res.end('[]');
    });
})

var server = app.listen(8001, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server is running at http://%s:%s", host, port);
})