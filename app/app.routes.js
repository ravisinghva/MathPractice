app.config(function($routeProvider) {
    $routeProvider
    .when("/atrp", {
        templateUrl : "app/components/AnalogTimeReading/artpView.html",
        controller : "atrpCtrl"
    })
    .when("/mathp", {
        templateUrl : "app/components/Math/mathView.html",
        controller : "mathCtrl"
    })
	.otherwise({
	        templateUrl : "app/components/Main/mainView.html"
	    });
});