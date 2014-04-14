var app = angular.module('app', ['ngRoute', 'messageNetAPI']).config(function ($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'html/home.html',
			controller: 'HomeController',
		})
		.when( '/modules', {
			templateUrl: 'html/modules.html',
			controller: 'ModuleController',
			requireLogin: true
		})
		.when( '/channels', {
			templateUrl: 'html/channels.html',
			requireLogin: true
		})
		.when( '/settings', {
			templateUrl: 'html/settings.html',
			requireLogin: true
		})
		.when( '/recipes', {
			templateUrl: 'html/recipes.html',
			requireLogin: true
		})
		.when('/login', {
			templateUrl: 'html/login.html',
			controller: 'LoginController'
		})
		.when('/about', {
			templateUrl: 'html/about.html'
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.run(function($rootScope, $location) {
	// redirect when not logged in
	// inspired by st.never (http://stackoverflow.com/questions/11541695/angular-js-redirecting-to-a-certain-route-based-on-condition)
	$rootScope.loggedIn = true;
	$rootScope.$on( "$routeChangeStart", function(event, next, current) {
		$rootScope.currentPath = next.$$route.originalPath;
		if (!$rootScope.loggedIn && next.$$route.requireLogin) {
			$location.path("/login");
		}
	});
});

/*--------------------------------------------------[controllers]--------------------------------------------------*/
app.controller('HomeController', function ($scope) {
	$scope.stuff = [{
		name: 'cpu',
		value: ~~(Math.random()*1000)/10
	},{
		name: 'ram',
		value: ~~(Math.random()*1000)/10
	}];
});

app.controller('ModuleController', function ($scope, Modules, Module) {
	$scope.modules = [{
		"name": "RSS",
		"description": "Read or write data to RSS feeds.",
		"version": "0.0.1",
		"author": "dodekeract",
		"icon": "./png/rss.png",
		"events": [
			{
				"id":"feedItem",
				"name": "New Item in Feed",
				"description": "Will trigger everytime a new item is getting loaded.",
				"options": {
					"stuff": true
				},
				"data": {
					"title": "text",
					"text": "text"
				}
			},
			{
				"id":"someOtherEvent",
				"name": "SomeOtherEvent",
				"description": "Triggers randomly.",
				"options": {
					"stuff": true
				},
				"data": {
					"title": "text"
				}
			}
		],
		"actions": [
			{
				"id":"addToFeed",
				"name": "Adds Items to Feeds",
				"description": "Will create an RSS feed and push all information gotten.",
				"options": {
					"stuff": true
				}
			}
		],
		"options": [
			{
				"id":"url",
				"name": "URL",
				"description": "Set the URL the RSS feed should pull from.",
				"stuff": false
			},
			{"id":"someSetting",
				"name": "Some setting.",
				"description": "Specify the rate of random stuff per minute.",
				"stuff": false
			}
		]
	},{
		"name": "realName",
		"description": "This is not an exampleDescription.",
		"version": "1.7.8",
		"author": "dodekeract",
		"icon": "default is moduleFolder/icon.png",
		"events": {
			"see": "##events",
			"for": "more",
			"information": "!"
		},
		"action": {
			"see": "##actions",
			"for": "more",
			"information": "!"
		},
		"options": {
			"see": "##options",
			"for": "more",
			"information": "!"
		}
	}];
	//$scope.modules = MessageNetAPI.getBuffer("modules");
	Modules.get({},function(modules) {
		$scope.modules = modules;
	});
});

app.controller('LoginController', function ($scope, $rootScope) {
	$scope.username = "test";
	$scope.password = "1234";
	$scope.login = function () {
		//api.login($scope.username, $scope.password, function (err, data) {
		if (true) {
			$rootScope.loggedIn = true;
			$scope.username = false;
			$scope.password = false;
			window.location.href = "#/";
		} else {
			console.log("#todo - login failed");
		}
		//});
	}
});