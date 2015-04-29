'use strict';

/**
 * 
 * @name yoanApp
 * @description
 * # yoanApp
 *
 * Main module of the application.
 */
angular.module('yoanApp')
	.config(function ($stateProvider, $urlRouterProvider){
		$stateProvider
			/*
			 * HOME
			 */
			.state('home', {
				url: '/',
				views: {
					// jumbotron info
					'viewMain': { 
						templateUrl: 'views/main.html' 
					},
					// search bar
					'viewSearch': { 
						templateUrl: 'views/search.html', 
						controller: 'SearchController' 
					},
					// subjects navigation bar
					'viewSubjectsNavBar': { 
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			})
			/*
			 * DOCUMENTS
			 */
			.state('documents', {
				url: '/documents',
				templateUrl: '/documents/document.html'
			})
			// creates the URL of each book on the search results list with ui-sref
			.state('documents.detail', {
				url:'/view/:id',
				views:{
					'' : {
						templateUrl: '/documents/document.detail.html',
						controller: 'BookInfoController'
					},
					'viewSubjectsNavBar' : {
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			})
			.state('documents.subject', {
				url: '/subjects/:subject',
				views : {
					'' : {
						templateUrl: '/documents/document.list.html',
						controller: 'DocumentListController'
					},
					'viewSubjectsNavBar' : {
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			})
			/*
			 * SUBJECTS
			 */
			.state('subjects', {
				url: '/subjects',
				templateUrl: '/subjects/subjects.list.html',
				controller: 'SubjectsListController'
			})
			/*
			 * MEMBERS
			 */
			.state('members', {
				url: '/members',
				views: {
					'' : {
						templateUrl: '/members/members.list.html',
						controller: 'MembersController'
					},
					'viewSubjectsNavBar' : {
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			})
			/*
			 * ABOUT
			 */
			.state('about', {
				url: '/about',
				views: {
					'' : {
						templateUrl: 'views/about.html'
					},
					'viewSubjectsNavBar' : {
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			})
			/*
			 * TERMS AND CONDITIONS
			 */
			.state('terms', {
				url: '/terms',
				views: {
					'' : {
						templateUrl: 'views/terms.html'
					},
					'viewSubjectsNavBar' : {
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			})
			/*
			 * STATISTICS
			 */
			.state('statistics', {
				url: '/statistics',
				views: {
					'' : {
						templateUrl: 'views/statistics.html'
					},
					'viewSubjectsNavBar' : {
						templateUrl: '/subjects/subjects.NavBar.html',
						controller: 'SubjectsListController'
					}
				}
			});

		// For any unmatched url, redirect to /
		$urlRouterProvider.otherwise('/');
	});