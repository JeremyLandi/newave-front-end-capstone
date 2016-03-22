"use strict";

Newave.controller("NavCtrl", [
	"$scope",

	function($scope) {	

		// switches to signup
		$scope.signupToggle = function() {
	  	$scope.signup = !$scope.signup;
		}

		// switches to applicant/employer
		$scope.userToggle = function(str) {
			console.log(str);
			console.log("switch user");
			if (str === "applicant") {
		  	$scope.applicant = true;
			}
			else {
				$scope.applicant = false;
			}
			console.log("$scope.applicant", $scope.applicant);
		}
	}
]);		