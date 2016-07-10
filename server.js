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


  //FLICKER CONTROL
  socket.on('flicker-update-columns', function(data){
    io.sockets.emit('flicker-update-columns', data);
  });

  socket.on('flicker-update-rows', function(data){
    io.sockets.emit('flicker-update-rows', data);
  });

  socket.on('flicker-update-frequency', function(data){
    io.sockets.emit('flicker-update-frequency', data);
  });

  socket.on('flicker-update-offset', function(data){
    io.sockets.emit('flicker-update-offset', data);
  });


  //VIRUS CONTROL
  socket.on('virus-add-individual', function(data){
    io.sockets.emit('virus-add-individual', data);
  });

  socket.on('virus-update-speed', function(data){
    io.sockets.emit('virus-update-speed', data);
  });
});
