aisales.controller('menuCtrl',function ($scope,$rootScope, $location) {
  $scope.cartData ={ items:[], total:0};
  if($rootScope.menudata){
    $rootScope.recommendedFood =  $rootScope.menudata.recommendedFood; 
    $rootScope.menuItems = $rootScope.menudata.menuItems; 
  }else{
    $rootScope.uploadStream()
  }  
  
  $scope.addTocart =(item)=>{
    $scope.cartData.items.push(item);
    $scope.cartData.total = $scope.cartData.total + item.price;
  }
  $scope.checkout =(ev)=>{
    $location.url('/payment')
  }
  
})
