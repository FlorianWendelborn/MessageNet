var server = 'http://127.0.0.1:8090';

var messageNetAPI = angular.module('messageNetAPI', ['ngResource']);
messageNetAPI.factory('Modules', ['$resource', function($resource) {
	return $resource('/api/modules', null, {});
}]);
messageNetAPI.factory('Module', ['$resource', function($resource) {
	return $resource('/api/module/:id', null, {});
}]);