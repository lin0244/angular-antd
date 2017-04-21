angular.module('icon',[])
.directive('icon',function(){
	return {
		restrict: 'AE',
		replace: true,
		scope:{
			type:'@',
			spin:'='
		},
		template:'<i ng-class="iconCls"></i>',
		link:function(scope){
			var prefixCls = 'anticon';
			scope.iconCls = {};
			scope.iconCls[prefixCls] = true;
			scope.iconCls[prefixCls + '-' + scope.type] = scope.type;
			scope.iconCls[prefixCls + '-spin'] = scope.spin;
		}
	}
})