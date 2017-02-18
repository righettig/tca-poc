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
    `,
    controller: function($scope, $state, AuthService, Notification) {
        $scope.$on('IdleStart', function() {
            // the user appears to have gone idle
            console.log("IdleStart");
        });

        $scope.$on('IdleWarn', function(e, countdown) {
            // follows after the IdleStart event, but includes a countdown until the user is considered timed out
            // the countdown arg is the number of seconds remaining until then.
            // you can change the title or display a warning dialog from here.
            // you can let them resume their session by calling Idle.watch()
            console.log("IdleWarn");
            
            if (countdown === 3) {
                Notification({message: 'Idle warning notification'}, 'warning');    
            }
        });

        $scope.$on('IdleTimeout', function() {
            // the user has timed out (meaning idleDuration + timeout has passed without any activity)
            // this is where you'd log them
            console.log("IdleTimeout");
            
            AuthService.logout();
            $state.go("login");
            
            Notification.error({message: 'Error notification (no timeout)', delay: null});
        });

        $scope.$on('IdleEnd', function() {
            // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
            console.log("IdleEnd");
        });

        $scope.$on('Keepalive', function() {
            // do something to keep the user's session alive
            console.log("Keepalive");
        });
    }
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
//    .state('auth.monitor.orders', {
//        url: '/orders',
//        component: "orders"
//    })
//    .state('auth.monitor.routes', {
//        url: '/routes',
//        component: "routes"
//    })
//    .state('auth.monitor.fills', {
//        url: '/fills',
//        component: "fills"
//    })
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

app.factory('AuthService', function(localStorageService, Idle) {
    var authenticated = false;
        
    return {
        login: () => {
            localStorageService.set("token", "test");
            Idle.watch();
    
            authenticated = true;
        },
        logout: () => {
            localStorageService.remove("token");
            Idle.unwatch();
            
            authenticated = false;
        },
        isAuthenticated: () => {
            return authenticated;
        }
    };
});