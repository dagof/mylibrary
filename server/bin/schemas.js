// mongoDB
var mongoose = require('mongoose');
// new object
var mongoSchemas = new Object();

/*
	DOCUMENT TYPES
 */
mongoSchemas.document_types = new mongoose.Schema({
	name : { type : String, index : true }, // index
	created_at : {type : Date, default : Date.now },
	updated_at : { type : Date, default : Date.now }
});

/*
	PERSONS
 */
mongoSchemas.persons = new mongoose.Schema({
	last_name : String,
	first_name : String,
	address : {
		civicNumber : Number,
		street : String,
		city : String,
		province : String,
		postalCode : String,
		country : String,
		latitude : Number,
		longitude : Number,
		geoPos : [ Number, Number ], // index: geoPos
		created_at : {type : Date, default : Date.now },
		updated_at : { type : Date, default : Date.now }
	}
});

// person indexes
mongoSchemas.persons.index({
	last_name : 1,
	first_name : 1
});

/*
	PUBLISHERS
 */
mongoSchemas.publishers = new mongoose.Schema({
	name : { type: String, index : true }, // index: name
	address : {
		civicNumber : Number,
		street : String,
		city : String,
		province : String,
		postalCode : String,
		country : String,
		latitude : Number,
		longitude : Number,
		geoPos : [ Number, Number ] // index: geoPos
	},
	url : String,
	created_at : {type : Date, default : Date.now },
	updated_at : { type : Date, default : Date.now }
});

 /*
	LIBRARIES
 */
mongoSchemas.libraries = new mongoose.Schema({
	library_id : String,
	name : { type : String, index : true }, // index: name
	isMaster : Boolean,
	address : {
		civicNumber : Number,
		street : String,
		city : String,
		province : String,
		postalCode : String,
		country : String,
		latitude : Number,
		longitude : Number,
		geoPos : [ Number, Number ], // index: geoPos
		created_at : {type : Date, default : Date.now },
		updated_at : { type : Date, default : Date.now }
	}
});

 /*
	MEMBERS
 */
mongoSchemas.members = new mongoose.Schema({
	person_id : { type : String, index : true }, // index: person
	status : String,
	created_at : {type : Date, default : Date.now },
	updated_at : { type : Date, default : Date.now }
});

 /*
	LOANS
 */
mongoSchemas.loans = new mongoose.Schema({
	document_id : { id : String, copy_id : String }, // index: document
	date_in : Date,
	date_out : Date,
	date_due : Date,
	member_id : String,
	created_at : {type : Date, default : Date.now },
	updated_at : { type : Date, default : Date.now }
});

// loan indexes
mongoSchemas.loans.index({
	document_id : 1,
	member_id : 1
});

 /*
	SUBJECTS
 */
mongoSchemas.subjects = new mongoose.Schema({
	name : { type : String, index : true }, // index: name
	description : String,
	created_at : {type : Date, default : Date.now },
	updated_at : { type : Date, default : Date.now }
});

 /*
	DOCUMENTS
 */
mongoSchemas.documents = new mongoose.Schema({
	lib_code : String,
	doc_type : String,
	authors : [ String ], //index
	publisher : String,
	subject : String, //index
	pages : Number,
	publishing_date : Date,
	publishing_city : String,
	isbn10 : String, // index
	isbn13 : String,
	description : String,
	title : String, // index
	price : Number,
	copies : [
		{
			copy_id : String,
			acquired_date : Date,
			owner_member_id : String,
			available : Boolean,
			price : Number,
			library_id : String
		}
	],
	created_at : {type : Date, default : Date.now },
	updated_at : { type : Date, default : Date.now }
});

// document indexes
mongoSchemas.documents.index({
	subject : 1,
	isbn10 : 1,
	title : 1,
	authors : 1
});

// exports these mongodb schemas
module.exports = mongoSchemas;