"use strict";

Newave.controller('ManageProfileCtrl', [
	'$scope', 
	'$http',
	'$q',
	'$location',
	'profileFactory',
	'jobFactory',

	function($scope, $http, $q, $location, profileFactory,jobFactory) {
	
	$scope.profiles = [];

	$scope.employerID = null;
	$scope.profile = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		name: "",
		description: "",
		location: "",
		updatedCompany: ""
	}



	// GETS EMPLOYER DATA BASED ON LOGIN
	profileFactory.getEmployerProfile()
	.then(
		employerData => {
			console.log("employerData", employerData);
			for (let key in employerData) {
				employerData[key].id = key;
				console.log("employerData[key].name", employerData[key].name);
			employerData[key].updatedCompany = jobFactory.logoApiConverter(employerData[key].name)

				$scope.profiles.push(employerData[key]);
			}			
			$scope.employerID = $scope.profiles[0].key;
			console.log("$scope.profile", $scope.profiles[0].key);
		})

	$scope.updateProfile = (profile) => {
		console.log("update", profile);
		profileFactory.updateEmployerProfile(profile);
	}
}])

