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
 * ant-btn ant-btn-
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
			style:'@',	//it's ok.
			onclick:'&'
		},
		template:'<button ng-click="click()" ng-style="style" ng-class="btnCls" type="{{htmlType}}">\
					<i class="anticon anticon-spin anticon-loading" ng-if="loading==\'true\'"></i>\
					<i class="anticon anticon-{{icon}}" ng-if="(!(loading==\'true\')) && !!icon"></i>\
					<span ng-transclude ng-if="shape==\'circle\'?false:true"></span>\
				</button>',
		link: function(scope,element,attrs){
			var prefixCls = 'ant-btn';
			var btnSize = {large:'lg',small:'sm'};
			scope.clicked = false;
			scope.btnCls = {};
			scope.btnCls[prefixCls] = true;
			scope.btnCls[prefixCls + '-' + scope.type] = scope.type;
			scope.btnCls[prefixCls + '-' + btnSize[scope.size]] = scope.size;
			scope.btnCls[prefixCls + '-' + scope.shape] = scope.shape;
			scope.btnCls[prefixCls + '-clicked'] = scope.clicked;
			scope.btnCls[prefixCls + '-background-ghost'] = scope.ghost;
			scope.click = function(){
				scope.clicked = true;
				scope.clearTimeout = $timeout(function(){
					scope.clicked = false;
				},500);
				console.log(scope.btnCls);
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