//bu js de sadece veritabanı şemalarım bulunur!
const mongoose = require('mongoose');
//mongodb+srv://AngularUser:Fe44D81@angularecommercedb.on1pt.mongodb.net/test

mongoose.connect(`mongodb+srv://AngularUser:Fe44D81@angularecommercedb.on1pt.mongodb.net/test`, { useNewUrlParser: true });

const Schema = mongoose.Schema;

const webuserSchema = new Schema({
    name:String,
    surname:String,
    address:String,
    email:String,
    phone:String,
    adddate:{type:Date,default:Date.now},
    isdeleted:{type:Boolean,default:false}
});

const webuser = mongoose.model('Webuser',webuserSchema);

var w = new webuser({
    name:"aa"
});
w.save();

//export sayesinde diğer js dosyaları şemalarıma erişebilir
module.exports = {
    webuser
}


