"use strict";

Newave.controller('ManageApplicantProfileCtrl', [
	'$scope', 
	'$http',
	'$q',
	'$location',
	'profileFactory',
	'jobFactory',

	function($scope, $http, $q, $location, profileFactory,jobFactory) {
	
	$scope.profiles = [];
	$scope.applicantID = null;
	
	$scope.profile = {
		firstName: "",
		lastName: "",
		email: "",
		number: "",
		password: "",
		currentEmpl: "",
		jobTitle: "",
		currentJobLocation: "",
		school: "",
		concentration: "",
		schoolLocation: ""
	}

	// GETS EMPLOYER DATA BASED ON LOGIN
	profileFactory.getApplicantProfile()
	.then(
		applicantData => {
			console.log("applicantData", applicantData);
			for (let key in applicantData) {
				applicantData[key].id = key;
				$scope.profiles.push(applicantData[key]);
			}			
			$scope.applicantID = $scope.profiles[0].id;
		})

	$scope.updateProfile = (profile) => {
		console.log("update", profile);
		profileFactory.updateApplicantProfile(profile);
	}

}])

