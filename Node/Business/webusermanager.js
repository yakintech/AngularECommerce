var mongo = require('./../Context/mongo');
var helpers = require("./../Helper/emailsender");
const { webuser } = require('./../Context/mongo');


var mailOptions = {
    from: 'bilgebatman19@gmail.com',
    to: '',
    subject: 'Register Code',
    text: ''
  };

const webusermanager = {
    get: (req, res) => {
        mongo.webuser.find({ "isdeleted": false }, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        });
    },
    delete: (req, res) => {
        var id = req.body.id;

        mongo.webuser.findById(id, (err, doc) => {
            if (!err) {
                doc.isdeleted = true;
                doc.save();
                res.json({ "msg": "Success!" });
            }
            else {
                res.json(err);
            }
        })
    },
    insert: (req, res) => {
        var w = new mongo.webuser({
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            password:req.body.password
        });

        w.save();

        res.json({ "msg": "OK!" })
    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.webuser.findById(id, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        })
    },
    update: (req, res) => {

        var id = req.body.id;
        mongo.webuser.findById(id, (err, doc) => {
            if (!err) {
                doc.name = req.body.name != null ? req.body.name : doc.name;
                doc.surname = req.body.surname != null ? req.body.surname : doc.surname;
                doc.phone = req.body.phone != null ? req.body.phone : doc.phone;
                doc.email = req.body.email != null ? req.body.email : doc.email;
                doc.address = req.body.address != null ? req.body.address : doc.address;

                doc.save();
                res.json({ "msg": "Updated!" });
            }
        })
    },
    register:(req,res)=>{
        var email = req.body.email;
        var code = Math.floor(Math.random() * 1000000);
        var w = new mongo.webuser({
            email:req.body.email,
            dynamiccode:code
        });
        
        w.save();

        mailOptions.to = email;
        mailOptions.text = "Kayıt için kodunuz: " + code + ".";
        helpers.SendEMail(mailOptions);

        res.json({"msg":"İşlem başarılı!"});

    }

}


module.exports = {
    webusermanager
}