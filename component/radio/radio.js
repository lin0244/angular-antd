angular.module('radio',[])
.directive('radio',function(){
	return{
		restrict:'E',
		replace: true,
		transclude: true,
		scope:{
			checked:"=",
			defaultchecked:'@',
			value:'@',
			model:'=bind'
		},
		template:'<label class="ant-radio-wrapper">\
					<span class="ant-radio {{radioClass}}">\
						<span class="ant-radio-inner"></span>\
						<input type="radio" value="{{value}}" class="ant-radio-input" ng-model="$parent.$parent.value">\
					</span>\
					<span ng-transclude></span>\
				 </label>',
		link: function(scope,element,attrs){
			scope.$watch('$parent.$parent.value',function(newVal){
				if(newVal == scope.value){
					scope.radioClass = "ant-radio-checked";
				}
				else{
					scope.radioClass = "";
				}
			})
		}
	}
})
//value:radioGroup 的值，onchange:选项变更时回调函数，defaultvalue:默认值
.directive('radioGroup',function(){
	return {
		restrict:'E',
		replace: true,
		transclude: true,
		scope:{
			defaultvalue:"@",
			value:'=?',
			onchange:'@'
		},
		template:'<div class="ant-radio-group" ng-transclude></div>',
		link:function(scope){
			if(scope.defaultvalue){
				scope.value = scope.defaultvalue;
			}
		}

	}
})