app.controller('mathCtrl', function($scope, $rootScope) {

	$scope.correctCount = 0;
	$scope.selectedOperator = '+';
	$scope.ans = null;
	$scope.currProblem = nextProblem($scope.selectedOperator);
	$scope.operators = ['+','-','x'];
	// reset Function
	$scope.reset = function () {
		$rootScope.mathAnswers = [];
	};
	
	$scope.onEnter = function (event) {
	    var key = event.which || event.keyCode;
	    if(key == 13)
	    	$scope.initNextProb();
	};
	
	
	$scope.initNextProb= function(checkNull) {
	
		if(checkNull === true && ($scope.ans === null || $scope.ans == undefined))
		{
			alert("Please enter answer.");
			return;
		}
	
		$scope.currProblem.ans = Number($scope.ans);
		$scope.currProblem.operator = $scope.selectedOperator;
		$scope.currProblem.isCorrect = checkAns($scope.currProblem);
		
		if($scope.currProblem.isCorrect)
			$scope.correctCount++;
		
		$scope.currProblem.color = ($scope.currProblem.isCorrect) ? "green" : 'red';
		$scope.currProblem.isCorrect = ($scope.currProblem.isCorrect) ? "✔" : '✘';

		$rootScope.mathAnswers.unshift(angular.copy($scope.currProblem));

		$scope.resultCount = $scope.correctCount.toString() + " / " + $rootScope.mathAnswers.length;
		
		window.document.getElementById("ans").focus(); // not a good practice
		
		$scope.currProblem = nextProblem($scope.selectedOperator);
		$scope.ans = null;
	};
	//$scope.initNextProb(false);
	
	function nextProblem(operator) {
		var f = Math.floor((Math.random() * 9) + 1);
		var s = Math.floor((Math.random() * 9) + 1);
		if(operator === '/' && s == 0)
			s = 1;
		if(operator === '-' && s > f) { // swap numbers
			f = f + s;
			s = f - s;
			f = f - s;
			}
		return {
			firstNum: f,
			secondNum: s,
			operator: operator,
			ans: 0,
			isCorrect: false,
			text: '',
			color: 'green'
		};
	}
	
	function checkAns(prob) {
		if(prob.operator === '+') {
			return (prob.firstNum + prob.secondNum) == prob.ans;
		}
		else if(prob.operator === '-') {
			return (prob.firstNum - prob.secondNum) == prob.ans;
		}
		else if(prob.operator === 'x') {
			return (prob.firstNum * prob.secondNum) == prob.ans;
		}
		else if(prob.operator === '/') {
			return (prob.firstNum / (prob.secondNum == 0 ? 1 : prob.secondNum)) == prob.ans;
		}
		return false;
	}
	
});