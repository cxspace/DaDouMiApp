angular.module('starter.services', ['ngResource'])

.constant("baseURL","http://127.0.0.1:8080/")

.factory('userFactory',['$resource','$http', 'baseURL', function($resource, $http, baseURL) {

  var userFac = {};

  userFac.login = function() {

    $http.get(baseURL+"user",
      {
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}
      ).then(
        function success(response)
        {
          console.log(response);

          console.log("ok");
        }
      );

  };

  userFac.register = function (registerData) {

    var status = true;



    status = false

    return status;

  };

   return userFac;

}]);

