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

.constant("baseURL","http://121.42.184.102/da_dou_mi_server/")


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

  //美食推荐详情
    .state('tab.recommend_detail', {
      url: '/recommend_detail',
      views: {
        'tab-recommend': {
          templateUrl: 'templates/tab-recommend-detail.html',
          controller: 'RecommendDetailCtrl'
        }
      }
    })

  //美食地图
    .state('tab.recommend_map', {
      url: '/recommend_map',
      views: {
        'tab-recommend': {
          templateUrl: 'templates/tab-recommend-map.html',
          controller: 'RecommendDetailCtrl'
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
  //圆桌里面的信息详细
    .state('tab.round_table_detail', {
      url: '/round_table_detail',
      views: {
        'tab-round-table': {
          templateUrl: 'templates/tab-round-table-detail.html',
          controller: 'RoundTableDetailCtrl'
        }
      }
    })

  //发布美食推荐
    .state('tab.round_table_add', {
      url: '/round_table_add',
      views: {
        'tab-round-table': {
          templateUrl: 'templates/tab-round-table-add.html',
          controller: 'RoundTableAddCtrl'
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

  //注册页面
    .state('tab.register', {
      url: '/register',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-register.html',
          controller: 'RegisterCtrl'
        }
      }
    })

  //修改邮箱页面
    .state('tab.update_mail', {
      url: '/update_mail',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-update-email.html',
          controller: 'UpdateEmailCtrl'
        }
      }
    })

  //修改微信号页面
    .state('tab.update_name', {
      url: '/update_name',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-update-name.html',
          controller: 'UpdateNameCtrl'
        }
      }
    })

  //修改密码
    .state('tab.update_password', {
      url: '/update_password',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-update-password.html',
          controller: 'UpdatePasswordCtrl'
        }
      }
    })

  //更换头像
    .state('tab.update_picture', {
      url: '/update_picture',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-update-picture.html',
          controller: 'UpdatePictureCtrl'
        }
      }
    })

  //用户最爱

    .state('tab.favourite', {
      url: '/favourite',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/user-favourite.html',
          controller: 'FavouriteCtrl'
        }
      }
    })

  //系统消息
    .state('tab.system_message', {
      url: '/system_message',
      views: {

        //这里的'tab-account是父页面'
        'tab-account': {
          templateUrl: 'templates/system_message.html',
          controller: 'SystemMessageCtrl'
        }
      }
    })






  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/recommend');

});
