aisales.controller('paymentCtrl',function ($scope,$rootScope, $location) {
  if($rootScope.menudata){
    $rootScope.payment = $rootScope.menudata.payment; 
  }else{
    $rootScope.uploadStream()
  }  
  
  $scope.changePaymentMethod = (method)=>{
    $rootScope.payment.paymentMethod = method; 
  }
})
