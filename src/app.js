agGrid.initialiseAgGridWithAngular1(angular);

var app = angular.module("tca", ["ngRoute", "agGrid"]);

app.config(function($routeProvider) {
    $routeProvider
		.when("/", {
			template : "<monitor></monitor>"
		});
});