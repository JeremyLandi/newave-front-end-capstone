"use strict";

Newave.factory('profileFactory', [
	'$q', 
	'$http',
	'authenticate',

	function($q, $http, authenticate) {

		let getProfile = {};

		getProfile.getEmployerProfile = () => {
			let currentUser = authenticate.getCurrentUser();
			return $q((resolve, reject) =>
				$http.get(`https://frontend-capstone.firebaseio.com/employerProfiles.json?orderBy="uid"&equalTo="${currentUser.uid}"`)
				.success(
					employerData => {
						resolve(employerData);
						console.log("success", employerData);
					},
					error => reject(error)
				)
			)
		}

		getProfile.updateEmployerProfile = (employerID, employer) => {
			let currentEmployer = authenticate.getCurrentUser();

			return $q((resolve, reject) => {
				$http.put(`"https://frontend-capstone.firebaseio.com/employerProfiles/${employerID}.json"`, employer)
			})
		}

	return getProfile;
}])





