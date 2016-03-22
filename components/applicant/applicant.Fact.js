'use strict';

Newave.factory('authenticateUser', function($q, $http) {
	
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

	Authenticate.createUserProfile = (user) => {
		user.uid = authData.uid;
		console.log("ref", authData.uid);
		console.log("createUserProfile", user);
		return $q((resolve, reject) => {
			$http.post("https://frontend-capstone.firebaseio.com/userProfiles.json", user);
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