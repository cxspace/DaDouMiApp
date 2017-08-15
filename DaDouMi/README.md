Ionic App Base
==============

A starting project for Ionic that optionally supports using custom SCSS.

## Using this project

We recommend using the [Ionic CLI](https://github.com/ionic-team/ionic-cli) to create new Ionic projects that are based on this project but use a ready-made starter template.

For example, to start a new Ionic project with the default tabs interface, make sure the `ionic` utility is installed:

```bash
$ npm install -g ionic cordova
```

Then run: 

```bash
$ ionic start myProject tabs --type=ionic1 --cordova
```

More info on this can be found on the Ionic [Getting Started](https://ionicframework.com/getting-started) page and the [Ionic CLI](https://github.com/ionic-team/ionic-cli) repo.

## Issues

Issues have been disabled on this repo. If you do find an issue or have a question, consider posting it on the [Ionic Forum](https://forum.ionicframework.com/). If there is truly an error, follow our guidelines for [submitting an issue](https://ionicframework.com/submit-issue/) to the main Ionic repository.

## 文件上传处理

# clientController.js

```
app.controller(['$cordovaFileTransfer', function ( $cordovaFileTransfer ) {
    // 一定要将代码放在事件监听中
    // 表示设备准备好了之后才能执行里面的代码
    document.addEventListener('deviceready', function () {
        var uploadOptions = new FileUploadOptions(),
            server = 'your_server_api',
            imgPath = 'your_img_path';

        // 注意此处设置的fileKey，Express服务端中也需要这个
        uploadOptions.fileKey = 'file';
        uploadOptions.fileName = imgPath.substr(imgPath.lastIndexOf('/') + 1);
        uploadOptions.mimeType = 'image/jpeg';
        uploadOptions.chunkedMode = false;

        $cordovaFileTransfer.upload( server, imgPath, uploadOptions )
            .then(function ( result ) {
                // 上传成功
            }, function ( error ) {
                // 上传失败
            }, function ( progress ) {
                // 上传进度
            });

    }, false);
}]);
```
# server_router.js

```
var router = require('express').Router(),
    uploadPhoto = require('/modules/path/server_upload').uploadFile;

router.all('/photo_upload', function ( req, res ) {
    uploadFile(req, res);
});
```
# server_upload.js
```

var multer = require('multer'),
    storage = multer.diskStorage({
        destination: function ( req, file, callback ) {
            // 注意，此处的uploads目录是从项目的根目录开始寻找
            // 如果没有的话，需要手动新建此文件夹
            callback(null, './uploads');
        },
        
        // multer不会自动添加文件后缀名，需要手动添加
        filename: function ( req, file, callback ) {
            callback(null, file.fieldname + '-' + Date.now() + '.' + file.mimetype.split('/')[1]);
        }
    }),

    // single里的字符串必须设置为与客户端设置的fileKey一致
    upload = multer({
        storage: storage,
        limits: 1000000
    }).single('file');

// upload photo
function uploadFile( req, res ) {
    upload(req, res, function ( error ) {
        if ( error ) {
            console.error(JSON.stringify(error));
            return res.end('Error uploading file.');
        }
        console.log('Success!');
        res.end('File is uploaded');
    });
}

exports.uploadFile = uploadFile;

```