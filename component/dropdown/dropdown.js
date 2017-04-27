/**
 * API
 * <a-dropdown></a-dropdown>
 * +----------+--------------------------------+---------+-------+
 * |
**/
angular('dropdown',['util'])
.directive('aDropdown',['dom','$compile',function(dom,$compile){
	return {
		restrcit:'AE',
		replace:true,
		transclude:true,
		scope:{
			trigger:'@',
			overlay:'=',
			getPopupContainer:'&',
			visible:"=",
			onvisible:'&',
			placement:'@'
		},
		template:'<div style="display:inline-block;" ng-transclude></div>',
		link: function(scope,element,attrs){
			var dropdown = '<div style="position: absolute; top: 0px; left: 0px; width: 100%;">\
								<div class="ant-dropdown ant-dropdown-placement-" ng-show="isShow" ng-style="dropdownSty">\
									<ul class="ant-dropdown-menu ant-dropdown-menu-vertical ant-dropdown-menu-light ant-dropdown-menu-root">\
										<li ng-repeat="item in overlay" class="ant-dropdown-menu-item" role="menuitem">\
											<a ng-href="item.href" target="{{item.target}}"></a>\
										</li>\
									</ul>\
								</div>\
							</div>';
			var container = scope.getPopupContainer();

			$compile(dropdown)(scope);
			angular.element(container).append($compile(dropdown)(scope));
		}

	}
}])