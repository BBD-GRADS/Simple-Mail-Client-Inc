const express = require('express');
const app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/check', function(req, res){
   res.send("Running...");
});

app.listen(3000);