module common.directives {
	export function topBar(): angular.IDirective {
		return {
			templateUrl: 'common/directives/top-bar-directive.html',
			restrict: 'E'
		};
	}
}