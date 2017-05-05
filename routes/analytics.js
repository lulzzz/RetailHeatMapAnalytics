/**
 * Created by gaggi on 5/3/17.
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe280:cmpe280@ds129281.mlab.com:29281/cmpe280";
var ejs = require('ejs');

exports.getsale=function(req,res){

     var store=req.param('storename');

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('analyticsdaily');
        coll.find({"store":store}).toArray(function(err, user){
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
exports.getperson=function(req,res){

    var store=req.param('storename');
    var start = new Date(req.param('dated'));
    var end = new Date(req.param('dated'));


    start.setHours(0);
    start.setMinutes(0);
    end.setHours(23);
    end.setMinutes(59);




    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.aggregate([ {$match:{"timestamp":{$gte: start, $lt: end},"store":store}},
            {
                $project: {
                    _id:0,
                    timestamp:1,
                    numberofpersons: { $size: "$coord" }
                }
            }
        ]).toArray(function(err, result){
            if(result)
            {
                console.log(result);
                res.status(200).send({"result":result});
            }
            else
            {
                res.status(401).send({"result":"Failed"});

            }

        });

    });



};
