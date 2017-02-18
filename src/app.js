agGrid.initialiseAgGridWithAngular1(angular);

let app = angular.module("tca", [
    'ui.router',
    'ui-notification',
    'LocalStorageModule', 
    'ngIdle',
    'agGrid',
]);

app.config(function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('app');
});

app.config(function(IdleProvider, KeepaliveProvider) {
    // configure Idle settings
    IdleProvider.idle(5); // in seconds
    IdleProvider.timeout(5); // in seconds
    KeepaliveProvider.interval(2); // in seconds
});

/*
var Visualizer = window['ui-router-visualizer'].Visualizer;

app.run(function($uiRouter, $trace) {  
  var pluginInstance = $uiRouter.plugin(Visualizer);
  
  $trace.enable('TRANSITION')
})
*/

app.component("tcaApp", {
    template: `
        <div ui-view ng-cloak"><login></login></div>
    `
});

app.constant('defaultState', "auth.monitor");

app.config(function($stateProvider, $urlServiceProvider) { 
  //$urlServiceProvider.rules.when('/monitor', '/monitor/orders')
  $urlServiceProvider.rules.when('/', '/login')
    
  $stateProvider
    .state("login", {
        url: '/login',
        component: "login"
    })
    .state('auth', {
        abstract: true,
        component: "layout"
    })
    .state('auth.monitor', {
        url: '/monitor',
        component: "monitor"
    })
    .state('auth.about', {
        url: '/about',
        component: "about"
    });
});

app.component("login", {
    template: "<button ng-click='$ctrl.login()'>Login</button>",
    
    controller: function(AuthService, defaultState, $state) {
        this.login = function() {
            AuthService.login();
            
            $state.go(defaultState);
        }
    }
})

app.factory('AuthService', function() {
    var authenticated = false;
        
    return {
        login: () => {
            //localStorageService.set("token", "test");
            //Idle.watch();
    
            authenticated = true;
        },
        logout: () => {
            //localStorageService.remove("token");
            //Idle.unwatch();
            
            authenticated = false;
        },
        isAuthenticated: () => {
            return authenticated;
        }
    };
});