
let aisales = angular.module('aisales', ['ngRoute', 'ngMaterial', 'ngMessages']);
aisales.controller('aisalesCtrl', function($rootScope, $scope, $mdToast, $mdDialog, $rootScope, $http, $location, TOAST_DELAY, TOAST_POS) {

  $rootScope.signIn = 'Sign In';
  $rootScope.logout = ()=>{
    $rootScope.setCookie('faceId', '', 0);
    $rootScope.setCookie('timestamp', '', 0);
    $rootScope.setCookie('username', '', 0);
    $rootScope.signIn = 'Sign In';
    $location.url('/');
  }
  $rootScope.showToast = (msg)=>{
      $mdToast.show($mdToast.simple().textContent(msg).position(TOAST_POS).hideDelay(TOAST_DELAY));
  };
  
  $rootScope.uploadStream = (ev)=>{
    $http.get('data/login.json').then((data) =>{
      $rootScope.menudata = data.data;
      $rootScope.menuItems = $rootScope.menudata ? $rootScope.menudata.recommendedFood : []; 
      $rootScope.setCookie('faceId', $rootScope.menudata.faceId, 15);
      $rootScope.setCookie('timestamp', $rootScope.menudata.timestamp, 15);
      $rootScope.setCookie('username', $rootScope.menudata.name, 15);
      $rootScope.signIn = 'Log out';
      $location.url('/menu');
    })
  }
  
   $rootScope.setCookie = (cname, cvalue, exdays)=>{
      var d = new Date();
      d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

     $rootScope.getCookie = (cname)=>{
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    }

    $rootScope.checkCookie =()=>{
        var user = $rootScope.getCookie("username");
        if (user != "") {
            alert("Welcome again " + user);
            $rootScope.signIn = 'Log out';
            $location.url('/menu');
        } else {
            // user = prompt("Please enter your name:", "");
            // if (user != "" && user != null) {
            //     setCookie("username", user, 365);
            // }
        }
    }
    
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
  
  $rootScope.checkCookie();
  

})
.constant('TOAST_DELAY', 3000)
.constant('TOAST_POS', 'bottom right');

aisales.config(function($mdThemingProvider, $mdDateLocaleProvider,$routeProvider, $locationProvider) {

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
          templateUrl : 'home.html'
      })
      .when("/signin", {
          templateUrl : 'login/camera.html'
      })
      .when("/menu", {
          templateUrl : 'menu/menu.html'
      })
      .when("/cart", {
          templateUrl : 'cart/cart.html'
      });
      $locationProvider.hashPrefix('!');
      $locationProvider.html5Mode({enabled: false, requireBase: false});
});
