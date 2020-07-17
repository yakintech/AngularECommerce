var mongo = require('../Context/mongo');

const adminManager = {
    get: (req, res) => {
        mongo.adminUser.find({ "isdeleted": false }, (err, doc) => {
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

        mongo.adminUser.findById(id, (err, doc) => {
            if (!err) {
                doc.isdeleted = true;
                doc.save();
                res.json({ "msg": "delete completed!" });
            }
            else {
                res.json(err);
            }
        })
    },
    insert: (req, res) => {
        var data = new mongo.adminUser({
            email: req.body.email,
            password: req.body.password
        });

        data.save();

        res.json({ "msg": "insert completed!" })
    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.adminUser.findById(id, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        })
    },
    update: (req, res) => {
        //var id = req.body.id;
        mongo.adminUser.findOne({ email: req.body.email }, (err, doc) => {
            if (!err) {
                //doc.email = req.body.email != null ? req.body.email : doc.email;
                doc.password = req.body.newPassword != null ? req.body.newPassword : doc.password;
                doc.save();
                res.json({ "msg": "update completed!" });
            }
        })
    }

}

module.exports = {
    adminManager
}