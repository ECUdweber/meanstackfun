'use strict';

// Goods controller
angular.module('goods').controller('GoodsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Goods',
	function($scope, $stateParams, $location, Authentication, Goods) {
		$scope.authentication = Authentication;
		$scope.good = {};

		$scope.bidValue = 1;

		// Create new Good
		$scope.create = function() {
			// Create new Good object
			var good = new Goods ({
				name: this.name,
				description: this.description
			});

			// Redirect after save
			good.$save(function(response) {
				$location.path('goods/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.description = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.bidOnItem = function() {
			$location.path('goods/' + $scope.good._id + '/bid');
		};

		$scope.submitBid = function() {
			console.log('Submitting your bid');
		}

		// Remove existing Good
		$scope.remove = function(good) {
			if ( good ) { 
				good.$remove();

				for (var i in $scope.goods) {
					if ($scope.goods [i] === good) {
						$scope.goods.splice(i, 1);
					}
				}
			} else {
				$scope.good.$remove(function() {
					$location.path('goods');
				});
			}
		};

		// Update existing Good
		$scope.update = function() {
			var good = $scope.good;

			good.$update(function() {
				$location.path('goods/' + good._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Goods
		$scope.find = function() {
			$scope.goods = Goods.query();
		};

		// Find existing Good
		$scope.findOne = function() {
			$scope.good = Goods.get({ 
				goodId: $stateParams.goodId
			});
		};
	}
]);