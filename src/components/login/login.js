app.component("login", {
    templateUrl: "src/components/login/login.html",
    
    controller: function(AuthService, defaultState, $state) {
        this.login = function() {
            AuthService.login();
            
            $state.go(defaultState);
        }
    }
});