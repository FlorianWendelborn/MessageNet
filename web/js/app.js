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
			controller: 'ChannelController',
			requireLogin: true
		})
		.when( '/settings', {
			templateUrl: 'html/settings.html',
			requireLogin: true,
			controller: 'SettingController'
		})
		.when( '/servers', {
			templateUrl: 'html/servers.html',
			requireLogin: true,
			controller: 'ServerController'
		})
		.when( '/recipes', {
			templateUrl: 'html/recipes.html',
			requireLogin: true,
			controller: 'RecipeController'
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

app.controller('ChannelController', function ($scope, Channels, Channel) {
	Channels.get({},function(channels) {
		$scope.channels = channels;
	});
});

app.controller('ModuleController', function ($scope, Modules, Module) {
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

app.controller('SettingController', function ($scope, Settings, Setting) {
	Settings.get({},function(settings) {
		$scope.originalSettings = settings;
		$scope.settings = settings;
	});
});

app.controller('ServerController', function ($scope, Servers, Server) {
	Servers.get({},function(servers) {
		$scope.servers = servers;
	});
});

app.controller('RecipeController', function ($scope, Recipes, Recipe) {
	Recipes.get({},function(recipes) {
		$scope.recipes = recipes;
		console.log(recipes);
	});
	// var test = new Recipes({test: true, omg: 'wtfbbq'});
	// test.$save();
});