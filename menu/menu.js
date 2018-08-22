aisales.controller('menuCtrl',function ($scope,$rootScope, $location) {
  $rootScope.cartData ={ items:[], total:0};
  if($rootScope.menudata){
    $rootScope.recommendedFood =  $rootScope.menudata.recommendedFood; 
    $rootScope.menuItems = $rootScope.menudata.menuItems; 
  }else{
    $rootScope.uploadStream()
  }  
  
  $scope.addTocart =(item)=>{
    $rootScope.cartData.items.push(item);
    $rootScope.cartData.total = $scope.cartData.total + item.price;
  }
  $scope.checkout =(ev)=>{
    $location.url('/payment')
  }
  
})
