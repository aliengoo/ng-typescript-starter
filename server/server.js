var express = require('express');
var serveStatic = require('serve-static');

var app = express();

var serve = serveStatic('public', ['index.html']);

app.use(serve);

app.get('/hello-world', function(req, res){
  res.json({
    message: 'Hello, World'
  });
});

app.listen(3000, function () {
  console.log("Listening...");
});