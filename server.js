var express=require('express'),
	path=require('path'),
	router=require('./server_assets/routes.js'),
	app=express(),
	port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/website_assets/"));
app.set('json spaces', 2);
app.use(router);

app.listen(port,function()
{
    console.dir('App listening on port: ' + port);
});