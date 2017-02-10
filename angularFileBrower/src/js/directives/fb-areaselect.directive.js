/*
 * JQuery areaSelect v0.2.1
 * http://www.hiekn.com/
 *
 * Copyright (c) 2015 sofia
 *
 * Licensed same as jquery - MIT License
 * http://www.opensource.org/licenses/mit-license.php
 *
 * email: 451183365@qq.com
 * Date: 2015-10-30
 */
(function (window,angular) {
	'use strict';
	angular.module('fb').directive('fbAreaSelect', [function () {
		return {
			restrict: 'A',
			link: function (scope, el, attr) {
				/**
				 * TODO Area Select function
				 * */
				// console.log(el);
				window.console.log(attr);
			}
		};
	}]);
})(window,angular); 