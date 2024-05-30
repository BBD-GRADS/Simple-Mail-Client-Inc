const express = require('express');
const app = express();

app.get('/', function(req, res){
   res.send("Hello world!");
});

app.get('/check', function(req, res){
   res.send("Running...");
});

app.get('/test', function(){
   res.send(process.env.Test);
});

app.listen(3000);