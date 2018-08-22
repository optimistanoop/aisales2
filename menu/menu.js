aisales.controller('menuCtrl',function ($scope,$rootScope, $location) {
  $rootScope.cartData ={ items:[], total:0};
  if($rootScope.menudata && $rootScope.signIn != 'Sign In'){
    $rootScope.recommendedFood =  $rootScope.menudata.recommendedFood; 
    $rootScope.menuItems = $rootScope.menudata.menuItems;
    $scope.gender = $rootScope.menudata.faceData.faces[0].gender;
    var emotion = $rootScope.menudata.faceData.faces[0].emotions[0];
    if (emotion == "happy" || emotion == "angry" || emotion == "neutral" || emotion == "sad") {
      $scope.mood = emotion;
    }
    else {
      $scope.mood = 'neutral';
    }
  }else{
    //$location.url('/payment');
    //$rootScope.uploadStream()
    $rootScope.logout();
  }  
  
  $scope.addTocart =(item)=>{
    $rootScope.cartData.items.push(item);
    $rootScope.cartData.total = $scope.cartData.total + item.price;
  }
  $scope.checkout =(ev)=>{
    $location.url('/payment')
  }
  
})
