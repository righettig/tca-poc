app.factory('AuthService', function(localStorageService, Idle) {
    var authenticated = false;
        
    return {
        login: () => {
            localStorageService.set("token", "test");
            //Idle.watch();
    
            authenticated = true;
        },
        logout: () => {
            localStorageService.remove("token");
            //Idle.unwatch();
            
            authenticated = false;
        },
        isAuthenticated: () => {
            return authenticated;
        }
    };
});