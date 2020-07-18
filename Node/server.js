const { check, body, validationResult } = require("express-validator");

var app = require("express")();
var bodyParser = require("body-parser");
var mongo = require("./Context/mongo");
var webuser = require("./Business/webusermanager");
var adminUser = require("./Business/adminManager");
var slider = require("./Business/sliderManager");
var contact = require("./Business/contactManager");
var helpers = require("./Helper/functions");
var product = require("./Business/productManager");
var http = require('http').createServer(app);
var io = require('socket.io')(http);

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
        body("surname").notEmpty().trim().escape().withMessage("Soyad boş geçilemez"),
        body("email").notEmpty().trim().escape().withMessage("Email boş geçilemez"),
        body("email").isEmail().withMessage("Hatalı email formatı"),
        body("email").custom((value) => {
            return helpers.findByEmail(mongo.webuser, value).then((user) => {
                if (user) {
                    return Promise.reject("Email sistemde kayıtlı");
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
app.get("/api/product", (req, res) => {
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
//#endregion
//#region SLIDER
app.get("/api/slider", (req, res) => {
    slider.sliderManager.get(req, res);
});

app.get("/api/slider/:id", (req, res) => {
    slider.sliderManager.getbyid(req, res);
});

app.post(
    "/api/slider/delete",
    [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        slider.sliderManager.delete(req, res);
    }
);

app.post(
    "/api/slider/add",
    [
        body("imgpath").notEmpty().trim()
            //.escape()
            .withMessage("Resim boş geçilemez"),
        body("title").notEmpty().trim()
            //.escape()
            .withMessage("Title boş geçilemez"),
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        slider.sliderManager.insert(req, res);
    }
);

app.post(
    "/api/slider/update",
    [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
    (req, res) => {
        slider.sliderManager.update(req, res);
    }
);
//#endregion
//#region ADMIN
app.get("/api/admin", (req, res) => {
    adminUser.adminManager.get(req, res);
});

app.get("/api/admin/:id", (req, res) => {
    adminUser.adminManager.getbyid(req, res);
});

app.post(
    "/api/admin/delete",
    [body("id").notEmpty().trim().escape().withMessage("id boş geçilemez")],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        adminUser.adminManager.delete(req, res);
    }
);

app.post(
    "/api/admin/add",
    [
        body("password").notEmpty().trim().withMessage("Şifre boş geçilemez"),
        body("email").notEmpty().trim().escape().withMessage("Email boş geçilemez"),
        body("email").isEmail().withMessage("Hatalı email formatı"),
        body("email").custom((value) => {
            return helpers.findByEmail(mongo.webuser, value).then((user) => {
                if (user) {
                    return Promise.reject("Email sistemde kayıtlı");
                }
            });
        }),
        body('passwordConfirmation').custom((value, { req }) => {
            if (value !== req.body.password) {
                return Promise.reject("Şifre tekrarı ile uyuşmuyor");
                //throw new Error('Password confirmation does not match password');
            }
            return true;
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        adminUser.adminManager.insert(req, res);
    }
);

app.post(
    "/api/admin/update",
    [
        //body("id").notEmpty().trim().escape().withMessage("id boş geçilemez"),
        body("email").notEmpty().trim().escape().withMessage("Email boş geçilemez"),
        body("newPassword").notEmpty().trim().withMessage("Yeni şifre boş geçilemez"),
        body("oldPassword").notEmpty().trim().withMessage("Eski şifre boş geçilemez"),
        body('oldPassword').custom((value, { req }) => {
            return helpers.findByEmail(mongo.adminUser, req.body.email).then((user) => {
                if (user) {
                    if (user.password !== value) {
                        return Promise.reject("Eski şifre hatalı");
                    }
                }
            });
        })
    ],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        adminUser.adminManager.update(req, res);
    }
);
//#endregion

io.on('connection', (socket) => {
    console.log("Client connect!");

    socket.on("merhabaserver",function(){
        socket.emit("merhabaclient");
    })

    socket.on("clientpush",function(){
        socket.emit("sitepush");
    })
})

http.listen(3000, () => {
    console.log('listening on *:3000');
  });

