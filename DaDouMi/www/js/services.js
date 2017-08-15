angular.module('starter.services', ['ngResource'])


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

