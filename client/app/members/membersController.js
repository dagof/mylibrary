'use strict';

/**
 * 
 * @name yoanApp.controller:MembersController
 * @description
 * # MembersController
 * Controller of the yoanApp
 */
angular.module('yoanApp')
	.controller('MembersController', function ($scope, $http, $stateParams){
		// Start timing now
		console.time('MembersController.job.timespan');

		// Stop timer.
		console.timeEnd('MembersController.job.timespan');
	});