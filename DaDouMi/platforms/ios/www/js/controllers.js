/**
 * Created by liujie on 2017/7/28.
 */
angular.module('starter.controllers', [])


/**

    美食故事页面

    主要业务逻辑

     - 获取所有的storys


*/
  .controller('RecommendCtrl', function($scope,$http,$ionicPopup,baseURL) {

     $scope.baseURL = baseURL;

     $http({
          method:'GET',
          url:baseURL+'storys'
     }).then(

          function success(response){

                $scope.storys = response.data;
          },

          function error(response){

          });

     $scope.doRefresh = function() {

     $http({
          method:'GET',
          url:baseURL+'storys'
     }).then(

          function success(response){

                $scope.storys = response.data;

                $scope.$broadcast('scroll.refreshComplete');

          },

          function error(response){

              var confirmPopup = $ionicPopup.confirm({
                  title: '温馨提升',
                  template: '网路错误，请连接网络 ^] [^'
              });

              confirmPopup.then(function (res) {
                  if (res) {
                      console.log('Ok to delete');
                  } else {
                      console.log('Canceled delete');
                  }
              });

          });


        }


  })


/**

     美食故事详细页面

     主要业务逻辑：

      - 根据id获取制定的story



*/

  .controller('RecommendDetailCtrl', function($scope,$http,$stateParams,$ionicPopup,$sce,baseURL) {



     $http({
          method:'GET',
          url:baseURL+'storys/'+$stateParams.id
     }).then(

          function success(response){

                $scope.story = response.data;
                $scope.story.content =  $sce.trustAsHtml($scope.story.content);
          },

          function error(response){

              var confirmPopup = $ionicPopup.confirm({
                  title: '温馨提升',
                  template: '网路错误，请连接网络 ^] [^'
              });

              confirmPopup.then(function (res) {
                  if (res) {
                      console.log('Ok to delete');
                  } else {
                      console.log('Canceled delete');
                  }
              });


          });


  })


  /*
  *
  *    圆桌页面
  *
  *    主要的业务逻辑
  *
  *     - 加载所有的美食分析信息
  *
  *     - 发布美食信息
  *
  *     - 检索信息
  *
  *
  * */

  .controller('RoundTableCtrl', function($scope,$rootScope,$http,baseURL,UploadImgURL,$ionicLoading,$ionicPopup,$timeout) {


     $scope.search = {};

     $scope.UploadImgURL = UploadImgURL;

     $ionicLoading.show({
        template: '<ion-spinner></ion-spinner> Loading...'
     });


     /*

            描述:http请求获取美食信息

      */


     $http({
                method:'GET',
                url:baseURL+'round_table'
           }).then(

          function success(response){

                $scope.shares = response.data;
                $timeout(function () {
                $ionicLoading.hide();
                  }, 1000);
          },

          function error(response){

            var confirmPopup = $ionicPopup.confirm({
                  title: '温馨提升',
                  template: '网路错误，请连接网络 ^] [^'
              });

              confirmPopup.then(function (res) {
                  if (res) {
                      console.log('Ok to delete');
                  } else {
                      console.log('Canceled delete');
                  }
              });

                $timeout(function () {
                $ionicLoading.hide();
                  }, 1000);
          });


    /**
     *
     *   信息检索业务逻辑
     *
     */

    $scope.doSearch = function () {

      console.log('Do Search With KeyWord : '+ $scope.search.keyword);


      //获取特定信息

      $http(


        {
          method:"POST",
          url:baseURL+"share_search",
          data:$scope.search,
          headers :{
            'Content-Type' : 'application/json'
          }

        }

      ).then(

        function success(response){

          console.log(response.data);

          $scope.shares = response.data;

        },

        function error(response){

          var confirmPopup = $ionicPopup.confirm({
            title: '温馨提升',
            template: '网路错误，请连接网络 ^] [^'
          });

          confirmPopup.then(function (res) {
            if (res) {
              console.log('Ok to delete');
            } else {
              console.log('Canceled delete');
            }
          });

        }

      );




    };


    /**
     *
     * 下拉刷新
     *
     */


      $scope.doRefresh = function() {

       $http({
                method:'GET',
                url:baseURL+'round_table'
           }).then(

          function success(response){

                $scope.shares = response.data;

                $scope.$broadcast('scroll.refreshComplete');
          },

          function error(response){


              var confirmPopup = $ionicPopup.confirm({
                  title: '温馨提升',
                  template: '网路错误，请连接网络 ^] [^'
              });

              confirmPopup.then(function (res) {
                  if (res) {
                      console.log('Ok to delete');
                  } else {
                      console.log('Canceled delete');
                  }
              });


               $timeout(function () {
                $ionicLoading.hide();
                  }, 1000);
          });

         };

      $rootScope.doRefresh = function() {

       $http({
                method:'GET',
                url:baseURL+'round_table'
           }).then(

          function success(response){

                $scope.shares = response.data;

                $scope.$broadcast('scroll.refreshComplete');
          },

          function error(response){
               $timeout(function () {
                $ionicLoading.hide();
                  }, 1000);
          });

         };

  })


  /**
   *
   *    圆桌详细页面
   *
   *    主要业务逻辑
   *
   *    - 获取分享详细信息
   *
   *    - 获取评论数据
   *
   *    - 添加评论数据
   *
   */


  .controller('RoundTableDetailCtrl', function($scope,$http,$stateParams,$ionicPopup,$rootScope,baseURL,UploadImgURL) {


     $scope.UploadImgURL = UploadImgURL;

     $scope.commentData = {};  //用户添加的评论信息
     $scope.share = {};        //分享的详细信息
     $scope.commentDatas = {};  //对应改分享详细的评论数据


     $http({
          method:'GET',
          url:baseURL+'shares/'+$stateParams.id
          }).then(

          function success(response){

                console.log(response.data);

                $scope.share = response.data;

                //拿到发布评论的人的分享信息
                $scope.commentData.share_id = $scope.share.id;

                //获取评论信息

                $http(


                  {
                      method:"POST",
                      url:baseURL+"comment_select",
                      data:$scope.commentData,
                        headers :{
                        'Content-Type' : 'application/json'
                      }

                  }

                ).then(

                      function success(response){

                        console.log(response.data);

                        $scope.commentDatas = response.data;

                      },

                      function error(response){

                       var confirmPopup = $ionicPopup.confirm({
                            title: '温馨提升',
                            template: '网路错误，请连接网络 ^] [^'
                        });

                        confirmPopup.then(function (res) {
                            if (res) {
                                console.log('Ok to delete');
                            } else {
                                console.log('Canceled delete');
                            }
                        });


                      }

                );



          },

          function error(response){

          });


     //添加评论信息

     $scope.doAddComment = function(){

          //添加到对应分享映射
          $scope.commentData.share_id = $scope.share.id;

          //添加对应的用户的映射
          $scope.commentData.user_id = $rootScope.loginData.id;

          console.log($scope.commentData.content);

          //添加请求
          $http(

            {
              method:"POST",
              url:baseURL+"comment_insert",
              data:$scope.commentData,
              headers :{
                'Content-Type' : 'application/json'
              }
            }

          ).then(

            function success(response) {


              $http(

                  {
                      method:"POST",
                      url:baseURL+"comment_select",
                      data:$scope.commentData,
                        headers :{
                        'Content-Type' : 'application/json'
                      }

                  }

                ).then(

                      function success(response){


                        $scope.commentDatas = response.data;

                      },

                      function error(response){

                      }

                );

              $scope.commentData.content = "";


            },

            function error() {

            }
          );



     }


     //点赞业务逻辑

     $scope.inc_support = function(){

        console.log("inc_support()");

        $http(

                  {
                      method:"POST",
                      url:baseURL+"inc_support",
                      data:$scope.share,
                        headers :{
                        'Content-Type' : 'application/json'
                      }

                  }

                ).then(

                      function success(response){

                        $scope.share.support ++;
                      },

                      function error(response){

                      }

                );

     }


  })

  /**
   *
   *   添加分享页面
   *
   *   主要业务逻辑
   *
   *   - 添加分享信息
   *
   */

  .controller('RoundTableAddCtrl', function($rootScope,$scope,$state,$http,baseURL,UploadImgURL,UploadServerURL,$ionicActionSheet,$cordovaCamera,$ionicPopup,$cordovaFileTransfer) {

    $scope.shareData={};

    //默认上传图片显示的信息
    $scope.imageSrc=UploadImgURL+"icon.png";


    // 添加图片
    $scope.addSharePhoto = function () {
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
        targetWidth: 370,//头像宽度
        targetHeight: 660//头像高度

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
        targetWidth: 370,//头像宽度
        targetHeight: 660//头像高度
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


    $scope.doShareAdd = function(){

     console.log("add Share!"+$scope.shareData.content);

      var requestParams = "?callback=JSON_CALLBACK";

      //对应文件上传的服务器

      var server = encodeURI(UploadServerURL + requestParams);
      var fileURL = $scope.imageSrc;
      var options = {
        fileKey: "file",//相当于form表单项的name属性
        fileName: fileURL.substr(fileURL.lastIndexOf('/') + 1),
        mimeType: "image/jpeg"
      };

      if ($scope.imageSrc != UploadImgURL+"icon.png")
      {
              $cordovaFileTransfer.upload(server, fileURL, options)
                .then(function (result) {
                  // Success!
                  //alert("Code = " + result.responseCode + "Response = " + result.response+ "Sent = " + result.bytesSent);

                  //转换为JSON对象
                  var dataObj=eval("("+result.response+")");

                  $scope.imgHttpUrl = dataObj.img;

                  $scope.imageSrc = "file-"+dataObj.img+".jpg";


                  $scope.shareData.user_id = $rootScope.loginData.id;
                  $scope.shareData.imgsrc = $scope.imageSrc;

                  $http(

                    {
                      method:"POST",
                      url:baseURL+"share_insert",
                      data:$scope.shareData,
                      headers :{
                        'Content-Type' : 'application/json'
                      }
                    }

                  ).then(

                    function success(response) {

                      $scope.imageSrc=UploadImgURL+"icon.png";

                      $state.go('tab.round_table', {}, {reload: true});

                      $rootScope.doRefresh();

                    },

                    function error() {

                    }
                  );

                }, function (err) {


                }, function (progress) {
                  // constant progress updates
                });
      }else{

        var confirmPopup = $ionicPopup.confirm({
            title: '温馨提升',
            template: '请选择一张上传的图片 ^ ^ '
        });

        confirmPopup.then(function (res) {
            if (res) {
                console.log('Ok to delete');
            } else {
                console.log('Canceled delete');
            }
        });

      }



    }

  })

  .controller('FavouriteCtrl', function($scope) {

  })

  .controller('SystemMessageCtrl', function($scope) {

  })

  .controller('LoginCtrl', function($rootScope,$scope,$state,$http,$ionicPopup,$localStorage,baseURL) {

    //登录状态提示
    $rootScope.loginStatus = "";

    //登录数据
    $rootScope.loginData = $localStorage.getObject('userinfo','{}');

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

            var confirmPopup = $ionicPopup.confirm({
            title: '温馨提升',
            template: '账号或密码错误！ -} {- '
             });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');
                } else {
                    console.log('Canceled delete');
                }
            });

          }
          else {

            $rootScope.loginData = response.data;
            // console.log($rootScope.loginData);
            $rootScope.status = "";

            $localStorage.storeObject('userinfo',$rootScope.loginData);


            $state.go('tab.account', {}, {reload: true});

          }

        },
        function error() {

        }

      );

    };

  })


  .controller('RegisterCtrl', function($rootScope,$scope,$state,$http,$ionicPopup,baseURL,userFactory) {


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

            var confirmPopup = $ionicPopup.confirm({
            title: '温馨提升',
            template: '改手机账号已经注册！ -} {- '
             });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');
                } else {
                    console.log('Canceled delete');
                }
            });

            $scope.goNext = false;

          }else{

            $scope.goNext = true;
            $scope.status = "";

          }

          //密码不一致
          if ($scope.registerData.password != $scope.registerData.passwordConfirm){

            var confirmPopup = $ionicPopup.confirm({
            title: '温馨提升',
            template: '两次密码不一致！ -} {- '
             });

            confirmPopup.then(function (res) {
                if (res) {
                    console.log('Ok to delete');
                } else {
                    console.log('Canceled delete');
                }
            });


            $scope.goNext = false;
          }



          if ($scope.goNext)
          {

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

                var confirmPopup = $ionicPopup.confirm({
                title: '温馨提升',
                template: '注册成功，请登陆！ ^ ^ '
                 });

                confirmPopup.then(function (res) {
                    if (res) {
                        console.log('Ok to delete');
                    } else {
                        console.log('Canceled delete');
                    }
                });

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


  .controller('UpdatePasswordCtrl', function($rootScope,$scope,$state,$http,$ionicPopup,baseURL,userFactory) {

    $scope.status = "";

    $scope.doUpdatePassword = function () {


      if ($rootScope.loginData.newPassword != $rootScope.loginData.passwordConfirm)
      {
        //两次输入密码不一致
          var confirmPopup = $ionicPopup.confirm({
              title: '温馨提升',
              template: '两次密码不一致！ -} {- '
               });

              confirmPopup.then(function (res) {
                  if (res) {
                      console.log('Ok to delete');
                  } else {
                      console.log('Canceled delete');
                  }
              });

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


  .controller('UpdatePictureCtrl', function($scope,$state,$ionicActionSheet,$http,$rootScope,$cordovaCamera,$cordovaFileTransfer,baseURL,UploadServerURL) {

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

      var server = encodeURI(UploadServerURL + requestParams);
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

  .controller('AccountCtrl', function($rootScope,$scope,$state,baseURL,UploadImgURL) {

    $scope.UploadImgURL = UploadImgURL;

    $rootScope.status = "";


    $scope.doLoginOut = function(){
       console.log("doLoginOut");
       $rootScope.loginData={};
       $rootScope.loginStatus = "";

       $state.go('tab.login', {}, {reload: false});

    }

    $scope.settings = {
      enableFriends: true
    };


  });
