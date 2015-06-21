var elasticsearch = require('./elasticsearch'),
	formatter = require('./formatter');

var RequestHandler = {
	addAd : function(req,res){
		var documentToAdd = req.body;
		var repo = req.params.repo;
		elasticsearch.addAd(documentToAdd,repo)
		.then(function(response){
			res.jsonp(response)
		}).catch(function(err){
			res.jsonp(err);
		});
	},
	updateAd : function(req,res){
		var repo = req.params.repo;
		var dataToUpdate = req.body;
		var id = dataToUpdate[repo.substring(0,repo.length-1)+"_id"];
		elasticsearch.updateAd(repo,dataToUpdate,id)
		.then(function(response){
			res.jsonp(response);
		}).catch(function(err){
			res.jsonp(err);
		});
	},
	deleteAdById : function(req,res){
		var repo = req.params.repo;
		elasticsearch.deleteAdById(req.body.id,repo)
		.then(function(response){
			res.jsonp(response);
		}).catch(function(err){
			res.jsonp(err);
		});
	},
	searchAd : function(req,res){
		var repo = req.params.repo;
		var params = {
			q : req.query['q'],
			n : req.query['n']
		};
		elasticsearch.searchAd(params,repo)
		.then(function(hits){
			res.jsonp(hits);
		}).catch(function(err){
			res.jsonp(err);
		});
	},
	findAllAd : function(req,res){
		var repo = req.params.repo;
		elasticsearch.findAllAd(repo)
		.then(function(hits){
			res.jsonp(hits);
		}).catch(function(err){
			res.jsonp(err);
		});
	}
}

module.exports = RequestHandler;