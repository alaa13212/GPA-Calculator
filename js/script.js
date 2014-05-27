angular.module("components",  [])
	.directive('appHeader', function () {
		return {
			restrict: "E",
			templateUrl: "partials/header.html"
		}; 
	})
	.directive('appFooter', function () {
		return {
			restrict: "E",
			templateUrl: "partials/footer.html"
		}; 
	});

angular.module("gpaCalc", ["components", "ngAnimate"]);

function GPACtrl ($scope) {
	$scope.courses = [{
		name: "",
		credits: 1,
		grade: 2
	}];
	
	
	$scope.getTotalCredits = function (){
		var totalCredits = 0;
		
		for (var i=0, l=$scope.courses.length; i<l; i++){
			totalCredits += $scope.courses[i].credits;
		}
		
		return totalCredits;
	};

	$scope.getTheGPA = function (){
		var totalGrades = 0;
		
		for (var i=0, l=$scope.courses.length; i<l; i++){
			totalGrades += ($scope.courses[i].grade * $scope.courses[i].credits);
		}
		
		return Math.round(totalGrades/($scope.getTotalCredits())*1000)/1000 || 0;
	};
	
	$scope.addCourse = function (){
			$scope.courses.push({
			name: "",
			credits: 1,
			grade: 2
		});
	};
	$scope.removeCourse = function (index){
		$scope.courses.splice(index, 1);
	};
}
