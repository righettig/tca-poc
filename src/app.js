var app = angular.module("tca", ["ngRoute"]);

app.config(function($routeProvider) {
    $routeProvider
		.when("/", {
			template : "<monitor></monitor>"
		});
});