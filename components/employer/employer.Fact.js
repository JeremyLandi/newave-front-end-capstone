'use strict';

Newave.factory('authenticate', function($q, $http) {
	
	let firebaseRef = new Firebase('https://frontend-capstone.firebaseio.com/');
	
	let authData = firebaseRef.getAuth();

	let Authenticate = {};

	Authenticate.isAuthenticated = () => {
		console.log(authData);
		if (!authData) {
			return false;
		} else {
			return true;
		}
	}

	Authenticate.createUser = (employer, pass) => {
		return $q((resolve, reject) => {
			return firebaseRef.createUser({
				email			: employer,
				password  : pass				
			}, function(error, employerData) {
				if (error) {
					console.log("Error creating employer:", error);					
				} else {
					console.log(employer);
					console.log("Successfully created employer account with uid:", employerData.uid);
					
					return resolve(employerData);	
				}
			});
		});
	}

	Authenticate.createEmployerProfile = (employer) => {
		employer.uid = authData.uid;
		console.log("ref", authData.uid);
		console.log("createEmployerProfile", employer);
		return $q((resolve, reject) => {
			$http.post("https://frontend-capstone.firebaseio.com/employerProfiles.json", employer);
		})
	}

	Authenticate.loginUser = (employer, pass) => {
		return $q(function(resolve, reject) {
			firebaseRef.authWithPassword({
				email: employer,
				password: pass
			}, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated Successfully with payload", authData);
					return resolve(authData);
				}
			},
			{
				remember: "sessionOnly"
			});
		});
	}

	Authenticate.logoutUser = () => firebaseRef.unauth();
	return Authenticate;
});