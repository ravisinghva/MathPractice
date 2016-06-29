app.controller('srchCtrl', function($scope, $rootScope, $http) {

	$scope.searchText = '';
	$rootScope.serachResults = [];

	$scope.onEnter = function (event) {
		
		var key = event.which || event.keyCode;
	    if(key == 13)
	    	$scope.Search();
	};
	
	
	$scope.Search= function() {
	
		if($scope.searchText === null || $scope.searchText == undefined)
		{
			alert("Provide some text please ");
			return;
		}
		$http({
        	method : "GET",
        	url : "../../MathPractice/app/shared/SearchData.php"
    		}).then(function onSucces(response) {
    			$rootScope.serachResults = response.data;
    		}, function myError(response) {
    			$rootScope.serachResults = [];
    	});
	};
});