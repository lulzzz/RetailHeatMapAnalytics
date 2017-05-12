/**
 * Created by gaggi on 5/2/17.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe280:cmpe280@ds129281.mlab.com:29281/cmpe280";
var ejs = require('ejs');
var h = 08;
var m = 30;

// exports.getmonthly=function(req,res){
//
//     var store=req.param('storename');
//     var end = new Date(2017, 04, 30);
//     var start = new Date(2017, 04, 01);
//
//     mongo.connect(mongoURL, function(){
//         console.log('Connected to mongo at: ' + mongoURL);
//         var coll = mongo.collection('heatmapdaily');
//         coll.find({"timestamp":{$gte: start, $lt: end},"store":store}).toArray(function(err, user){
//             if(user)
//             {
//
//                 res.status(200).send({"result":user});
//             }
//             else
//             {
//                 res.status(401).send({"result":"Failed"});
//
//             }
//
//         });
//
//     });
//
//
// };
// exports.getyearly=function(req,res){
//
//     var store=req.param('storename');
//     var year = req.param('year');
//     var end = new Date(year, 13, 31);
//     var start = new Date(2017, 01, 01);
//
//     mongo.connect(mongoURL, function(){
//         console.log('Connected to mongo at: ' + mongoURL);
//         var coll = mongo.collection('heatmapdaily');
//         coll.find({"timestamp":{$gte: start, $lt: end},"store":store}).toArray(function(err, user){
//             if(user)
//             {
//
//                 res.status(200).send({"result":user});
//             }
//             else
//             {
//                 res.status(401).send({"result":"Failed"});
//
//             }
//
//         });
//
//     });
//
//
// };
exports.getCurrent=function(req,res){

    var store=req.param('storename');

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"store":store}).sort({timestamp:1}).toArray(function(err, result){
            if(result)
            {


                res.status(200).send(result);
            }
            else
            {
                res.status(401).send({"result":"Failed"});

            }

        });

    });


};
exports.getdaily=function(req,res){

    var store=req.param('storename').toLowerCase();

    var start = new Date(req.param('dated'));
    var end = new Date(req.param('dated'));
    start.setDate(1);
    start.setHours(0);
    start.setMinutes(0);
    start.setMonth(05);
    end.setDate(1);
    end.setHours(23);
    end.setMinutes(59);
    end.setMonth(05);
    console.log(start);
    console.log(end);


    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp": {"$gte": new Date(start), "$lt": new Date(end)},"store":store}).toArray(function(err, result){
            if(result)
            {

                res.status(200).send(result);
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
exports.postrandom=function(req,res){

    var store=req.param("storename");
    var coord=req.param("coord");
    var d = new Date();
    h=h+1;
    d.setDate(5);
    d.setMonth(05);
    d.setHours(h);
    d.setMinutes(m);

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.insertOne({"timestamp" : new Date(d),
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