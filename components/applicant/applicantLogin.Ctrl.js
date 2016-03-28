"use strict";

Newave.controller("ApplicantLoginCtrl", [
	"$scope",
	"authenticate",
  "$location",

	function($scope, authenticate, $location) {

		$scope.displayLogin = true;
		$scope.displayLogout = false;

		$scope.user = {
			firstName: "",
			lastName: "",
			email: "",
			number: "",
			password: "",
			currentEmpl: "",
			jobTitle: "",
			currentJobLocation: "",
			education: "",
			school: "",
			concentration: "",
			schoolLocation: ""
		};

		$scope.register = function(user) {
			const email = user.email;
			const password = user.password;		
			console.log("user", user);
			authenticate.createUser(email, password)
			.then(
				() => authenticate.loginUser(user.email, user.password),
				(error) => console.log("could not register user")
			).then(
				() => { authenticate.createApplicantProfile(user), 
				$location.path('/applicant');
				console.log("successfully registered")
			},
			(error) => console.log("could not authenticate user")
			);
		}
		
		$scope.login = function(user) {
			authenticate.loginUser(user.email, user.password)
			.then(
				() => {
					$scope.displayLogin = false;
					$scope.displayLogout = true;
					$location.path('/applicant');
					console.log("successfully logged in");
				},
				(error) => console.log("could not authenticate user")
				);
		}
  }
]);

