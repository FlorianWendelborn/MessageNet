var messageNetAPI = angular.module('messageNetAPI', ['ngResource']);
messageNetAPI.factory('Modules', ['$resource', function ($resource) {
	return $resource('/api/modules', null, {
		get: {method: 'GET', isArray: true}
	});
}]);
messageNetAPI.factory('Module', ['$resource', function ($resource) {
	return $resource('/api/module/:id', null, {});
}]);
messageNetAPI.factory('Channels', ['$resource', function ($resource) {
	return $resource('/api/channels', null, {
		get: {method: 'GET', isArray: true}
	});
}]);
messageNetAPI.factory('Channel', ['$resource', function ($resource) {
	return $resource('/api/channel/:id', null, {});
}]);
messageNetAPI.factory('Settings', ['$resource', function ($resource) {
	return $resource('/api/settings', null, {
		get: {method: 'GET', isArray: true}
	});
}]);
messageNetAPI.factory('Setting', ['$resource', function ($resource) {
	return $resource('/api/setting/:id', null, {});
}]);
messageNetAPI.factory('Servers', ['$resource', function ($resource) {
	return $resource('/api/servers', null, {
		get: {method: 'GET', isArray: true}
	});
}]);
messageNetAPI.factory('Server', ['$resource', function ($resource) {
	return $resource('/api/server/:id', null, {});
}]);
messageNetAPI.factory('Recipes', ['$resource', function ($resource) {
	return $resource('/api/recipes', null, {
		get: {method: 'GET', isArray: true}
	});
}]);
messageNetAPI.factory('Recipe', ['$resource', function ($resource) {
	return $resource('/api/recipe/:id', null, {});
}]);