var mongo = require('./../Context/mongo');
const { webuser } = require('./../Context/mongo');


const webusermanager = {
    get:(req,res)=>{
        mongo.webuser.find({"isdeleted":false},(err,doc)=>{
            if(!err){
                res.json(doc);
            }
            else{
                res.json(err);
            }
        });
    },
    delete:(req,res)=>{
        var id = req.body.id;

        mongo.webuser.findById(id,(err,doc)=>{
            if(!err){
                doc.isdeleted = true;
                doc.save();
                res.json({"msg":"Success!"});
            }
            else{
                res.json(err);
            }
        })
    },
    insert:(req,res) =>{
        var w = new mongo.webuser({
            name:req.body.name,
            surname:req.body.surname,
            address:req.body.address,
            email:req.body.email,
            phone:req.body.phone,
        });

        w.save();

        res.send("OK!")
    }

}


module.exports = {
    webusermanager
}