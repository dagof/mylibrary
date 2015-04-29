var express = require('express');
var router = express.Router();

// mongoDB
var mongoose = require('mongoose');

// connection status
console.log('MongoDB connection status: '+ mongoose.connection.readyState);

//Connect to DB
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
var subjects = mongoose.model('subjects', schemas.subjects);

// normal root
router.get('/', function(req, res){
	// log
	var startingTime = new Date().toLocaleTimeString();

	// Start timing now
	console.time('subjects.router.get.job.timespan');

	//get all subjects on collection
	subjects.find({},function(err, docs){
		if(err) res.json(err);
		else {
			// return results
			res.json(docs);

			// log
			console.log('subjects.router.get');
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));

			var endingTime = new Date().toLocaleTimeString();

			// Times
			console.log('subjects.router.get.job.startingTime: '+ startingTime);
			console.log('subjects.router.get.job.endingTime: '+ endingTime);

			// Stop timer.
			console.timeEnd('subjects.router.get.job.timespan');
			console.log('\n');
		}
	});
});

// view one subject by its ID
router.get('/:id', function(req, res){
	// log
	var startingTime = new Date().toLocaleTimeString();

	// Start timing now
	console.time('subjects.router.get.id.job.timespan');

	//get document by id
	subjects.findById(req.params.id, function(err, docs){
		if(err) res.json(err);
		else {
			//return results
			res.json(docs);

			// log
			console.log('subjects.router.get.id');
			console.log('id: '+ req.params.id);

			var endingTime = new Date().toLocaleTimeString();

			// Times
			console.log('subjects.router.get.id.job.startingTime: '+ startingTime);
			console.log('subjects.router.get.id.job.endingTime: '+ endingTime);

			// Stop timer.
			console.timeEnd('subjects.router.get.id.job.timespan');
			console.log('\n');
		}
	});
});

// edit/update subject on DB
router.put('/:id', function(req, res, next){
	// log
	var startingTime = new Date().toLocaleTimeString();

	// Start timing now
	console.time('subjects.router.put.id.job.timespan');
	
	var sbj = new subjects({
		name : req.body.name,
		description : req.body.description,
		updated_at : Date.now
	});

	var upserData = sbj.toObject();

	// delete request data item _id and created_at
	delete upserData._id;
	delete upserData.created_at;

	console.log('upserData: '+ JSON.stringify(upserData));

	//update document on db
	subjects.findByIdAndUpdate(req.params.id, upserData, {upsert: true}, function(err, post){
		if(err) return next(err);
		else {
			//return results
			res.json(post);

			// log
			console.log('subjects.router.put.id');
			console.log('id: '+ req.params.id);
			console.log('post: '+ JSON.stringify(post));
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));
			console.log('body: '+ JSON.stringify(req.body));

			var endingTime = new Date().toLocaleTimeString();

			// Times
			console.log('subjects.router.put.id.job.startingTime: '+ startingTime);
			console.log('subjects.router.put.id.job.endingTime: '+ endingTime);

			// Stop timer.
			console.timeEnd('subjects.router.put.id.job.timespan');
			console.log('\n');
		}
	});
});

// new subject
router.post('/', function (req, res, next){
	// log
	var startingTime = new Date().toLocaleTimeString();
	
	// Start timing now
	console.time("subjects.router.post.job.timespan");
	
	// create new subject document into the collection
	subjects.create(req.body, function(err, post){
		if(err) return next(err);
		else {
			//return results
			res.json(post);

			// log
			console.log('subjects.router.post');
			console.log('id: '+ req.params.id);
			console.log('post: '+ JSON.stringify(post));
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));
			console.log('body: '+ JSON.stringify(req.body));

			var endingTime = new Date().toLocaleTimeString();

			// Times
			console.log('subjects.router.post.job.startingTime: '+ startingTime);
			console.log('subjects.router.post.job.endingTime: '+ endingTime);

			// Stop timer.
			console.timeEnd('subjects.router.post.job.timespan');
			console.log('\n');
		}
	});
});

// delete this document by its ID
router.delete('/:id', function(req, res, next){
	// log
	var startingTime = new Date().toLocaleTimeString();

	// Start timing now
	console.time("subjects.router.delete.id.job.timespan");

	//remove document
	subjects.findByIdAndRemove(req.params.id, req.body, function(err, post){
		if(err) return next(err);
		else {
			//return results
			res.json(post);

			// log
			console.log('subjects.router.delete.id');
			console.log('id: '+ req.params.id);
			console.log('post: '+ JSON.stringify(post));
			console.log('query: '+ JSON.stringify(req.query));
			console.log('params: '+ JSON.stringify(req.params));
			console.log('body: '+ JSON.stringify(req.body));

			var endingTime = new Date().toLocaleTimeString();

			// Times
			console.log('subjects.router.delete.id.job.startingTime: '+ startingTime);
			console.log('subjects.router.delete.id.job.endingTime: '+ endingTime);

			// Stop timer.
			console.timeEnd('subjects.router.delete.id.job.timespan');
			console.log('\n');
		}
	});
});

module.exports = router;