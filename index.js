
let jhora = angular.module('aisales', ['ngRoute', 'ngMaterial', 'ngMessages']);
jhora.controller('aisalesCtrl', function($rootScope, $scope, $mdToast, $mdDialog, TOAST_DELAY, TOAST_POS) {


  $rootScope.showToast = (msg)=>{
      $mdToast.show($mdToast.simple().textContent(msg).position(TOAST_POS).hideDelay(TOAST_DELAY));
  };

  $rootScope.showAlertDialog = (ev, title, msg)=>{
      $mdDialog.show(
          $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(false)
          .title(title)
          .textContent(msg)
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .theme('dark-orange')
          .targetEvent(ev)
      );
  };
  
  $scope.showConfirmDialog = (ev, title, msg)=>{
    let p =new Promise( (resolve, reject)=>{
      let confirm = $mdDialog.confirm()
      .title(title)
      .textContent(msg)
      .ariaLabel('Delete')
      .targetEvent(ev)
      .ok('Submit')
      .cancel('Cancel');
      
      $mdDialog.show(confirm).then((data)=>{
        resolve(data);
      },(err)=>{
      });
    });
    return p;
  };

  $rootScope.showDialog = (ev,modelName, data, templateUrl, msg ='')=>{
      let p =new Promise( (resolve, reject)=>{
          $mdDialog.show({
              controller: ($scope, $mdDialog)=>{
                
                // default camera 

                  $scope.answer = function(answer) {
                      $mdDialog.hide(answer);
                  };
              },
              templateUrl: templateUrl,
              parent: angular.element(document.body),
              targetEvent: ev,
              clickOutsideToClose:false,
              fullscreen: true
          })
          .then(function(answer) {
              resolve(answer);
          })
      });

      return p;
  };

  $scope.openCamera = (ev)=>{
    $rootScope.showDialog(ev,'customer', {}, 'camera.html','Take Picture?')
    .then((answer)=>{
      if(answer == 'submit') {
        $scope.confirmCustomer(customer);
      }
    });
  }
  
  // Set constraints for the video stream
  var constraints = { video: { facingMode: "user" }, audio: false };
  // Define constants
  const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")
  // Access the device camera and stream to cameraView
  function cameraStart() {
      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(stream) {
          track = stream.getTracks()[0];
          cameraView.srcObject = stream;
      })
      .catch(function(error) {
          console.error("Oops. Something is broken.", error);
      });
  }
  // Take a picture when cameraTrigger is tapped
  // cameraTrigger.onclick = function() {
  //     cameraSensor.width = cameraView.videoWidth;
  //     cameraSensor.height = cameraView.videoHeight;
  //     cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
  //     cameraOutput.src = cameraSensor.toDataURL("image/webp");
  //     cameraOutput.classList.add("taken");
  // };
  // Start the video stream when the window loads
  window.addEventListener("load", cameraStart, false);
  // default camera ends here
  
    $scope.takePicture = ()=>{
      console.log('taking picture1');
      cameraSensor.width = cameraView.videoWidth;
      cameraSensor.height = cameraView.videoHeight;
      cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
      cameraOutput.src = cameraSensor.toDataURL("image/webp");
      cameraOutput.classList.add("taken");
    }
})
.constant('TOAST_DELAY', 3000)
.constant('TOAST_POS', 'bottom right');

jhora.config(function($mdThemingProvider, $mdDateLocaleProvider,$routeProvider, $locationProvider) {

  $mdThemingProvider.theme('docs-dark', 'default').primaryPalette('yellow') .dark();
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-purple').backgroundPalette('deep-purple').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();

  $mdDateLocaleProvider.parseDate = function(dateString) {
    let dd = dateString ? new Date(dateString) : undefined;
    let formattedDate = '';
    if(dd){
      let d = dd.getDate()< 10  ?  '0'+ (dd.getDate()) : dd.getDate();
      let m = dd.getMonth() < 10 ?  '0'+ (dd.getMonth()+1) : dd.getMonth()+1;
      let y = dd.getFullYear();
      formattedDate = !isNaN(d) ? `${y}-${m}-${d}` :'';
    }
    return formattedDate ? formattedDate : '';
  };

  $mdDateLocaleProvider.formatDate = function(date) {
    let dd = date ? date : undefined;
    let formattedDate = '';
    if(dd){
      let d = dd.getDate();
      let m = dd.getMonth();
      let y = dd.getFullYear();
      formattedDate = !isNaN(d) ? `${d}-${m + 1}-${y}`:null;
    }
    return formattedDate ? formattedDate : null;
  };
  $routeProvider
      .when("/", {
          templateUrl : 'menu.html'
      })
      .when("/setting", {
          templateUrl : 'menu.html'
      });
      $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode({enabled: false, requireBase: false});
});
