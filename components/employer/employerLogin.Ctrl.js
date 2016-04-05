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


		$scope.uploadPic = (info) => {
			upload.base64DataUrl(info)
	      .then(
	      	(resp) => {
	      		console.log("resp", resp);
			      $scope.employer.image =  resp;
	      	}
      	);
		}

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
					$location.path('/managePost/{{job.id}}');	
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
					$location.path('/managePost/{{job.id}}');		
					$scope.displayLogin = false;
					$scope.displayLogout = true;
					console.log("successfully logged in");
				},
				(error) => console.log("could not authenticate employer")
				);
		}
	}	

]);

