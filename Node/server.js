var app = require('express')();
var bodyParser = require('body-parser');
var mongo = require('./Context/mongo');
var webuser = require('./Business/webusermanager');

app.get("/api/webuser",(req,res)=>{
    webuser.webusermanager.get(req,res);
});

app.post("/api/webuser/delete",(req,res)=>{
    webuser.webusermanager.delete(req,res);
})


app.listen(3000);