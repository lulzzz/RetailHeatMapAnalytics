/**
 * Created by gaggi on 5/3/17.
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe280:cmpe280@ds129281.mlab.com:29281/cmpe280";
var ejs = require('ejs');

exports.getdaily=function(req,res){

    // var store=req.param('storename');

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('analyticsdaily');
        coll.find({"store":"walmart"}).toArray(function(err, user){
            if(user)
            {

                res.status(200).send({"result":user});
            }
            else
            {
                res.status(401).send({"status":"Failed"});

            }

        });

    });


};
exports.postdaily=function(req,res){

    var store=req.param('storename');
    var current=req.param('current');
    var coord=req.param('coord');

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.insertOne({"timestamp" : new Date(),
            "store" : store,
            "coord":coord

        }, function(err,data){
            if(err)
            {
                console.log(err);
                res.status(401).send({"status":"Insertion Failed"});
            }
            else
            {
                console.log(data);
                res.status(200).send({"status":"Successfully Inserted"});

            }

        });

    });


};
