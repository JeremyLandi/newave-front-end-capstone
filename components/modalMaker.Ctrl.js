// "use strict";

// Newave.controller('ModalCtrl', function ($scope, $uibModal, $log) {

//   $scope.animationsEnabled = true;

//   $scope.open = function (PostId) {
//     var modalInstance = $uibModal.open({
//       animation: $scope.animationsEnabled,
//       templateUrl: 'myModalContent.html',
//       controller: 'ModalInstanceCtrl',
//       resolve: {
//         items: function () {
//           return $scope.PostId;
//         }
//       }
//     });
//   };

//   $scope.toggleAnimation = function () {
//     $scope.animationsEnabled = !$scope.animationsEnabled;
//   };

// });

// // Please note that $uibModalInstance represents a modal window (instance) dependency.
// // It is not the same as the $uibModal service used above.

// Newave.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance) {

//   $scope.ok = function () {
//     $uibModalInstance.close();
//   };

//   $scope.cancel = function () {
//     console.log("canceled");
//     $uibModalInstance.dismiss('cancel');
//   };
// });