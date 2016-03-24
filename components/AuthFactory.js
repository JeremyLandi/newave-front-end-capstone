'use strict';

Newave.factory('authenticate', function($q, $http) {
	
	let firebaseRef = new Firebase('https://frontend-capstone.firebaseio.com/');
	
	let currentUser = null;

	let Authenticate = {};

	Authenticate.isAuthenticated = () => {
		let authData = firebaseRef.getAuth();
		console.log(authData);
		if (!authData) {
			return false;
		} else {
			return true;
		}
	}

	Authenticate.createUser = (user, pass) => {
		return $q((resolve, reject) => {
			return firebaseRef.createUser({
				email			: user,
				password  : pass				
			}, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);					
				} else {
					console.log(user);
					console.log("Successfully created user account with uid:", userData.uid);
					
					return resolve(userData);	
				}
			});
		});
	}

	Authenticate.createEmployerProfile = (employer) => {
		employer.uid = currentUser.uid;
		console.log("ref", currentUser.uid);
		console.log("createEmployerProfile", employer);
		return $q((resolve, reject) => {
			$http.post("https://frontend-capstone.firebaseio.com/employerProfiles.json", employer);
		})
	}

	Authenticate.createApplicantProfile = (applicant) => {
		applicant.uid = currentUser.uid;
		console.log("ref", currentUser.uid);
		console.log("createApplicantProfile", applicant);
		return $q((resolve, reject) => {
			$http.post("https://frontend-capstone.firebaseio.com/applicantProfiles.json", applicant);
		})
	}

	Authenticate.loginUser = (user, pass) => {
		return $q(function(resolve, reject) {
			firebaseRef.authWithPassword({
				email: user,
				password: pass
			}, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated Successfully with payload", authData);
					currentUser = authData;
					return resolve(authData);
				}
			},
			{
				// remember: "sessionOnly"
			});
		});
	}

	Authenticate.getCurrentUser = () => {
		console.log("currentUser", currentUser);
		return currentUser;
	}

	Authenticate.logoutUser = () => firebaseRef.unauth();
	return Authenticate;
});