var mlb = require('../bin/db');

// param ID
app.param('id', function(req, res, next, id){
	book.findById(id, function(err, docs){
		if(err) res.json(err);
		else{
			req.book_id = docs;
			next;
		}
	});
});

// params in JSON format

// normal root
module.exports.categories.get = function(params){
	router.get('/', function(req, res){
		res.render(route_name, params);
	});
};


// view all categories
module.exports.categories.getAll = function(params){
	router.get('/view', function(req, res){
		book.find({}, function(err, docs){
			if(err) res.json(err);
			else res.render('/view', params);
		});
	});
};




module.exports = router;