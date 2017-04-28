/**
 * API
 * <a-dropdown></a-dropdown>
 * +----------+--------------------------------+---------+-------+
 * |
**/
angular.module('dropdown',['util','ngAnimate'])
// .animation('.ant-dropdown',['$timeout',function(){
// 	return {
// 		beforeAddClass: function(element,className,done){
// 			element.addClass('slide-down-leave slide-down-leave-active');

// 		},
// 		addClass:function(element,className,done){
// 			alert('222');
// 			element.removeClass('slide-down-leave slide-down-leave-active');
// 			done();
// 		},
// 		beforeRemoveClass:function(element,className,done){
// 			element.addClass('slide-down-enter slide-down-enter-active');
// 			done();
// 		},
// 		removeClass:function(element,className,done){
// 			element.removeClass('slide-down-enter slide-down-enter-active');
// 			done();
// 		}
// 	}
// }])
.directive('aDropdown',['dom','$compile','$timeout','$document','$animate',function(dom,$compile,$timeout,$document,$animate){
	return {
		restrict:'AE',
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
								<div class="ant-dropdown" ng-class="dropdownCls" ng-show="isShow" ng-style="dropdownSty">\
									<ul class="ant-dropdown-menu ant-dropdown-menu-vertical ant-dropdown-menu-light ant-dropdown-menu-root">\
										<li ng-repeat="item in overlay" class="ant-dropdown-menu-item" role="menuitem">\
											<a ng-href="item.href" target="{{item.target}}"></a>\
										</li>\
										<li class="ant-dropdown-menu-item" role="menuitem" aria-selected="false"><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a></li>\
										<li class="ant-dropdown-menu-item" role="menuitem" aria-selected="false"><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a></li>\
										<li class="ant-dropdown-menu-item" role="menuitem" aria-selected="false"><a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">1st menu item</a></li>\
									</ul>\
								</div>\
							</div>';
			var placements = ['bottomLeft','bottomCenter','bottomRight','topLeft','topCenter','TopRight'];
			var container = scope.getPopupContainer() || document.body;
			if(scope.placement in placements){
				scope.dropdownCls = 'ant-dropdown-placement-' + scope.placement;
				setPosition(scope.placement);
			}
			else{
				scope.dropdownCls = 'ant-dropdown-placement-bottomLeft';
				setPosition('bottomLeft');
			}

			// Compile dropmenu template and append to the container.
			var dropdown = $compile(dropdown)(scope);
			angular.element(container).append(dropdown);

			// Bind hover event to dropdown and dropmune.
			if(scope.trigger === "click"){
				element.on('click',showDropMenu);
				$document.on('click',function(){
					scope.isShow = false;
					scope.$digest();
				});
			}
			else{
				element.on('mouseenter',showDropMenu);
				dropdown.on('mouseenter',showDropMenu);

				element.on('mouseleave',hideDropMenu);
				dropdown.on('mouseleave',hideDropMenu);
			}

			function showDropMenu(){
				if(scope.dropMenuTimeout){
					$timeout.cancel(scope.dropMenuTimeout);
				}
				scope.isShow = true;
				scope.$digest();
			}
			function hideDropMenu(){
				scope.dropMenuTimeout = $timeout(function(){
					scope.isShow = false;
				},200);
			}

			// Set position of dropmenu.
			function setPosition(placement){
				scope.dropdownSty = dom.calcPosition(element[0],container,placement);
			}
		}
	}
}])