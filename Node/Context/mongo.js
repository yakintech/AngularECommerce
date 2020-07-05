//bu js de sadece veritabanı şemalarım bulunur!
const mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://azra_elturco:1996417B@cluster417-vl3kd.mongodb.net/test?authSource=admin&replicaSet=Cluster417-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true
`, { useNewUrlParser: true });

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


//export sayesinde diğer js dosyaları şemalarıma erişebilir
module.exports = {
    webuser
}


