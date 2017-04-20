angular.module('checkbox',[])
.directive('checkbox',function(){
	return{
		restrict:'E',
		replace: true,
		transclude: true,
		scope:{
			checked:'=?',
			defaultchecked:'@',
			indeterminate:'=?'
		},
		template:'<label class="ant-checkbox-wrapper">\
					<span class="ant-checkbox {{checkClass}}">\
						<input type="checkbox" ng-model="checked" class="ant-checkbox-input">\
						<span class="ant-checkbox-inner"></span>\
					</span>\
					<span ng-transclude></span>\
				</label>',
		link:function(scope){
			scope.$watch('checked',function(newVal){
				if(newVal){
					scope.checkClass = "ant-checkbox-checked";
				}
				else{
					scope.checkClass = ""; 
				}
			});
			scope.$watch('indeterminate',function(newVal){
				if(newVal && !scope.checked){
					scope.checkClass = "ant-checkbox-indeterminate";
				}
				else{
					scope.checkClass = "";
				}
			})
		}
	}
})
// .directive('checkboxGroup',function(){
// 	return {
// 		restrict: 'E',
// 		replace: true,
// 		template:'<div>\
// 					<checkbox ng-repeat="checkbox in checkboxes">{{checkbox.label}}</checkbox>\
// 				</div>'
// 	}
// });