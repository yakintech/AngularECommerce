var mongo = require('../Context/mongo');
const { contact } = require('../Context/mongo');

/*
    email:String,
    message:String,
    adddate:{type:Date,default:Date.now},
    isdeleted:{type:Boolean,default:false}
*/

const contactManager = {
    get: (req, res) => {
        mongo.contact.find({ "isdeleted": false }, (err, doc) => {
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

        mongo.contact.findById(id, (err, doc) => {
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
        var data = new mongo.contact({
            email: req.body.email,
            message: req.body.message
        });

        data.save();

        res.json({ "msg": "insert completed!" })
    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.contact.findById(id, (err, doc) => {
            if (!err) {
                res.json(doc);
            }
            else {
                res.json(err);
            }
        })
    },
    update: (req, res) => {

        var id = req.body._id;
        mongo.contact.findById(id, (err, doc) => {
            if (!err) {
                doc.email = req.body.email;
                doc.message = req.body.message;

                doc.save();
                res.json({ "msg": "update completed!" });
            }
        })
    }

}

module.exports = {
    contactManager
}