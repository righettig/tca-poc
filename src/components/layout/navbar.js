app.component("navbar", {
    templateUrl: "src/components/layout/navbar.html",
    
    controller: function(AuthService, $state) {
        this.logout = function() {
            AuthService.logout();
            $state.go("login");
        }
    }
})

/*@Component({
 	selector: 'navbar'
})
@View({
    templateUrl: './src/components/layout/navbar.html'
})
export class Navbar {
	constructor(AuthService, $state) {
		this.logout = function() {
            AuthService.logout();
            $state.go("login");
        }
	}
}*/