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
		var totalGrades = 0,
			totalCredits = $scope.getTotalCredits(),
			score, theGPA;
		
		for (var i=0, l=$scope.courses.length; i<l; i++){
			totalGrades += ($scope.courses[i].grade * $scope.courses[i].credits);
		}
		
		theGPA = Math.round(totalGrades/($scope.getTotalCredits())*1000)/1000 || 0;
		
		score = totalGrades * (totalCredits>16 ? 16/totalCredits : 1);
		
		$scope.infoClass = theGPA < 1.75? "danger" : 
				score >= 48? "success" :
				false;
				
		$scope.info = !!$scope.infoClass;
		
		if ($scope.info) {
			$scope.infoTitle = $scope.infoClass === "danger"? 
								"Unfortunately :'(":
								"Congratulation!";
							
			
			$scope.infoMassage = $scope.infoClass === "danger"? 
								"you won't receive your monthly remuneration during next Semester.":
								"you will receive " +
								(score >=60 ? "First" :
								 score >=56 ? "Second" :
								 "Third" )+
								" Honor money.";
		}
		
		
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
}
