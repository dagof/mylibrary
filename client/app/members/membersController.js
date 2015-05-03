'use strict';

/**
 * 
 * @name myLibraryApp.controller:MembersController
 * @description
 * # MembersController
 * Controller of the myLibraryApp
 */
angular.module('myLibraryApp')
	.controller('MembersController', function ($scope, $http, $stateParams){
		// Start timing now
		console.time('MembersController.job.timespan');

		// Stop timer.
		console.timeEnd('MembersController.job.timespan');
	});