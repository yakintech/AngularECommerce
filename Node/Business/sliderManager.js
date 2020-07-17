var mongo = require('../Context/mongo');

const sliderManager = {
    get: (req, res) => {
        mongo.slider.find({ "isdeleted": false }, (err, doc) => {
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
        mongo.slider.findById(id, (err, doc) => {
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
        var data = new mongo.slider({
            imgpath: req.body.imgpath,
            title: req.body.title
        });

        data.save();

        res.json({ "msg": "insert completed!" })
    },
    getbyid: (req, res) => {
        var id = req.params.id;
        mongo.slider.findById(id, (err, doc) => {
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
        mongo.slider.findById(id, (err, doc) => {
            if (!err) {
                doc.email = req.body.email != null ? req.body.email : doc.email;
                doc.password = req.body.password != null ? req.body.password : doc.password;
                doc.save();
                res.json({ "msg": "update completed!" });
            }
        })
    }

}

module.exports = {
    sliderManager
}