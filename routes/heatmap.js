/**
 * Created by gaggi on 5/2/17.
 */
var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe280:cmpe280@ds129281.mlab.com:29281/cmpe280";
var ejs = require('ejs');

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
exports.gethourly=function(req,res){

    var store=req.param('storename');

    console.log(new Date("2017-05-01T16:30:11.480Z").getHours())
    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp":new Date("2017-05-01T16:30:47.344Z"),"store":store}).toArray(function(err, user){
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

    var store=req.param('storename').toLowerCase();
    var start = new Date(req.param('dated'));
    var end = new Date(req.param('dated'));
    start.setHours(0);
    start.setMinutes(0);
    end.setHours(23);
    end.setMinutes(59);


    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('heatmapdaily');
        coll.find({"timestamp": {"$gte": new Date(2017,4, 1), "$lt": new Date(2017,4,2)},"store":store}).toArray(function(err, result){
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
exports.postrandom=function(req,res){

    var store="costco";
    var coord=[
        {
            "x": 408.1,
            "y": 160,
            "value": 1
        },
        {
            "x": 566.3,
            "y": 40,
            "value": 1
        },
        {
            "x": 195.2,
            "y": 40,
            "value": 1
        },
        {
            "x": 304.2,
            "y": 241.3,
            "value": 1
        },
        {
            "x": 275.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 406.3,
            "y": 160,
            "value": 1
        },
        {
            "x": 179.3,
            "y": 40,
            "value": 1
        },
        {
            "x": 157.5,
            "y": 40,
            "value": 1
        },
        {
            "x": 287.2,
            "y": 40,
            "value": 1
        },
        {
            "x": 454.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 408.1,
            "y": 160,
            "value": 1
        },
        {
            "x": 566.3,
            "y": 40,
            "value": 1
        },
        {
            "x": 195.2,
            "y": 40,
            "value": 1
        },
        {
            "x": 304.2,
            "y": 241.3,
            "value": 1
        },
        {
            "x": 275.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 406.3,
            "y": 160,
            "value": 1
        },
        {
            "x": 179.3,
            "y": 40,
            "value": 1
        },
        {
            "x": 157.5,
            "y": 40,
            "value": 1
        },
        {
            "x": 287.2,
            "y": 40,
            "value": 1
        },
        {
            "x": 454.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 409.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 177.5,
            "y": 40,
            "value": 1
        },
        {
            "x": 179.3,
            "y": 40,
            "value": 1
        },
        {
            "x": 157.5,
            "y": 40,
            "value": 1
        },
        {
            "x": 287.2,
            "y": 40,
            "value": 1
        },
        {
            "x": 454.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 409.2,
            "y": 160,
            "value": 1
        },
        {
            "x": 177.5,
            "y": 40,
            "value": 1
        }
    ];

    var d = new Date();
    d.setDate(1);
    d.setHours(09);
    d.setMinutes(30);

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