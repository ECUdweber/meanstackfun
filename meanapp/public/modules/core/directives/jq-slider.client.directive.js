'use strict';

angular.module('core').directive('jqSlider', [
	function() {
	  return {
	    restrict: 'A',
	    scope: {
	      'model': '='
	    },
	    link: function(scope, elem, attrs) {
	      var $slider = $(elem);

	      $slider.slider({
	        value: +scope.model,
	        slide: function (event, ui) {
	          scope.$apply(function() {
	            scope.model = ui.value;
	          });
	        }
	      });
	      
	      scope.$watch('model', function(newVal) {
	        $slider.slider('value', newVal);
	      });
	    }
	  };
	}
]);