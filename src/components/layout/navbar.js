app.component("navbar", {
    template: `
        <div style='background: black; color: white; padding: 4px'>
            <a ui-sref='auth.analytics'>PreTrade</a>
            <a ui-sref='auth.monitor'>Monitor</a>
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