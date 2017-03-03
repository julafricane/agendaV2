module.exports = (function(){
	var app = angular.module(
		'app',
		['ngRoute', 'LocalStorageModule']
	);

	app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){

		$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeCtrl'
		})
		.otherwise({ redirectTo: '/' });

		$locationProvider.hashPrefix('!');
	}]);

	app.config(function(localStorageServiceProvider){
		// === TODO : define a prefix for your localstorage data
		localStorageServiceProvider.setPrefix('feather-front');
	});

	app.directive('myEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
						console.log(event);
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.myEnter);
                });

                event.preventDefault();
            }
        });
    };
});

	return app;
})();
