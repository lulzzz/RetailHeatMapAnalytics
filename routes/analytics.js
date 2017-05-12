/**
 * Created by gaggi on 5/3/17.
 */

var mongo = require("./mongo");
var mongoURL = "mongodb://cmpe280:cmpe280@ds129281.mlab.com:29281/cmpe280";
var ejs = require('ejs');
var walmartProduct={jeans:10,shoes:12,bags:9,polos:13};
var targetProduct={watches:10,shoes:12,sweaters:9,polos:13};
var costcoProduct={shirts:10,watches:12,bags:9,polos:13};

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
exports.getcategory=function(req,res){


    var start = new Date(req.param('dated'));
    var end = new Date(req.param('dated'));
    start.setHours(0);
    start.setMinutes(0);
    end.setHours(23);
    end.setMinutes(59);



    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        if(store=="target")
            var coll = mongo.collection('analyticstarget');
        else if(store=="costco")
            var coll = mongo.collection('analyticscostco');
        else
            var coll = mongo.collection('analyticswalmart');
        coll.aggregate([ {$match:{"timestamp":{$gte: new Date(start), $lte: new Date(end)}}},{$unwind: "$product"},
            {$group: {          "_id":null,
                "jeans": {$sum: "$product.jeans" },
                "shirts": {$sum: "$product.shirts" },
                "polos": {$sum: "$product.polos" },
                "watches": {$sum: "$product.watches" },
                "bags": {$sum: "$product.bags" },
                "shoes": {$sum: "$product.shoes" },
                "sweaters": {$sum: "$product.sweaters" },     }}
        ]).toArray(function(err, result){
            if(result)
            {
                var output=[
                    {"name":"jeans","y":result[0].jeans},
                    {"name":"bags","y":result[0].bags},
                    {"name":"watches","y":result[0].watches},
                    {"name":"shirts","y":result[0].shirts},
                    {"name":"polos","y":result[0].polos},
                    {"name":"sweaters","y":result[0].sweaters},
                    {"name":"shoes","y":result[0].shoes},

                ];

                console.log(output);
                res.status(200).send(output);
            }
            else
            {
                console.log(err);
                res.status(401).send("Failed");

            }

        });

    });



};
exports.productCatalog=function(req,res){
    var store=req.param('store');

    if(store=="walmart"){
        walmartProduct.jeans=walmartProduct.jeans+getRandomInt(1,3);
        walmartProduct.shoes=walmartProduct.shoes+getRandomInt(1,3);
        walmartProduct.bags= walmartProduct.bags+getRandomInt(1,3);
        walmartProduct.polos=walmartProduct.polos+getRandomInt(1,3);
        var products=[
            {"name":"Jeans","quantity":walmartProduct.jeans},
            {"name":"Shoes","quantity":walmartProduct.shoes},
            {"name":"Bags","quantity":walmartProduct.bags},
            {"name":"Polo","quantity":walmartProduct.polos},
        ];
    }
    else if(store=="costco"){
        costcoProduct.shirts=costcoProduct.shirts+getRandomInt(1,3);
        costcoProduct.watches=costcoProduct.watches+getRandomInt(1,3);
        costcoProduct.bags= costcoProduct.bags+getRandomInt(1,3);
        costcoProduct.polos=costcoProduct.polos+getRandomInt(1,3);
        var products=[
            {"name":"Shirts","quantity":costcoProduct.shirts},
            {"name":"Watches","quantity":costcoProduct.watches},
            {"name":"Bags","quantity":costcoProduct.bags},
            {"name":"Polo","quantity":costcoProduct.polos},
        ];

    }
    else{
        targetProduct.watches=targetProduct.watches+getRandomInt(1,3);
        targetProduct.shoes=targetProduct.shoes+getRandomInt(1,3);
        targetProduct.sweaters= targetProduct.sweaters+getRandomInt(1,3);
        targetProduct.polos=targetProduct.polos+getRandomInt(1,3);
        var products=[
            {"name":"Watches","quantity":targetProduct.watches},
            {"name":"Shoes","quantity":targetProduct.shoes},
            {"name":"Sweaters","quantity":targetProduct.sweaters},
            {"name":"Polo","quantity":targetProduct.polos},
        ];

    }



    res.status(200).send(products);

};
exports.person=function(req,res){

    var data=[['Store','Today','Yesterday'],
        ['Target',getRandomInt(30,50),getRandomInt(40,60)],
        ['Costco',getRandomInt(40,80),getRandomInt(50,70)],
        ['Walmart',getRandomInt(50,80),getRandomInt(30,90)]]
    res.status(200).send(data);




};
exports.getProduct=function(req,res){

    var store=req.param('storename').toLowerCase();
    var start = new Date(req.param('dated'));
    var end = new Date(req.param('dated'));
    start.setHours(0);
    start.setMinutes(0);
    end.setHours(23);
    end.setMinutes(59);



    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        if(store=="target")
            var coll = mongo.collection('analyticstarget');
        else if(store=="costco")
            var coll = mongo.collection('analyticscostco');
        else
            var coll = mongo.collection('analyticswalmart');
        coll.aggregate([ {$match:{"timestamp":{$gte: new Date(start), $lte: new Date(end)}}},{$unwind: "$product"},
            {$group: {          "_id":null,
                "jeans": {$sum: "$product.jeans" },
                "shirts": {$sum: "$product.shirts" },
                "polos": {$sum: "$product.polos" },
                "watches": {$sum: "$product.watches" },
                "bags": {$sum: "$product.bags" },
                "shoes": {$sum: "$product.shoes" },
                "sweaters": {$sum: "$product.sweaters" },     }}
        ]).toArray(function(err, result){
            if(result)
            {
                var output=[
                    {"name":"jeans","y":result[0].jeans},
                    {"name":"bags","y":result[0].bags},
                    {"name":"watches","y":result[0].watches},
                    {"name":"shirts","y":result[0].shirts},
                    {"name":"polos","y":result[0].polos},
                    {"name":"sweaters","y":result[0].sweaters},
                    {"name":"shoes","y":result[0].shoes},

                ];

                console.log(output);
                res.status(200).send(output);
            }
            else
            {
                console.log(err);
                res.status(401).send("Failed");

            }

        });

    });



};

exports.currentcatalog=function (req,res) {

    mongo.connect(mongoURL, function(){
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('analyticsdaily');
        coll.aggregate([ {$match:{"timestamp":{$gte: start, $lt: end},"store":store}},
            {
                $project: {
                    _id:0,
                    timestamp:1,
                    productcatalog: { $size: "$coord" }
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
                console.log(err);
                res.status(401).send({"result":"Failed"});

            }

        });

    });


}
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
                console.log(err);
                res.status(401).send({"result":"Failed"});

            }

        });

    });



};

exports.category=function(req,res){

    var series=
        [{
            name: 'Target',
            data: [getRandomInt(12,25), getRandomInt(12,17), getRandomInt(16,23), getRandomInt(12,23), getRandomInt(5,16)]
        }, {
            name: 'Costco',
            data: [getRandomInt(30,45), getRandomInt(16,29), getRandomInt(24,36), getRandomInt(34,48), getRandomInt(10,24)]
        }, {
            name: 'Walmart',
            data: [getRandomInt(23,43), getRandomInt(32,39), getRandomInt(12,22), getRandomInt(14,28), getRandomInt(8,19)]
        }];
    res.status(200).send(series);
};

