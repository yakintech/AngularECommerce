//bu js de sadece veritabanı şemalarım bulunur!
const mongoose = require("mongoose");
//mongodb+srv://AngularUser:Fe44D81@angularecommercedb.on1pt.mongodb.net/test

mongoose.connect(
  `mongodb+srv://AngularUser:Fe44D81@angularecommercedb.on1pt.mongodb.net/test`,
  { useNewUrlParser: true }
);

const Schema = mongoose.Schema;

const webuserSchema = new Schema({
  name: String,
  surname: String,
  address: String,
  email: String,
  phone: String,
  lastlogindate: Date,
  adddate: { type: Date, default: Date.now },
  isdeleted: { type: Boolean, default: false },
});

const adminuserSchema = new Schema({
  email: String,
  password: String,
  adddate: { type: Date, default: Date.now },
  isdeleted: { type: Boolean, default: false },
});

const productSchema = new Schema({
  name: String,
  description: String,
  unitprice: String,
  photos: [],
  code: String,
  sort: Number,
  category: String,
});

const orderSchema = new Schema({
  no: String,
  orderdate: Date,
  userid: String,
  orderaddress: String,
  details: [
    {
      productid: String,
      quantity: Number,
      UnitPrice: Number,
      Discount: Number,
    },
  ],
  adddate: { type: Date, default: Date.now },
  isdeleted: { type: Boolean, default: false },
});

const contactSchema = new Schema({
  email: String,
  message: String,
  adddate: { type: Date, default: Date.now },
  isdeleted: { type: Boolean, default: false },
});

const sliderSchema = new Schema({
  imgpath: String,
  adddate: { type: Date, default: Date.now },
  isdeleted: { type: Boolean, default: false },
});

const webuser = mongoose.model("Webuser", webuserSchema);
const adminuser = mongoose.model("Adminuser", adminuserSchema);
const product = mongoose.model("Product", productSchema);
const order = mongoose.model("Order", orderSchema);
const contact = mongoose.model("Contact", contactSchema);
const slider = mongoose.model("Slider", sliderSchema);

//export sayesinde diğer js dosyaları şemalarıma erişebilir
module.exports = {
  webuser,
  contact,
  product,
};
