aisales.controller('paymentCtrl',function ($scope,$rootScope, $location) {
  if($rootScope.menudata && $rootScope.signIn != 'Sign In'){
    $rootScope.payment = $rootScope.menudata.payment; 
  }else{
    //$rootScope.uploadStream()
    $rootScope.logout();
  }  
  
  $scope.changePaymentMethod = (method)=>{
    $rootScope.payment.paymentMethod = method; 
  }
  
  $scope.doPayment = (msg)=>{
    $rootScope.showAlertDialog({}, 'Payment', msg ? msg :`Payment Done! Please wait for food to deliver.`)
    $location.url('/menu')

  }
})
