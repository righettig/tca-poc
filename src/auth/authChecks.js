app.run(function($transitions, defaultState) {
    var getAuth = 
        t => t.injector().get('AuthService');
    
    var getLocalStorage = 
        t => t.injector().get('localStorageService')
    
    var state = 
        (t, state) => t.router.stateService.target(state);
    
    $transitions.onBefore({ to: 'login' }, function(t) {
        if (getAuth(t).isAuthenticated()) {
            return state(t, defaultState)
        }
        
        if (getLocalStorage(t).get("token")) {
            getAuth(t).login();            
            return state(t, defaultState);
        }
    });
    
    $transitions.onBefore({ to: 'auth.*' }, function(t) {
        if (!getAuth(t).isAuthenticated()) {
            if (getLocalStorage(t).get("token")) {
                getAuth(t).login(); 
            } else {
                return state(t, 'login')    
            }
        }
    });
})