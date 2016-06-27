var app = angular.module("mathPractice", ["ngRoute"]);
app.run(function($rootScope) {
    $rootScope.artpAnswers = [];
    $rootScope.mathAnswers = [];
});