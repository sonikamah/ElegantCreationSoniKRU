(function(window){

	'use strict';

	var appCreation = angular.module('appCreation',['ui.router' , 'ngStorage']);

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
			.state('signin', {
				url: '/signin',
				views: {
					header: includeObject.header,
					content: {
						templateUrl: templateUrl + 'signin-partial.html',
						controller: 'SigninController',
					},
					footer: includeObject.footer,
				}
			})
			.state('shopping-cart', {
				url: '/shopping-cart',
				views: {
					header: includeObject.header,
					content: {
						templateUrl: templateUrl + 'shopping-cart-partial.html',
						controller: 'ShoppingCartController',
					},
					footer: includeObject.footer,
				}
			})
			.state('cart-checkout', {
				url: '/cart-checkout',
				views: {
					header: includeObject.header,
					content: {
						templateUrl: templateUrl + 'cart-checkout-partial.html',
						controller: 'CartCheckoutController',
					},
					footer: includeObject.footer,
				}
			})
			.state('products', {
				url: '/products',
				views: {
					header: includeObject.header,
					content: {
						templateUrl: templateUrl + 'products-partial.html',
						controller: 'ProductsController',
					},
					footer: includeObject.footer,
				}
			});
	});
	

})(window);
