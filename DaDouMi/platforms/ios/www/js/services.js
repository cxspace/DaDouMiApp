angular.module('starter.services', ['ngResource'])


.factory('userFactory',['$resource','$http', 'baseURL', function($resource, $http, baseURL) {

  var userFac = {};

  return userFac;

}])


;

