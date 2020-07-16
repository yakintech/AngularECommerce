var mongo = require("./../Context/mongo");
const productmanager = {
  get: (req, res) => {
    mongo.product.find({ isdeleted: false }, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.json(err);
      }
    });
  },
  delete: (req, res) => {
    var id = req.body.id;

    mongo.product.findById(id, (err, doc) => {
      if (!err) {
        doc.isdeleted = true;
        doc.save();
        res.json({ msg: "Success!" });
      } else {
        res.json(err);
      }
    });
  },
  insert: (req, res) => {
    var p = new mongo.product({
      name: req.body.name,
      description: req.body.description,
      unitprice: req.body.unitprice,
      photos: req.body.photos,
      code: req.body.code,
      sort: req.body.sort,
      category: req.body.category,
    });

    p.save();

    res.json({ msg: "OK!" });
  },
  getbyid: (req, res) => {
    var id = req.params.id;
    mongo.product.findById(id, (err, doc) => {
      if (!err) {
        res.json(doc);
      } else {
        res.json(err);
      }
    });
  },
  update: (req, res) => {
    var id = req.body.id;
    mongo.webuser.findById(id, (err, doc) => {
      if (!err) {
        doc.name = req.body.name != null ? req.body.name : doc.name;
        doc.description =
          req.body.description != null ? req.body.description : doc.description;
        doc.unitprice =
          req.body.unitprice != null ? req.body.unitprice : doc.unitprice;
        doc.photos = req.body.photos != null ? req.body.photos : doc.photos;
        doc.code = req.body.code != null ? req.body.code : doc.code;
        doc.sort = req.body.sort != null ? req.body.sort : doc.sort;
        doc.category =
          req.body.category != null ? req.body.category : doc.category;

        doc.save();
        res.json({ msg: "Updated!" });
      }
    });
  },
};

module.exports = {
  productmanager,
};
