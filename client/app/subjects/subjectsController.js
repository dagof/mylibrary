'use strict';

/**
 * 
 * @name myLibraryApp.controller:SubjectsController
 * @description
 * # SubjectsController
 * Controller of the myLibraryApp
 */
angular.module('myLibraryApp')
	.controller('SubjectsListController', function ($scope, $state, Subjects, DocumentsCount) {
		// Start timing now
		console.time('SubjectsListController.Subjects.query.job.timespan');

		// GET all subjects in a JSON array
		$scope.subjectsList = Subjects.query();

		// Stop timer.
		console.timeEnd('SubjectsListController.Subjects.query.job.timespan');
		
		// Start timing now
		console.time('SubjectsListController.DocumentsCount.query.job.timespan');

		// documents count by subject
		$scope.subjectsCountList = DocumentsCount.query();

		// Stop timer.
		console.timeEnd('SubjectsListController.DocumentsCount.query.job.timespan');

		// if DELETE request is called
		$scope.deleteSubject = function(subject) {
			// Start timing now
			console.time('SubjectsListController.deleteSubject.job.timespan');

			subject.$delete( function() {
				//refresh subjects list page
				$state.go($state.current, {}, {reload: true});
			});

			// Stop timer.
			console.timeEnd('SubjectsListController.deleteSubject.job.timespan');
		}

		// if UPDATE request is called then updates the UI
		$scope.updateSubject = function(subject) {
			// Start timing now
			console.time('SubjectsListController.updateSubject.job.timespan');

			// update document on MongoDB
			delete subject.__v;
			delete subject.created_at;

			subject.$update()
				.then(function () {
					// refresh the page
					$state.go($state.current, {}, { reload: true });
				});

			// Stop timer.
			console.timeEnd('SubjectsListController.updateSubject.job.timespan');
		};
	})
	.controller('SubjectsCreateController', function ($scope, $state, Subjects) {
		// create new subject
		$scope.newSubject = function() {
			// Start timing now
			console.time('SubjectsCreateController.job.timespan');

			// initialize $resource with form values
			$scope.sbj = new Subjects($scope.subject);

			console.log(Subjects);

			//log
			console.log($scope.subject);
			console.log($scope.sbj);

			$scope.sbj.$save()
				.then(function (){
					// refresh the page
					$state.go($state.current, {}, { reload: true });
				});

			// Stop timer.
			console.timeEnd('SubjectsCreateController.job.timespan');
		}
	});