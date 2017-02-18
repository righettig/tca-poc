app.component("navbar", {
    templateUrl: "src/components/layout/navbar.html",
    
    controller: function(AuthService, $state) {
        this.logout = function() {
            AuthService.logout();
            $state.go("login");
        }
    }
})