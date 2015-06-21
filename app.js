var express = require('express'),
	logger = require('morgan'),
	bodyParser = require('body-parser'),
	RequestHandler = require('./routes/elasticRequestHandler'),
	formatter = require('./routes/formatter');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(logger('dev'));

app.post('/*/:param',function(req,res,next){
	var repo = req.params['param'];
	if(formatter.validRepo(repo)){
		console.log("middleware continue");
		next();
	}
	else{
		res.jsonp({status : "invalid request"});
	}
});
app.get('/*/:param',function(req,res,next){
	var repo = req.params['param'];
	if(formatter.validRepo(repo)){
		console.log("middleware continue");
		next();
	}
	else{
		res.jsonp({status : "invalid request"});
	}
});
app.post('/addAd/:repo',RequestHandler.addAd);
app.post('/updateAd/:repo',RequestHandler.updateAd);
app.post('/deleteAdById/:repo',RequestHandler.deleteAdById);
app.get('/searchAd/:repo',RequestHandler.searchAd);
app.get('/findAllAd/:repo',RequestHandler.findAllAd);

app.listen(3000,function(){
	console.log("Elastic Search Server Online ...");
});