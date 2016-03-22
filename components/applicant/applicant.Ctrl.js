// "use strict";

// Newave.controller("ApplicantCtrl", [
// 	"$scope",
// 	"authenticate",
//   "$location",

// 	function($scope, Authenticate, $location) {

// 		$scope.user = {
// 			uid: "",
// 			firstName: "",
// 			lastName: "",
// 			email: "",
// 			password: "",
// 			currentEmpl: "",
// 			jobTitle: "",
// 			currentJobLocation: "",
// 			education: "",
// 			school: "",
// 			concentration: "",
// 			schoolLocation: ""
// 		};

// 		$scope.register = function(user) {
// 			const email = user.email;
// 			const password = user.password;
// 			console.log("user", user);
// 			Authenticate.createUser(email, password)
// 			.then(
// 				() => Authenticate.loginUser(user.email, user.password),
// 				(error) => console.log("could not register user")
// 			).then(
// 				() => Authenticate.createUserProfile(user.email, user.password, user.firstName), 
// 				// $location.path('user/profile');
// 				// console.log("successfully registered")
			
// 			(error) => console.log("could not authenticate user")
// 			);
// 		}
		
// 		$scope.login = function(user) {
// 			Authenticate.loginUser(user.email, user.password)
// 			.then(
// 				() => {
// 					// $location.path('user/profile');
// 				console.log("successfully logged in");
// 				},
// 				(error) => console.log("could not authenticate user")
// 				);
// 		}
	
// 		// switches to signup
// 		$scope.signupToggle = function() {
// 			console.log("switch");
// 	  	$scope.signup = !$scope.signup;
// 		}

// 		// builds out education options 
// 		$scope.selectEdu = [{
// 			value: 'highSchool',
//     	label: 'High School'
//   	}, 
//   	{
//     	value: 'bachelor',
//     	label: 'Bachelor Degree'
// 		},
// 		{
//     	value: 'master',
//     	label: 'Master Degree'
// 		},
// 		{
//     	value: 'doctorate',
//     	label: 'Doctorate Degree'
// 		},
// 		{
//     	value: 'professional',
//     	label: 'Professional Degree'
// 		}]	
//   }
















// ]);

