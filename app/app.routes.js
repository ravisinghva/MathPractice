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
    .when("/srch", {
        templateUrl : "app/components/Search/searchView.html",
        controller : "srchCtrl"
    })
	.otherwise({
	        templateUrl : "app/components/Main/mainView.html"
	    });
});