angular.module('icon',[])
.directive('icon',function(){
	return {
		restrict: 'E',
		replace: true,
		scope:{
			type:'@',
			spin:'@'
		},
		template:'<i class="anticon {{spin==\'true\'?\'anticon-spin\':\'\'}} anticon-{{type}}"></i>'
	}
})