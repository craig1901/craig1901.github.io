var Router=require('express').Router(),
    http=require('http'),
    api = "1540c983d7a7bde9e700d045ab20744e0dda5fd89172f3b0f";

Router.all(function(req,res,next)
    {
        res.header('Access-Allow-Control-Origin','*');
        next();
    });

Router.get('/word/:theWord/pronunciation', function(req, res) {
    var address = "http://api.wordnik.com:80/v4/word.json/" + req.params.theWord +"/pronunciations?useCanonical=true&typeFormat=ahd&limit=1000&api_key=" + api;
    http.get(address, function(response) {
        var temp = "";
        response.on('data', function(data) {
            temp += data;
        });

        response.on('error', function() {
            console.log(req.params.theWord + " not found in dictionary");
        });

        response.on('end', function(result) {
            var data = JSON.parse(temp);
            res.json(data);
        });

    });
});

Router.get('/word/:theWord/sound', function(req, res) {
    var address = "http://api.wordnik.com:80/v4/word.json/" + req.params.theWord +"/audio?useCanonical=true&typeFormat=ahd&limit=1000&api_key=" + api;
    http.get(address, function(response) {
        var temp = "";

        response.on('data', function(data) {
            temp += data;
        });

        response.on('error', function() {
            console.log(req.params.theWord + " not found in dictionary");
        });

        response.on('end', function(result) {
            var data = JSON.parse(temp);
            res.json(data);
        });

    });
});

module.exports=Router;
