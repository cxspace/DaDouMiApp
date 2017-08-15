/**
 * Created by liujie on 2017/7/28.
 */
angular.module('starter.controllers', [])


  .controller('RecommendCtrl', function($scope) {

  })

  .controller('RecommendDetailCtrl', function($scope) {

  })

  .controller('RoundTableCtrl', function($scope) {

  })

  .controller('RoundTableDetailCtrl', function($scope) {

  })

  .controller('RoundTableAddCtrl', function($scope) {

  })

  .controller('FavouriteCtrl', function($scope) {

  })

  .controller('SystemMessageCtrl', function($scope) {

  })

  .controller('LoginCtrl', function($rootScope,$scope,$state,$http,baseURL,userFactory) {

    //登录状态提示
    $scope.loginStatus = "";

    //登录数据
    $rootScope.loginData = {};

    console.log('Doing login',  $rootScope.loginData);

    //登录操作
    $scope.doLogin =function () {

    /**
       登录逻辑
       传入参数
       手机号和密码
    */

    $http(
        {
          method:"POST",
          url:baseURL+"login",
          data:$rootScope.loginData,
          headers :{
            'Content-Type' : 'application/json'
          }
        }
      ).then(
        function success(response) {
          console.log(response.data);

          if (response.data.phone == "error")
          {
            $state.go('tab.login', {}, {reload: true});
            $scope.loginStatus = "账号或密码错误!!!"
          }
          else {
           
            $rootScope.loginData = response.data;
            console.log($rootScope.loginData);
            $rootScope.status = "";

            $state.go('tab.account', {}, {reload: true});

          }

        },
        function error() {

        }

      );

    };

  })


  .controller('RegisterCtrl', function($rootScope,$scope,$state,$http,baseURL,userFactory) {


      $scope.registerData={};
      $scope.status;
      $scope.goNext;

    /**
     *  注册逻辑
     *
     *  参数：
     *
     *  注册数据
     *
     *  注册状态
     *
     *  注册成功标志
     *
     */

    $scope.doRegister = function () {

        //查询当前账号在后台数据库中存在情况
        $http(
          {
            method:"POST",
            url:baseURL+"is_duplicate",
            data:$scope.registerData,
            headers :{
              'Content-Type' : 'application/json'
            }
          }
        ).then(function success(response) {

          console.log(response.data);
          if (response.data.phone == "error"){

            $scope.status = "改手机账号已经注册！";
            $scope.goNext = false;

          }else{

            $scope.goNext = true;
            $scope.status = "";

          }

          //密码不一致
          if ($scope.registerData.password != $scope.registerData.passwordConfirm){
            $scope.status = "两次密码不一致!!!";
            $scope.goNext = false;
          }

          console.log("wait..."+$scope.goNext);
          console.log("out");

          if ($scope.goNext)
          {

            console.log("in");
            $http(
              {
                method:"POST",
                url:baseURL+"register",
                data:$scope.registerData,
                headers :{
                  'Content-Type' : 'application/json'
                }
              }
            ).then(function success(response) {

               $state.go('tab.account', {}, {reload: true});
               $rootScope.status = "注册成功，请登陆";


            },function error() {

            });

          }

        },function error() {

        });

      };


  })



  .controller('UpdateEmailCtrl', function($rootScope,$scope,$state,$http,baseURL,userFactory) {

    $scope.doUpdateEmail = function () {

      $http(

        {
          method:"POST",
          url:baseURL+"update_email",
          data:$rootScope.loginData,
          headers :{
            'Content-Type' : 'application/json'
          }
        }

      ).then(

      function success(response) {

        console.log(response.data);

        $state.go('tab.account', {}, {reload: true});

      },

      function error() {

      }
      );



    };


  })



  .controller('UpdateNameCtrl', function($scope,$state,$http,$rootScope,baseURL,userFactory) {

    $scope.doUpdateName = function () {

    $http(

        {
          method:"POST",
          url:baseURL+"update_name",
          data:$rootScope.loginData,
          headers :{
            'Content-Type' : 'application/json'
          }
        }

      ).then(

      function success(response) {

        console.log(response.data);

        $state.go('tab.account', {}, {reload: true});

      },

      function error() {

      }
      );

    };


  })


  .controller('UpdatePasswordCtrl', function($rootScope,$scope,$state,$http,baseURL,userFactory) {

    $scope.status = "";

    $scope.doUpdatePassword = function () {


      if ($rootScope.loginData.newPassword != $rootScope.loginData.passwordConfirm)
      {
        //两次输入密码不一致
        $scope.status = "两次输入密码不一致";

      }else {

        $rootScope.loginData.password = $rootScope.loginData.newPassword;

        $http(

          {
            method:"POST",
            url:baseURL+"update_password",
            data:$rootScope.loginData,
            headers :{
              'Content-Type' : 'application/json'
            }
          }

        ).then(

          function success(response) {

            console.log(response.data);

            $state.go('tab.login', {}, {reload: true});

          },

          function error() {

          }
        );

      }

    };


  })


  .controller('UpdatePictureCtrl', function($scope,$state,$ionicActionSheet,$http,$rootScope,$cordovaCamera,$cordovaFileTransfer,baseURL) {

    // 添加图片
    $scope.addPhoto = function () {
      $ionicActionSheet.show({
        cancelOnStateChange: true,
        cssClass: 'action_s',
        titleText: "请选择获取图片方式",
        buttons: [
          {text: '相机'},
          {text: '图库'}
        ],
        cancelText: '取消',
        cancel: function () {
          return true;
        },
        buttonClicked: function (index) {

          switch (index) {
            case 0:
              $scope.takePhoto();
              break;
            case 1:
              $scope.pickImage();
              break;
            default:
              break;
          }
          return true;
        }
      });
    };

//拍照
    $scope.takePhoto = function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,//Choose the format of the return value.
        sourceType: Camera.PictureSourceType.CAMERA,//资源类型：CAMERA打开系统照相机；PHOTOLIBRARY打开系统图库
        targetWidth: 150,//头像宽度
        targetHeight: 150//头像高度

      };

      $cordovaCamera.getPicture(options)
        .then(function (imageURI) {
          //Success
          $scope.imageSrc = imageURI;
          // $scope.uploadPhoto();
        }, function (err) {
          // Error
        });
    };
//选择照片
    $scope.pickImage = function () {
      var options = {
        quality: 100,
        destinationType: Camera.DestinationType.FILE_URI,//Choose the format of the return value.
        sourceType: Camera.PictureSourceType.SAVEDPHOTOALBUM,//资源类型：CAMERA打开系统照相机；PHOTOLIBRARY打开系统图库
        targetWidth: 150,//头像宽度
        targetHeight: 150//头像高度
      };

      $cordovaCamera.getPicture(options)
        .then(function (imageURI) {
          //Success
          $scope.imageSrc = imageURI;


          // $scope.uploadPhoto();
        }, function (err) {
          // Error
        });
    };


    $scope.uploadPhoto = function () {
      var requestParams = "?callback=JSON_CALLBACK";

      var server = encodeURI('http://121.42.184.102:3000/upload' + requestParams);
      var fileURL = $scope.imageSrc;
      var options = {
        fileKey: "file",//相当于form表单项的name属性
        fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
        mimeType: "image/jpeg"
      };

      $cordovaFileTransfer.upload(server, fileURL, options)
        .then(function (result) {
          // Success!
          //alert("Code = " + result.responseCode + "Response = " + result.response+ "Sent = " + result.bytesSent);

          //转换为JSON对象
          var dataObj=eval("("+result.response+")");

          $scope.imgHttpUrl = dataObj.img;

          // alert(dataObj.img);

          $rootScope.loginData.imgsrc = "file-"+dataObj.img+".jpg";

          $http(

            {
              method:"POST",
              url:baseURL+"update_imgsrc",
              data:$rootScope.loginData,
              headers :{
                'Content-Type' : 'application/json'
              }
            }

          ).then(

            function success(response) {

              console.log(response.data);

              $state.go('tab.account', {}, {reload: true});

            },

            function error() {

            }
          );


        }, function (err) {
          // Error
          alert("未知错误！");

        }, function (progress) {
          // constant progress updates

        });

    };
  })

  .controller('AccountCtrl', function($rootScope,$scope,$state,baseURL) {

    $rootScope.status = "";

    $scope.doLoginOut = function(){
       console.log("doLoginOut");
       $rootScope.loginData={};
       $state.go('tab.login', {}, {reload: false});

    }

    $scope.settings = {
      enableFriends: true
    };


  });
