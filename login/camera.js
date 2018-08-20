'use strict'
aisales.controller('cameraCtrl', function($rootScope, $scope, $mdToast, $mdDialog, $http,$location, TOAST_DELAY, TOAST_POS) {
  
  // Define constants
  const cameraView = document.querySelector("#camera--view"),
      cameraOutput = document.querySelector("#camera--output"),
      cameraSensor = document.querySelector("#camera--sensor"),
      cameraTrigger = document.querySelector("#camera--trigger")
      
  $scope.showStopCamera = false;
  $scope.showTakePicture = true;
  $scope.takePicName = "Take a picture";

  $rootScope.stopStream = (ev)=>{
    $rootScope.track.stop();
    $scope.showStopCamera = false;
    $scope.showTakePicture = false;
  }
  $rootScope.cancelStream = (ev)=>{
    cameraSensor.getContext("2d").clearRect(0, 0, cameraSensor.width, cameraSensor.height);
  }
  $rootScope.uploadStream = (ev)=>{
    $http.get('data/login.json').then((data) =>{
      console.log(data.data)
      $location.url('/menu');
    })
  }
  $rootScope.stopStream = (ev)=>{
    $rootScope.track.stop();
    $scope.showStopCamera = false;
    $scope.showTakePicture = false;
  }
  
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

  // Access the device camera and stream to cameraView
  function cameraStart() {
    console.log('starting cam');
      navigator.mediaDevices
          .getUserMedia(constraints)
          .then(function(stream) {
            $scope.showStopCamera = true;
            $rootScope.track = stream.getTracks()[0];
            cameraView.srcObject = stream;
          })
          .catch(function(error) {
            console.error("Oops. Something is broken.", error);
          });
  }
  // Take a picture when cameraTrigger is tapped
  // Start the video stream when the window loads
  //window.addEventListener("load", cameraStart, false);
  // default camera ends here
  
    $scope.takePicture = ()=>{
      $scope.takePicName = "Take another picture";
      cameraSensor.width = cameraView.videoWidth;
      cameraSensor.height = cameraView.videoHeight;
      cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
      //cameraOutput.src = cameraSensor.toDataURL("image/webp");
      //cameraOutput.classList.add("taken");
    }
    
    cameraStart();
})