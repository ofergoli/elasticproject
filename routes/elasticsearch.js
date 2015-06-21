var elasticsearch = require('elasticsearch'),
	Promise = require('bluebird');

var client = new elasticsearch.Client({
	host: 'localhost:9200'
});

var elasticsearch = {
	addAd : function(documentToAdd,repo){
		return new Promise(function(reject,resolve){
			client.create({
				index: 'adindex',
				type: repo,
				body: documentToAdd
			},function(err,res){
				if(err)
					reject({status:"error"});
				else
					resolve({status:"ok"});
			});
		});
	},
	updateAd : function(repo,documentToUpdate,id){
		return new Promise(function(resolve,reject){
			client.update({
			  index: 'adindex',
			  type: repo,
			  id: id,
			  body: {
			    doc: documentToUpdate
			  }
			}, function (error, response) {
				if(error){
					reject({status:"error"});
				}
				else{
					resolve({status:"ok"});
				}
			})
		});
	},
	deleteAdById : function(id,repo){
		return new Promise(function(resolve,reject){
			client.delete({
				index: 'adindex',
				type: repo,
				id : id
			}, function (error, response) {
				if(error){
					reject({status:"error"});
				}
				else{
					resolve({status:"ok"});
				}
			});
		});
	},
	searchAd : function(params,repo){
		return new Promise(function(resolve,reject){
			client.search({
				index: 'adindex',
				type: repo,
				size : params.n || 10,
				body: {
					query: {
						query_string: {
							query: params.q
						}
					}
				}
			}).then(function (respone) {
				var hits = respone.hits.hits;
				resolve(hits);
			}, function (err) {
				reject({status : err});
			});
		});
	},
	findAllAd : function(repo){
		return new Promise(function(resolve,reject){
			client.search({
				index: 'adindex',
				type: repo,
				size : 1000000,
				body: {
					query: {
						match_all : {}
					}
				}
			}).then(function (respone) {
				var hits = respone.hits.hits;
				resolve(hits);
			}, function (err) {
				reject({status : err});
			});
		});
	}
};

module.exports = elasticsearch;
