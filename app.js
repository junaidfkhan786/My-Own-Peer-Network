var express = require('express');
var path = require('path');
var http = require('http');
var cors = require('cors');
var errorhandler = require('errorhandler');
var ExpressPeerServer = require('peer').ExpressPeerServer;

var options = {
  debug: true,
  key: 'videocall'
};

var app = express();
var server = http.createServer(app);

var port = process.env.PORT || '3000';

app.set('port', port);

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/peerjs', ExpressPeerServer(server, options));
app.use(errorhandler());

process.on('uncaughtException', function (exc) {
  console.error(exc);
});

server.listen(port);
