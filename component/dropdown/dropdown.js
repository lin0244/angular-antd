/**
 * API
 * <a-dropdown></a-dropdown>
 * +----------+--------------------------------+---------+-------+
 * |
**/
angular('dropdown',['util'])
.directive('aDropdown',['dom',function(dom){
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
			var dropdown = ''
		}

	}
}])