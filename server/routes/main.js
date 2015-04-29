var mapper = function(){
	emit(this.subject, 1);
};

var reducer = function(subject, count){
	return Array.sum(count);
};

db.documents.mapReduce(
	mapper
	,reducer
	,{
		out : 'subjectsCount'
	});
