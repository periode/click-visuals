var http = require('http');
var fs = require('fs');
var url = require('url');
var body = require('body-parser');

var port = 2046;

function handler(req, res, err){
  var parsed_url = url.parse(req.url, true);
  var path = parsed_url.pathname;

  if(path == '/')
    path = '/index.html';

    fs.readFile('public'+path, function(err, data){
      if(err){
        res.writeHead(500);
        return res.end ('a problem happened, along the lines of '+err);
      }else{
        res.writeHead(200);
        res.end(data);
      }
    });
}

var server = http.createServer(handler);
server.listen(port, function(){
  console.log('server started successfully on port:',port);
});



//SOCKETS
var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
  console.log('new connection with ID',socket.id);

  socket.on('switch-scene', function(data){
    console.log('switching scene to', data);
    io.sockets.emit('switch-scene', data);
  });
});
