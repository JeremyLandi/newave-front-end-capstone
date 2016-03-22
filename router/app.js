"use strict";

let Newave = angular.module("NewaveApp", ["ngRoute", "firebase"]);

let isAuth = (authenticate) => new Promise((resolve, reject) => {
  if (authenticate.isAuthenticated()) {
    console.log("User is authenticated, resolve route promise");
    resolve();
  } else {
    console.log("User is not authenticated, reject route promise");
    reject();
  }
});

Newave.config(["$routeProvider",
	function($routeProvider) {
		$routeProvider.
			when("/", {
        templateUrl: "components/newave.Tmpl.html",
        controller: "NewaveCtrl"
      }).
      when("/applicantLogin", {
				templateUrl: "components/applicant/partials/applicantLogin.Tmpl.html",
				controller: "ApplicantLoginCtrl"
			}).
      when("/applicantSignUp", {
        templateUrl: "components/applicant/partials/applicantSignUp.Tmpl.html",
        controller: "ApplicantLoginCtrl"
      }).
      when("/employerLogin", {
        templateUrl: "components/employer/partials/employerLogin.Tmpl.html",
        controller: "EmployerLoginCtrl"
      }).
      when("/employerSignUp", {
        templateUrl: "components/employer/partials/employerSignUp.Tmpl.html",
        controller: "EmployerLoginCtrl"
      }).
      when("/newPost", {
        templateUrl: "components/employer/partials/employerPost.html",
        controller: "EmployerLoginCtrl"
      }).
			otherwise({
        redirectTo: "/"
      });
}]);

Newave.run([ 
  "$location",

  ($location) => {
    var newaveRef = new Firebase("https://frontend-capstone.firebaseio.com/");

    newaveRef.onAuth(authData => {
      if (!authData) {
        console.log("onAuth detected unauthenticated client");
        $location.path("/");
      }
    });
  }
]);
