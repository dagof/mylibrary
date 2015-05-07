var express = require('express');
var router = express.Router();

// mongoDB
var mongoose = require('mongoose');

// connection status
console.log('MongoDB connection status: '+ mongoose.connection.readyState);

// Connect to DB
if (mongoose.connection.readyState == 0){
	console.log('Connecting...');

	mongoose.connect('mongodb://localhost/pubLibrary', function(err) {
		if(err) {
			console.log('Connection to MongoDB Server error', err);
		} else {
			console.log('Connection successful to MongoDB Server\n');
		}
	});
};

var schemas = require('../bin/schemas.js');

//New subject model
var documents = mongoose.model('documents', schemas.documents);

// normal root
router.get('/', function(req, res){
	// Start timing now
	console.time('documents.router.get.job.timespan');

	var results = null;

	if (req.query.id != undefined && req.query.id != ' '){
		documents.findById(req.query.id, function(err, docs){
			if(err) res.json(err);
			else res.json(docs);
		});
	}else if (req.query.subject != undefined && req.query.subject != ' '){
		documents.find({ subject : req.query.subject }, function(err, docs){
			if(err) res.json(err);
			else res.json(docs);
		});
	}else{
		// return all documents
		documents.find({}, function(err, docs){
			if(err) res.json(err);
			else res.json(docs);
		});
	}

	// log
	console.log('documents.router.get');
	console.log('query: '+ JSON.stringify(req.query));
	console.log('params: '+ JSON.stringify(req.params));

	// Stop timer.
	console.timeEnd('documents.router.get.job.timespan');
	console.log('\n');
});

// count
router.get('/count', function(req, res){
	// Start timing now
	console.time('documents.router.get.count.job.timespan');

	//get all documents on collection
	documents.aggregate([
		{ 
			$group : {
				_id : '$subject'
				,count : { $sum : 1 }
			}
		}
		,{ 
			$sort : {
				_id : 1 
			} 
		}]
		,function(err, docs){
			if(err) res.json(err);
			else {
				// return results
				res.json(docs);

				// log
				console.log('documents.router.get.count');
				console.log('query: '+ JSON.stringify(req.query));
				console.log('params: '+ JSON.stringify(req.params));

				// Stop timer.
				console.timeEnd('documents.router.get.count.job.timespan');
				console.log('\n');
			}
	});
});

// view all subject's books
router.get('/subject/:subject', function(req, res){
	// Start timing now
	console.time('documents.router.get.subject.job.timespan');

	//get all documents on collection
	documents.find({ subject : req.params.subject }, function(err, docs){
		if(err) res.json(err)
		else {
			//return results
			res.json(docs);

			// log
			console.log('documents.router.get.subject');
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));

			// Stop timer.
			console.timeEnd('documents.router.get.subject.job.timespan');
			console.log('\n');
		}
	});
});

// view one document by its ID
router.get('/view/:id', function(req, res){
	// Start timing now
	console.time('documents.router.get.viewID.job.timespan');

	//get document by id
	documents.findById(req.params.id, function(err, docs){
		if(err) res.json(err);
		else {
			// return results
			res.json(docs);

			// log
			console.log('documents.router.get.viewID');
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));

			// Stop timer.
			console.timeEnd('documents.router.get.viewID.job.timespan');
			console.log('\n');
		}
	});
});


// edit/update document on DB
router.put('/:id', function(req, res, next){
	// Start timing now
	console.time('documents.router.put.id.job.timespan');

	//delete request data item _id
	delete req.body._id;

	//update document on db
	documents.findByIdAndUpdate(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		else{
			//return results
			res.json(post);

			// log
			console.log('documents.router.put.id');
			console.log('id: '+ req.params.id);
			console.log('post: '+ JSON.stringify(post));
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));
			console.log('body: '+ JSON.stringify(req.body));

			// Stop timer.
			console.timeEnd('documents.router.put.id.job.timespan');
			console.log('\n');
		}
	});
});

// new document
router.post('/', function (req, res, next){
	// Start timing now
	console.time("documents.router.post.job.timespan");

	// create new document document into the collection
	documents.create(req.body, function(err, post){
		if(err) return next(err);
		else {
			//return results
			res.json(post);

			// log
			console.log('documents.router.post');
			console.log('id: '+ req.params.id);
			console.log('post: '+ JSON.stringify(post));
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));
			console.log('body: '+ JSON.stringify(req.body));

			// Stop timer.
			console.timeEnd('documents.router.post.job.timespan');
			console.log('\n');
		}
	});
});

// delete this document by its ID
router.delete('/:id', function(req, res, next){
	// Start timing now
	console.time("documents.router.delete.id.job.timespan");

	//remove document
	documents.findByIdAndRemove(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		else {
			//return results
			res.json(post);

			// log
			console.log('documents.router.delete.id');
			console.log('id: '+ req.params.id);
			console.log('post: '+ JSON.stringify(post));
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));
			console.log('body: '+ JSON.stringify(req.body));

			// Stop timer.
			console.timeEnd('documents.router.delete.id.job.timespan');
			console.log('\n');
		}
	});
});

module.exports = router;