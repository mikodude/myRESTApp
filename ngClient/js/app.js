var myApp = angular.module('ngclient', ['ngRoute']);

myApp.config(function($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
    
    $routeProvider
        .when('/login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl',
            access: {
                requiredLogin: false
            }
        }).when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl',
            access: {
                requiredLogin: true
            }
        }).when('/page1', {
            templateUrl: 'partials/page1.html',
            controller: 'Page1Ctrl',
            access: {
                requiredLogin: true
            }
        }).when('/page2', {
            templateUrl: 'partials/page2.html',
            controller: 'Page2Ctrl',
            access: {
                requiredLogin: true
            }
        }).when('/page3', {
            templateUrl: 'partials/page3.html',
            controller: 'Page3Ctrl',
            access: {
                requiredLogin: true
            }
        }).otherwise({
            redirectTo: '/login'
        });
});

myApp.run(function($rootScope, $window, $location, AuthenticationFactory) {
    AuthenticationFactory.check();
    
    $rootScope.$on("$routeChangeStart", function(event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !AuthenticationFactory.isLogged) {
            $location.path("/login");
        } else {
            if (!AuthenticationFactory.user) AuthenticationFactory.user = $window.sessionStorage.user;
            if (!AuthenticationFactory.userRole) AuthenticationFactory.userRole = $window.sessionStorage.userRole;
        }
    });
    
    $rootScope.$on('$routeChangeSuccess', function(event, nextRoute, currentRoute) {
        $rootScope.showMenu = AuthenticationFactory.isLogged;
        $rootScope.role = AuthenticationFactory.userRole;
        
        if (AuthenticationFactory.isLogged == true && $location.path() == '/login') {
            $location.path('/');
        }
    });
});