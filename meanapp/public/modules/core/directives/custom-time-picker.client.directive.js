'use strict';

angular.module('core').directive('customTimePicker', [
	function() {
	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    link: function (scope, elem, attrs, ngModelCtrl) {

	      var updateModel = function (dateText) {
	        scope.$apply(function () {
	          ngModelCtrl.$setViewValue(dateText);
	        });
	      };

	      var options = {
	        'scrollDefault': 'now',
	        onSelect: function (dateText) {
	          updateModel(dateText);
	        }
	      };

	      elem.timepicker(options);
	    }
	  };
	}
]);