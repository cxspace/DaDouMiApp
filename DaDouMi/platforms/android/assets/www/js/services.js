angular.module('starter.services', ['ngResource'])

.constant("baseURL","http://127.0.0.1:8080/")

.factory('userFactory',['$resource','$http', 'baseURL', function($resource, $http, baseURL) {

  var userFac = {};

  userFac.login = function(loginData) {

    console.log('loginData:', loginData);

    // $http.post(baseURL+"user",loginData).success(function (response) {
    //   console.log('success:', response);
    // }).error(function (response) {
    //   console.log('fail:', response);
    // });

    $http.post(baseURL+"user", loginData,
      {headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}}
      ).then(
        function success(response)
      { console.log(response);
        console.log("ok");
      }

      );

  };

   return userFac;

}])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
