var mongo = require('./../Context/mongo');


const webusermanager = {
    get:(req,res)=>{
        mongo.webuser.find({"isdeleted":false},(err,doc)=>{
            if(!err){
                res.send(doc);
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
                res.send("Success!");
            }
            else{
                res.json(err);
            }
        })
    }
}


module.exports = {
    webusermanager
}