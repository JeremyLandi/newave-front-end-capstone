"use strict";

Newave.controller("EmployerLoginCtrl", [
	"$scope",
	"authenticate",
  "$location",

	function($scope, Authenticate, $location) {

		$scope.displayLogin = true;
		$scope.displayLogout = false;
		
console.log("$scope.displayLogin", $scope.displayLogin);
		$scope.employer = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			name: "",
			description: "",
			location: ""
		};

		$scope.register = function(employer) {
			const email = employer.email;
			const password = employer.password;		
			console.log("employer", employer);
			Authenticate.createUser(email, password)
			.then(
				() => Authenticate.loginUser(employer.email, employer.password),
				(error) => console.log("could not register employer")
			).then(
				() => { Authenticate.createEmployerProfile(employer), 
					$location.path('/');	
					$scope.displayLogin = false;
					$scope.displayLogout = true;
					console.log("successfully registered")
			},
			(error) => console.log("could not authenticate employer")
			);
		}
		
		$scope.login = function(employer) {
			Authenticate.loginUser(employer.email, employer.password)
			.then(
				() => {
					$location.path('/');		
					$scope.displayLogin = false;
					$scope.displayLogout = true;
					console.log("successfully logged in");
				},
				(error) => console.log("could not authenticate employer")
				);
		}
	}	

]);

