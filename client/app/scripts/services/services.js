'use strict';

/**
 * 
 * @name yoanApp.services
 * @description
 * # yoanApp.services
 *
 * Main service module of the application.
 */
angular.module('yoanApp.services', [])
	.factory('Subjects', function( $resource ) {
		return $resource('http://localhost:3000/subjects/:id', { id : '@_id' }, {
			'update' : { method : 'PUT' }
		});
	})
	.factory('Documents', function( $resource ) {
		return $resource('http://localhost:3000/documents/:id', { id : '@_id' }, {
			'query' : { method : 'GET', params : { subject : '@subject' }, isArray : true },
			'update' : { method : 'PUT' }
		});
	})
	.factory('DocumentsCount', function( $resource ) {
		return $resource('http://localhost:3000/documents/count', { id : '@_id' }, {});
	});