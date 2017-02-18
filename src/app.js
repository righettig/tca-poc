agGrid.initialiseAgGridWithAngular1(angular);

let app = angular.module("tca", ["ngRoute", "agGrid"]);

app.config(function($routeProvider) {
    $routeProvider
		.when("/", {
			template : "<monitor></monitor>"
		});
});