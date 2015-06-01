/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/serve-static/serve-static.d.ts"/>

import express = require('express');
import serveStatic = require('serve-static');

var app = express();

var serve = serveStatic('public');

app.use(serve);

app.get('/hello-world', (req:express.Request , res:express.Response): void => {
  res.json({
    message: 'Hello, World!'
  });
});

app.listen(3000, function () {
  console.log("Listening...");
});