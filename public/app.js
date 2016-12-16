(function(window){

	'use strict';

	var appCreation = angular.module('appCreation',['ui.router']);

	console.log('**** Elegant Creation: app.js*****');

	var templateUrl = 'app/partials/';

	var includeObject = {
		header: {
			templateUrl: templateUrl + 'header-partial.html',
			controller: 'HeaderController',
		},
		footer: {
			templateUrl: templateUrl + 'footer-partial.html',
			controller: 'FooterController',
		}
	};
	
	appCreation.config(function($stateProvider, $urlRouterProvider) {

		console.log("inside config ...");
		
		// For any unmatched url, redirect to /home 
		$urlRouterProvider.otherwise("/home");
		 
		// Now set up the states 
		$stateProvider
			.state('home', {
				url: '/home',
				views: {
					header: includeObject.header,
					content: {
						templateUrl: templateUrl + 'content-partial.html',
						controller: 'ContentController',
					},
					footer: includeObject.footer,
				}
				 
			})
	});
	

})(window);
