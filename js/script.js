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

var gpaCalc = angular.module("gpaCalc", ["components", "ngAnimate"]);


gpaCalc.filter('round', function () {
	return function (n, m) {
		if (m) {
			m = Math.pow(10, m);
        } else {
			m = 1000;
        }
        return Math.round(n * m) / m;
	};
});


function GPACtrl($scope) {
	$scope.courses = [{
		name: "",
		credits: 1,
		grade: 2
	}];
	
	$scope.max5 = false;
	$scope.pastCredits = 0;
	$scope.pastGPA = 0;
	
	$scope.getTotalCredits = function () {
		var totalCredits = 0;
		
		for (var i=0, l=$scope.courses.length; i<l; i++){
			totalCredits += $scope.courses[i].credits;
		}
		
		return totalCredits;
	};

	$scope.getTheGPA = function (){
		var totalGrades = 0,
			theGPA;
			
		$scope.sCredits = $scope.getTotalCredits();
		
		for (var i=0, l=$scope.courses.length; i<l; i++){
			totalGrades += ($scope.courses[i].grade * $scope.courses[i].credits);
		}
		
		theGPA = (totalGrades/$scope.sCredits || 0) + ($scope.max5?1:0);

		 $scope.max5 && ($scope.info = false);
		!$scope.max5 && $scope.checkHonor(totalGrades, $scope.sCredits);
		
		$scope.allCredits = $scope.sCredits + $scope.pastCredits;
		$scope.cumGPA = ($scope.sCredits*theGPA + $scope.pastCredits*$scope.pastGPA)/$scope.allCredits;
		
		return theGPA;
		
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
	
	$scope.checkHonor = function(totalGrades, totalCredits){
		var theGPA = totalGrades/totalCredits,
		score = totalGrades * (totalCredits>16 ? 16/totalCredits : 1);
		
		$scope.infoClass = $scope.cumGPA < 1.75? "danger" : 
				score >= 48? "success" :
				false;
				
		$scope.info = !!$scope.infoClass;
		
		if ($scope.info) {
			$scope.infoTitle = $scope.infoClass === "danger"? 
								"Unfortunately :'(":
								"Congratulation!";
							
			
			$scope.infoMassage = $scope.infoClass === "danger"? 
								"you won't receive your monthly remuneration during next Semester.":
								"you will receive (إن شاء الله) " +
								(score >=60 ? "First" :
								 score >=56 ? "Second" :
								 "Third" )+
								" Honor certificate and money.";
		}
	};
	
}
