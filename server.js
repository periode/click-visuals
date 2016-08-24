var http = require('http');
var fs = require('fs');
var url = require('url');
var body = require('body-parser');

var port = 80;

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
    console.log('switching scene to', data.scene);
    io.sockets.emit('switch-scene', data);
  });

  //SWIPE CONTROL
  socket.on('swipe', function(data){
    io.sockets.emit('swipe', data);
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

  socket.on('flicker-update-speed', function(data){
    io.sockets.emit('flicker-update-speed', data);
  });

  socket.on('flicker-update-offset', function(data){
    io.sockets.emit('flicker-update-offset', data);
  });

  socket.on('flicker-toggle-chromatic', function(data){
    io.sockets.emit('flicker-toggle-chromatic', data);
    console.log('yoo');
  });


  //VIRUS CONTROL
  socket.on('virus-add-individual', function(data){
    io.sockets.emit('virus-add-individual', data);
  });

  socket.on('virus-update-speed', function(data){
    io.sockets.emit('virus-update-speed', data);
  });


  //POSTURE CONTROL
  socket.on('posture-set', function(data){
    io.sockets.emit('posture-set', data);
  });

  socket.on('posture-reset', function(data){
    io.sockets.emit('posture-reset', data);
  });

  socket.on('posture-unshadow', function(data){
    io.sockets.emit('posture-unshadow', data);
  });

  socket.on('posture-dance', function(data){
    io.sockets.emit('posture-dance', data);
  });


  //EXPRESSION CONTROL
  socket.on('expression-update-speed', function(data){
    io.sockets.emit('expression-update-speed', data);
  });

  socket.on('expression-set', function(data){
    io.sockets.emit('expression-set', data);
  });

  socket.on('expression-toggle', function(data){
    io.sockets.emit('expression-toggle', data);
  });
});
