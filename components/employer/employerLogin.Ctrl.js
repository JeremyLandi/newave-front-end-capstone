"use strict";

Newave.controller("EmployerLoginCtrl", [
	"$scope",
	"authenticate",
  "$location",

	function($scope, Authenticate, $location) {

		$scope.displayLogin = true;
		$scope.displayLogout = false;
		
		$scope.employer = {
			firstName: "",
			lastName: "",
			email: "",
			password: "",
			name: "",
			description: "",
			location: "",
			isEmployer: true,
			image: ""
		};

		//photo uploader
		$scope.uploadPic = (info) => {
			upload.base64DataUrl(info)
	      .then(
	      	(resp) => {
			      $scope.employer.image =  resp;
	      	}
      	);
		}

		$scope.register = function(employer) {
			const email = employer.email;
			const password = employer.password;		
			Authenticate.createUser(email, password)
			.then(
				() => Authenticate.loginUser(employer.email, employer.password),
				(error) => console.log("could not register employer")
			).then(
				() => { Authenticate.createEmployerProfile(employer), 
					$location.path('/employer/');	
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
					$location.path('/employer/');		
					$scope.displayLogin = false;
					$scope.displayLogout = true;
					console.log("successfully logged in");
				},
				(error) => console.log("could not authenticate employer")
				);
		}
	}	

]);

