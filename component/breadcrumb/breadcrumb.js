/*
 * API
 * <a-breadcrumb-item></a-breadcrumb-item>
 * +----------+----------------------+--------+-----------+
 * | attrs    | discript             | type   | default   |
 * +----------+----------------------+--------+-----------+
 * | href     | url of the item      | string | -         |
 * +----------+----------------------+--------+-----------+
 * | separator| custom separator     | string | /         |
 * +----------+----------------------+--------+-----------+
 * | icon     | icon of the item     | string | -         |
 * +----------+----------------------+--------+-----------+
**/

angular.module('breadcrumb',[])
.directive('aBreadcrumb',function(){
	return {
		restrict:'AE',
		replace:true,
		transclude:true,
		template:'<div class="ant-breadcrumb" ng-transclude></div>'
	}
})
.directive('aBreadcrumbItem',function(){
	return {
		restrict:'AE',
		replace:true,
		transclude:true,
		scope:{
			href:'@',
			separator:'@',
			icon:'@'
		},
		template:'<span>\
					<span class="ant-breadcrumb-link" ng-if="!!href">\
						<a ng-href="url">\
							<i class="anticon" ng-class="\'anticon-\'+icon" ng-if="!!icon"></i>\
							<span ng-transclude></span>\
						</a>\
					</span>\
					<span class="ant-breadcrumb-link" ng-if="!href">\
						<i class="anticon" ng-class="\'anticon-\'+icon" ng-if="!!icon"></i>\
						<span ng-transclude></span>\
					</span>\
					<span class="ant-breadcrumb-separator" ng-bind="!!separator?separator:\'\/\'">\\</span>\
				  </span>'
	}
})