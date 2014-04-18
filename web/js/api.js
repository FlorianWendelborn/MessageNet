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