"use strict";

Newave.factory('profileFactory', [
	'$q', 
	'$http',
	'authenticate',
	'$location',

	function($q, $http, authenticate, $location) {

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

		getProfile.updateEmployerProfile = (profile) => {
			return $q((resolve, reject) => {
				$http.put(`https://frontend-capstone.firebaseio.com/employerProfiles/${profile.id}.json`, JSON.stringify(profile))
				.success(
					newEmployerData => {
						resolve(newEmployerData);
						$location.path('/managePost/{{job.id}}')
						console.log("success", newEmployerData);
					},
					error => reject(error)
				)
			})
		}

		getProfile.getApplicantProfile = () => {
			let currentUser = authenticate.getCurrentUser();
			return $q((resolve, reject) =>
				$http.get(`https://frontend-capstone.firebaseio.com/applicantProfiles.json?orderBy="uid"&equalTo="${currentUser.uid}"`)
				.success(
					applicantData => {
						resolve(applicantData);
						console.log("success", applicantData);
					},
					error => reject(error)
				)
			)
		}

		getProfile.updateApplicantProfile = (profile) => {
			console.log("profile", profile);
			return $q((resolve, reject) => {
				$http.put(`https://frontend-capstone.firebaseio.com/applicantProfiles/${profile.id}.json`, JSON.stringify(profile))
				.success(
					newApplicantData => {
						resolve(newApplicantData);
						$location.path('/applicant')
						console.log("success", newApplicantData);
					},
					error => reject(error)
				)
			})
		}

	return getProfile;
}])





