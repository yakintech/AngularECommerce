var app = require('express')();
var bodyParser = require('body-parser');
var mongo = require('./Context/mongo');
var webuser = require('./Business/webusermanager');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get("/api/webuser",(req,res)=>{
    webuser.webusermanager.get(req,res);
});

app.post("/api/webuser/delete",(req,res)=>{
    webuser.webusermanager.delete(req,res);
});

app.post("/api/webuser/add",(req,res)=>{
    webuser.webusermanager.insert(req,res);
})


app.listen(3000);