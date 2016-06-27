app.controller('atrpCtrl', function($scope, $rootScope) {

	$scope.currProblem = {
		hour: 0,
		minute: 0,
		hourAns: 0,
		minuteAns: 0,
		isCorrect: false,
		text: '',
		color: 'green'
	};
	
	$scope.correctCount = 0;
	
	// reset Function
	$scope.reset = function () {
		$rootScope.artpAnswers = [];
		drawClock();
		$scope.hourAns = null;
		$scope.minuteAns = null;
	};
	
	$scope.onEnter = function (event) {
	    var key = event.which || event.keyCode;
	    if(key == 13)
	    	$scope.drawNextTime();
	};
	
	$scope.hourAns = null;
	$scope.minuteAns = null;
	$scope.resultCount = null;
	
	$scope.drawNextTime = function() {
	
		if($scope.hourAns === null || $scope.hourAns == undefined || $scope.hourAns === 0 || $scope.hourAns === '')
		{
			alert("Please enter hours.");
			return;
		}
	
		if($scope.minuteAns === null || $scope.minuteAns === undefined || $scope.minuteAns === '')
		{
			alert("Please enter minutes.");
			return;
		}
		$scope.currProblem.hourAns = Number($scope.hourAns);
		$scope.currProblem.minuteAns = Number($scope.minuteAns);
		$scope.currProblem.isCorrect = ($scope.currProblem.hour === $scope.currProblem.hourAns && $scope.currProblem.minute === $scope.currProblem.minuteAns);
		
		if($scope.currProblem.isCorrect)
			$scope.correctCount++;
		
		$scope.currProblem.color = ($scope.currProblem.isCorrect) ? "green" : 'red';
		$scope.currProblem.isCorrect = ($scope.currProblem.isCorrect) ? "✔" : '✘';

		$rootScope.artpAnswers.unshift(angular.copy($scope.currProblem));

		$scope.resultCount = $scope.correctCount.toString() + " / " + $rootScope.artpAnswers.length;
		window.document.getElementById("hour").focus(); // not a good practice
		
		//if(!$scope.currProblem.isCorrect)
		//	return;
		drawClock();
		$scope.hourAns = null;
		$scope.minuteAns = null;
	};
	drawClock();
	
	function drawClock(drawSec = true) {
		var now = new Date();
		var hour = Math.floor((Math.random() * 12) + 1);
		var minute = Math.floor((Math.random() * 12))*5;
		var second = 0;
		
		$scope.currProblem = {
			hour: hour,
			minute: minute,
			hourAns: 0,
			minuteAns: 0,
			isCorrect: false,
			text: '',
			color: 'green'
		};
		
		var canvas = window.document.getElementById("canvas");
		var ctx = canvas.getContext("2d");
		ctx.save();
		var radius = canvas.height / 2;
		ctx.translate(radius, radius);
		radius = radius * 0.90
			
		drawClockInt(ctx, radius, hour, minute, second, false);
		ctx.restore();
	}
	
	function drawFace(ctx, radius) {
	  var grad;
	  ctx.beginPath();
	  ctx.arc(0, 0, radius, 0, 2*Math.PI);
	  ctx.fillStyle = 'white';
	  ctx.fill();
	  grad = ctx.createRadialGradient(0,0,radius*0.95, 0,0,radius*1.05);
	  grad.addColorStop(0, '#333');
	  grad.addColorStop(0.5, 'white');
	  grad.addColorStop(1, '#333');
	  ctx.strokeStyle = grad;
	  ctx.lineWidth = radius*0.1;
	  ctx.stroke();
	  ctx.beginPath();
	  ctx.arc(0, 0, radius*0.1, 0, 2*Math.PI);
	  ctx.fillStyle = '#333';
	  ctx.fill();
	}
	
	function drawNumbers(ctx, radius) {
	  var ang;
	  var num;
	  ctx.font = radius*0.15 + "px arial";
	  ctx.textBaseline="middle";
	  ctx.textAlign="center";
	  for(num = 1; num < 13; num++){
	    ang = num * Math.PI / 6;
	    ctx.rotate(ang);
	    ctx.translate(0, -radius*0.85);
	    ctx.rotate(-ang);
	    ctx.fillText(num.toString(), 0, 0);
	    ctx.rotate(ang);
	    ctx.translate(0, radius*0.85);
	    ctx.rotate(-ang);
	  }
	}
	
	function drawSecondDots(ctx, radius) {
		//	return;
	  var ang;
	  var num;
	  ctx.font = radius*0.15 + "px arial";
	  ctx.textBaseline="middle";
	  ctx.textAlign="center";
	  ctx.lineWidth = 0.5;
	  ctx.strokeStyle = null;
	  for(num = 1; num < 60; num++){
	  	if(num == 5 || num == 10 || num == 15 || num == 20 || num == 25 || num == 30 || 
	  		num == 35 || num == 40 || num == 45 || num == 50 || num == 55)
	  		continue;
	    ang = num * Math.PI / 30;
	  	ctx.beginPath();
	    ctx.rotate(ang);
	    ctx.translate(0, -radius*0.85);
	    ctx.rotate(-ang);
	    ctx.arc(0,0,2,0,2*Math.PI);
	    ctx.stroke();
	    ctx.rotate(ang);
	    ctx.translate(0, radius*0.85);
	    ctx.rotate(-ang);
	  }
	}
	
	function drawTime(ctx, radius, hour, minute, second, drawSec) {
	    //hour
	    hour=hour%12;
	    hour=(hour*Math.PI/6)+
	    (minute*Math.PI/(6*60))+
	    (second*Math.PI/(360*60));
	    drawHand(ctx, hour, radius*0.5, radius*0.07);
	    //minute
	    minute=(minute*Math.PI/30)+(second*Math.PI/(30*60));
	    drawHand(ctx, minute, radius*0.8, radius*0.04);
	    // second
	    if(drawSec) {
	    	second=(second*Math.PI/30);
	    	drawHand(ctx, second, radius*0.9, radius*0.02);
	    }
	}
	
	function drawHand(ctx, pos, length, width) {
		ctx.beginPath();
		ctx.lineWidth = width;
		ctx.lineCap = "round";
		ctx.moveTo(0,0);
		ctx.rotate(pos);
		ctx.lineTo(0, -length);
		ctx.stroke();
		ctx.rotate(-pos);
	}
	
	function drawClockInt(ctx, radius, hour, minute, second)
	{
		drawFace(ctx, radius);
		drawSecondDots(ctx, radius);
		drawNumbers(ctx, radius);
		drawTime(ctx, radius, hour, minute, second, false);
	}
	
	
	function zeroPad(num, places) {
	  var zero = places - num.toString().length + 1;
	  return Array(+(zero > 0 && zero)).join("0") + num;
	}
});