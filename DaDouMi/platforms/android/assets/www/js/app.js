// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $cordovaSplashscreen, $timeout) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    $timeout(function(){
      $cordovaSplashscreen.hide();
    },2000);



  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider,$httpProvider) {


  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {'Content-Type':'application/json'};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  //真机调试不兼容的一些问题解决

  $ionicConfigProvider.platform.android.tabs.style('standard');
  $ionicConfigProvider.platform.android.tabs.position('bottom');
  $ionicConfigProvider.platform.android.navBar.alignTitle('center');
  $ionicConfigProvider.platform.android.backButton.previousTitleText('').icon('ion-android-arrow-back');
  $ionicConfigProvider.platform.android.views.transition('android');


  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  //基本tabs栏
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })



  //美食推荐页面
  .state('tab.recommend', {
    url: '/recommend',
    views: {
      'tab-recommend': {
        templateUrl: 'templates/tab-recommend.html',
        controller: 'RecommendCtrl'
      }
    }
  })

  //圆桌页面
  .state('tab.round_table', {
      url: '/round_table',
      views: {
        'tab-round-table': {
          templateUrl: 'templates/tab-round-table.html',
          controller: 'RoundTableCtrl'
        }
      }
    })

    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  //个人账户页面
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  //登录页面
    .state('tab.login', {
      url: '/login',
      views: {

      //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-login.html',
          controller: 'LoginCtrl'
        }
      }
    })




  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/recommend');

});
