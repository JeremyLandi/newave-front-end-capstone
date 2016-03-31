"use strict";

let Newave = angular.module("NewaveApp", ["ngRoute", "firebase", "ngFileUpload"]);

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
      when("/employer", {
        templateUrl: "components/employer/partials/employerMain.Tmpl.html",
        controller: "EmployerMainCtrl",
        resolve: { isAuth }
      }).
      when("/newPost", {
        templateUrl: "components/employer/partials/employerPost.Tmpl.html",
        controller: "EmployerPostCtrl",
        resolve: { isAuth }
      }).
       when("/employer", {
        templateUrl: "components/employer/partials/managePost.Tmpl.html",
        controller: "ManagePostCtrl",
        resolve: { isAuth }
      }).
      when("/managePost/:postID", {
        templateUrl: "components/employer/partials/managePost.Tmpl.html",
        controller: "ManagePostCtrl",
        resolve: { isAuth }
      }).      
      when("/editPost/:postID", {
        templateUrl: "components/employer/partials/editPost.Tmpl.html",
        controller: "EditPostCtrl",
        resolve: { isAuth }
      }).
      when("/manageApplicant/:postID", {
        templateUrl: "components/employer/partials/manageApplicant.Tmpl.html",
        controller: "ManageApplicantCtrl",
        resolve: { isAuth }
      }).      
      when("/manageProfile", {
        templateUrl: "components/employer/partials/manageProfile.Tmpl.html",
        controller: "ManageProfileCtrl",
        resolve: { isAuth }
      }).
      when("/manageApplicantProfile", {
        templateUrl: "components/applicant/partials/manageApplicantProfile.Tmpl.html",
        controller: "ManageApplicantProfileCtrl",
        resolve: { isAuth }
      }).
      when("/applicant", {
        templateUrl: "components/applicant/partials/applicantMain.Tmpl.html",
        controller: "ApplicantMainCtrl",
        resolve: { isAuth }
      }).
      when("/appliedJobs", {
        templateUrl: "components/applicant/partials/manageAppliedJobs.Tmpl.html",
        controller: "ManageAppliedJobsCtrl",
        resolve: { isAuth }
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
