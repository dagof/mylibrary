'use strict';

/**
 * 
 * @name yoanApp.controller:SearchController
 * @description
 * # SearchController
 * Controller of the yoanApp
 */
angular.module('yoanApp')
	.controller('SearchController', function ($scope, $http){
		// search box to query Google Books API
		$scope.onTextChange = function (){
			// Start timing now
			console.time('SearchController.onTextChange.job.timespan');

			//count character of text box
			if ($scope.txtSearch.length > 4){
				//log
				console.log( 'Searching for: '+ $scope.txtSearch );
				
				//do search
				var request = 'https://www.googleapis.com/books/v1/volumes?q=' + $scope.txtSearch.replace(' ', '+');
				
				//get query results using $http 
				$http.get(request)
				.success(function (response){
					$scope.booksList = response;
				})
				.error(function (err){
					//error log
					console.log('SearchController.onTextChange.error: '+ new Date().toLocaleTimeString() +' '+ $scope);
					
					// return
					$scope.searchResults = JSON.stringify(err);
				});
			}

			// Stop timer.
			console.timeEnd('SearchController.onTextChange.job.timespan');
		};
	});