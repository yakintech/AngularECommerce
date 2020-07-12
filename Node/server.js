var app = require('express')();
var bodyParser = require('body-parser');
var mongo = require('./Context/mongo');
var webuser = require('./Business/webusermanager');
var contact = require('./Business/contactManager');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/api/webuser", (req, res) => {
    webuser.webusermanager.get(req, res);
});

app.get("/api/webuser/:id", (req, res) => {
    webuser.webusermanager.getbyid(req, res);
});

app.post("/api/webuser/delete", (req, res) => {
    webuser.webusermanager.delete(req, res);
});

app.post("/api/webuser/add", (req, res) => {
    webuser.webusermanager.insert(req, res);
})

app.post("/api/webuser/update", (req, res) => {
    webuser.webusermanager.update(req, res);
})

/****CONTACT****/
app.get("/api/contact", (req, res) => {
    contact.contactManager.get(req, res);
});

app.get("/api/contact/:id", (req, res) => {
    contact.contactManager.getbyid(req, res);
});

app.post("/api/contact/delete", (req, res) => {
    contact.contactManager.delete(req, res);
});

app.post("/api/contact/add", (req, res) => {
    contact.contactManager.insert(req, res);
})

app.post("/api/contact/update", (req, res) => {
    contact.contactManager.update(req, res);
})
/****CONTACT****/

app.listen(3000);