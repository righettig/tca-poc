app.component("navbar", {
    template: `
        <div style='background: black; color: white'>
            <a ui-sref='auth.home'>Home</a>
            <a ui-sref='auth.about'>About</a>
            <a ng-click='$ctrl.logout()'>Logout</>
        </div>
    `,
    controller: function(AuthService, $state) {
        this.logout = function() {
            AuthService.logout();
            $state.go("login");
        }
    }
})