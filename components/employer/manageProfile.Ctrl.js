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

	let currentProfile = {
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		name: "",
		description: "",
		location: ""
	}

	profileFactory.getEmployerProfile()
	.then(
		employerData => {
			console.log("employerData", employerData);
			for (let currentEmployerObj in employerData) {
				employerData[currentEmployerObj].currentEmployerObj =currentEmployerObj;
				$scope.profiles.push(employerData[currentEmployerObj]);
				// $scope.profile = employerData;
				console.log("$scope.profile", $scope.profiles);
				// console.log("employerData[currentEmployerObj]", employerData[currentEmployerObj]);
		}
			
		})
	
	



}])

