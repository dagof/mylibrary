'use strict';

/**
 * 
 * @name myLibraryApp.controller:BookInfoController
 * @description
 * # BookInfoController
 * Controller of the myLibraryApp
 */
angular.module('myLibraryApp')
	.controller('BookInfoController', function ($scope, $http, $state, $stateParams, Subjects, Documents){

		// Start timing now
		console.time('BookInfoController.Subjects.query.job.timespan');

		// GET all subjects in a JSON array
		$scope.subjectsList = Subjects.query();

		// Stop timer.
		console.timeEnd('BookInfoController.Subjects.query.job.timespan');

		if ($stateParams.id != undefined) {
			// Start timing now
			console.time('BookInfoController.http.get.job.timespan');

			// Google Request URL
			var request = 'https://www.googleapis.com/books/v1/volumes/' + $stateParams.id;

			//get query results using $http 
			$http.get(request)
			.success(function (response){
				$scope.bookInfo = response;
			})
			.error(function (err){
				//error log
				console.log('BookInfoController.get.error: '+ new Date().toLocaleTimeString() +' '+ JSON.stringify($stateParams));
				// return
				$scope.bookInfo = JSON.stringify(err);
			});

			// Stop timer.
			console.timeEnd('BookInfoController.http.get.job.timespan');

			/**
			* create new document.
			*
			* @method newDocument
			* @param {String} foo Argument 1
			* @return void
			*/
			$scope.newDocument = function(){
				// Start timing now
				console.time('BookInfoController.newDocument.job.timespan');

				var bookData = $scope.bookInfo;
				
				// Because Google doesn't deliver all data, 
				// validations have to be applied.
				var di = {
					lib_code : ''
					,doc_type : 'book'
					,authors : bookData.volumeInfo.authors
					,publisher : bookData.volumeInfo.publisher.trim()
					,pages : bookData.volumeInfo.pageCount
					,publishing_date : bookData.volumeInfo.publishedDate
					,publishing_city : ''
					,isbn10 : bookData.volumeInfo.industryIdentifiers == undefined ? bookData.volumeInfo.industryIdentifiers[0].identifier : 0
					,isbn13 : bookData.volumeInfo.industryIdentifiers == undefined ? bookData.volumeInfo.industryIdentifiers[1].identifier : 0
					,description : bookData.volumeInfo.description
					,title : bookData.volumeInfo.title.trim()
					,subject : $scope.subject.name
				}

				var newDoc = new Documents.save(di);

				// transfer to selected subject's books list passing the name as parameter
				$state.go('documents.subject', { 'subject' : $scope.subject.name }, {reload: true, location: false});
			
				// Stop timer.
				console.timeEnd('BookInfoController.newDocument.job.timespan');
			}
		}
	})
	.controller('DocumentListController', function ($scope, $state, $stateParams, Documents){
		// Start timing now
		console.time('DocumentListController.job.timespan');

		$scope.subjectTitle = $stateParams.subject;

		// GET all subjects in a JSON array
		$scope.documentsList = Documents.query({}, { subject : $stateParams.subject });

		// if DELETE request is called
		$scope.deleteDocument = function(doc) {
			// Start timing now
			console.time('BookInfoController.deleteDocument.job.timespan');

			//console.log(subject);
			doc.$delete( function() {
				//refresh subjects list page
				$state.go($state.current, {}, {reload: true});
			});

			// Stop timer.
			console.timeEnd('BookInfoController.deleteDocument.job.timespan');
		}

		// Stop timer.
		console.timeEnd('DocumentListController.job.timespan');
	});