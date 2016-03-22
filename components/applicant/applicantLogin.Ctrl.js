"use strict";

Newave.controller("ApplicantLoginCtrl", [
	"$scope",
	"authenticateUser",
  "$location",

	function($scope, AuthenticateUser, $location) {

		$scope.displayLogin = true;
		$scope.displayLogout = false;

		$scope.user = {
			firstName: "",
			lastName: "",
			email: "",
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
			AuthenticateUser.createUser(email, password)
			.then(
				() => AuthenticateUser.loginUser(user.email, user.password),
				(error) => console.log("could not register user")
			).then(
				() => { AuthenticateUser.createUserProfile(user), 
					$location.path('/');
				console.log("successfully registered")
			},
			(error) => console.log("could not authenticate user")
			);
		}
		
		$scope.login = function(user) {
			AuthenticateUser.loginUser(user.email, user.password)
			.then(
				() => {
					$scope.displayLogin = false;
					$scope.displayLogout = true;
					$location.path('/');
					console.log("successfully logged in");
				},
				(error) => console.log("could not authenticate user")
				);
		}
	
		// builds out education options 
		$scope.selectEdu = [{
			value: 'highSchool',
    	label: 'High School'
  	}, 
  	{
    	value: 'bachelor',
    	label: 'Bachelor Degree'
		},
		{
    	value: 'master',
    	label: 'Master Degree'
		},
		{
    	value: 'doctorate',
    	label: 'Doctorate Degree'
		},
		{
    	value: 'professional',
    	label: 'Professional Degree'
		}]	
  }

]);

