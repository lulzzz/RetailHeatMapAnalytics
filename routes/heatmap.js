/**
 * Created by gaggi on 5/2/17.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe280:cmpe280@ds129281.mlab.com:29281/cmpe280";
var ejs = require('ejs');

exports.getmonthly=function(req,res){

    var store=req.param('storename');
    var end = new Date(2017, 04, 30);
    var start = new Date(2017, 04, 01);

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp":{$gte: start, $lt: end},"store":store}).toArray(function(err, user){
            if(user)
            {

                res.status(200).send({"result":user});
            }
            else
            {
                res.status(401).send({"result":"Failed"});

            }

        });

    });


};
exports.getyearly=function(req,res){

    var store=req.param('storename');
    var year = req.param('year');
    var end = new Date(year, 13, 31);
    var start = new Date(2017, 01, 01);

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp":{$gte: start, $lt: end},"store":store}).toArray(function(err, user){
            if(user)
            {

                res.status(200).send({"result":user});
            }
            else
            {
                res.status(401).send({"result":"Failed"});

            }

        });

    });


};
exports.gethourly=function(req,res){

    var store=req.param('storename');
    var end = new Date(2017, 04, 30);
    var start = new Date(2017, 04, 01);

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp":{$gte: start, $lt: end},"store":store}).toArray(function(err, user){
            if(user)
            {

                res.status(200).send({"result":user});
            }
            else
            {
                res.status(401).send({"result":"Failed"});

            }

        });

    });


};
exports.getdaily=function(req,res){

    var store=req.param('storename');
    var end = new Date(2017, 04, 30);
    var start = new Date(2017, 04, 01);

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp":{$gte: start, $lt: end},"store":store}).toArray(function(err, user){
            if(user)
            {

                res.status(200).send({"result":user});
            }
            else
            {
                res.status(401).send({"result":"Failed"});

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
        coll.insertOne({"timestamp" : new Date('2016-12-04T20:19:31.157Z'),
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
