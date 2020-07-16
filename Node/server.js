const { check, body, validationResult } = require("express-validator");

var app = require("express")();
var bodyParser = require("body-parser");
var mongo = require("./Context/mongo");
var webuser = require("./Business/webusermanager");
var contact = require("./Business/contactManager");
var helpers = require("./Helper/functions");
var product = require("./Business/productmanager");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

//#region WEB
app.get("/api/webuser", (req, res) => {
  webuser.webusermanager.get(req, res);
});

app.get("/api/webuser/:id", (req, res) => {
  webuser.webusermanager.getbyid(req, res);
});

app.post(
  "/api/webuser/delete",
  [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    webuser.webusermanager.delete(req, res);
  }
);

app.post(
  "/api/webuser/add",
  [
    body("name").notEmpty().trim().escape().withMessage("Ad boş geçilemez"),
    body("surname")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Soyad boş geçilemez"),
    body("email").notEmpty().trim().escape().withMessage("Email boş geçilemez"),
    body("email").isEmail().withMessage("Hatalı email formatı"),
    body("email").custom((value) => {
      return helpers.findByEmail(mongo.webuser, value).then((user) => {
        if (user) {
          return Promise.reject("E-mail already in use");
        }
      });
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    webuser.webusermanager.insert(req, res);
  }
);

app.post(
  "/api/webuser/update",
  [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    webuser.webusermanager.update(req, res);
  }
);
//#endregion
//#region CONTACT
app.get("/api/contact", (req, res) => {
  contact.contactManager.get(req, res);
});

app.get("/api/contact/:id", (req, res) => {
  contact.contactManager.getbyid(req, res);
});

app.post(
  "/api/contact/delete",
  [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    contact.contactManager.delete(req, res);
  }
);

app.post(
  "/api/contact/add",
  [
    body("email").notEmpty().trim().escape().withMessage("email boş geçilemez"),
    body("message")
      .notEmpty()
      .trim()
      .escape()
      .withMessage("Mesaj boş geçilemez"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    contact.contactManager.insert(req, res);
  }
);

app.post(
  "/api/contact/update",
  [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
  (req, res) => {
    contact.contactManager.update(req, res);
  }
);
//#endregion

//#region PRODUCT
app.get("/api/product/list", (req, res) => {
  product.productmanager.get(req, res);
});

app.get("/api/product/:id", (req, res) => {
  product.productmanager.getbyid(req, res);
});

app.post(
  "/api/product/delete",
  [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    product.productmanager.delete(req, res);
  }
);

app.post(
  "/api/product/add",
  //   [
  //     body("name").notEmpty().trim().escape().withMessage("Ad boş geçilemez"),
  //     body("description")
  //       .notEmpty()
  //       .trim()
  //       .escape()
  //       .withMessage("Açıklama boş geçilemez"),
  //     body("unitprice")
  //       .notEmpty()
  //       .trim()
  //       .escape()
  //       .withMessage("Fiyat boş geçilemez"),
  //     body("photos")
  //       .notEmpty()
  //       .trim()
  //       .escape()
  //       .withMessage("Ürün için en az bir fotoğraf girilmeli"),
  //     ,
  //     body("code")
  //       .notEmpty()
  //       .trim()
  //       .escape()
  //       .withMessage("Ürün kodu boş geçilemez"),
  //     ,
  //     body("code").custom((value) => {
  //       return helpers.findByCode(mongo.product, value).then((data) => {
  //         if (data) {
  //           return Promise.reject("Ürün kodu var olan ürünle aynı olamaz");
  //         }
  //       });
  //     }),
  //     body("category")
  //       .notEmpty()
  //       .trim()
  //       .escape()
  //       .withMessage("Kategori boş geçilemez"),
  //   ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    product.productmanager.insert(req, res);
  }
);
app.post(
  "/api/product/update",
  [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    product.productmanager.update(req, res);
  }
);

//#region SLIDER

//#endregion
app.listen(3000);
