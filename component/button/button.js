/**
 * @API
 * +------------------------------------------------------------------------+
 * | attr     | descriptions                            | type    | default |
 * +----------+-----------------------------------------+---------+---------+
 * | type     | primary,dashed,danger                   | string  | -       |
 * +----------+-----------------------------------------+---------+---------+
 * | htmlType | submit,button... html native type attr  | string  | button  |
 * +----------+-----------------------------------------+---------+---------+
 * | icon     | set icon-button type                    | string  | -       |
 * +----------+-----------------------------------------+---------+---------+
 * | shape    | set button's shape.'circle' or not      | string  | -       |
 * +----------+-----------------------------------------+---------+---------+
 * | size     | set button's size.'small','large' or not| string  | default |
 * +----------+-----------------------------------------+---------+---------+
 * | loading  | set button is loading.                  | boolean | false   |
 * +----------+-----------------------------------------+---------+---------+
 * | onclick  | set a click event handler               | function| -       |
 * +----------+-----------------------------------------+---------+---------+
 * | ghost    | ghost button. set background transparent| boolean | false   |
 * +----------+-----------------------------------------+---------+---------+
 * 
 * @example
 * <a-button type="primary"></a-button> : a primary button
 * <a-button loading="true"></a-button> : a loading button
 *
 */

angular.module('button',[])
.directive('aButton',['$timeout',function($timeout){
	return{
		restrict:'AE',
		replace: true,
		transclude: true,
		scope:{
			type:"@",
			htmlType:"@",
			icon:'@',
			shape:'@',
			size:'@',
			loading:'@',
			ghost:'@',
			style:'@'	//it ok.
		},
		template:'<button ng-click="click()" ng-style="style" class="ant-btn ant-btn-{{type}} {{clicked}} {{btnSize[size]}} {{btnShape[shape]}}" type="{{htmlType}}"><i class="anticon anticon-spin anticon-loading" ng-if="loading==\'true\'"></i><i class="anticon anticon-{{icon}}" ng-if="(!(loading==\'true\')) && !!icon"></i><span ng-transclude ng-if="shape==\'circle\'?false:true"></span>\
				</button>',
		link: function(scope,element,attrs){
			console.log(attrs.$normalize());
			scope.btnSize = {large:'ant-btn-lg',small:'ant-btn-sm'};
			scope.btnShape = {circle:'ant-btn-circle ant-btn-icon-only'};
			scope.click = function(){
				scope.clicked = "ant-btn-clicked";
				scope.clearTimeout = $timeout(function(){
					scope.clicked = "";
				},500);
			}
		}
	}
}])
.directive('buttonGroup',function(){
	return {
		restrict: 'E',
		replace: true,
		transclude: true,
		scope:{
			size:"@"
		},
		template:'<div class="ant-btn-group ant-btn-group-{{btnSize[size]}}" ng-transclude></div>',
		link: function(scope){
			scope.btnSize = {large:'lg',small:'sm'};
		}
	}
})