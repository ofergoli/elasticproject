var	formatter = {
	validRepo : function(repo){
		var pattern = /adrepo/g;
		return pattern.test(repo);
	}
};

module.exports = formatter;