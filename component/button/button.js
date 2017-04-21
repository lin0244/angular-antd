/**
 * @API
 * <a-button>
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
 * | disabled | set button disabled.                    | -       | -       |
 * +----------+-----------------------------------------+---------+---------+
 *
 * <button-group>
 * +----------+-----------------------------------------+---------+---------+
 * | size     | set button's size.'small','large' or not| string  | default |
 * +----------+-----------------------------------------+---------+---------+
 * @example
 * <a-button type="primary"></a-button> : a primary button
 * <a-button loading="true"></a-button> : a loading button
 * 
 * create by Jiang on April 21 2017
 */

angular.module('button',[])
.constant('btnSize',{
	small: 'sm',
	large: 'lg'
})
.directive('aButton',['$timeout','btnSize',function($timeout,btnSize){
	return{
		restrict:'AE',
		transclude: true,
		replace: true,
		scope:{
			type:"@",
			htmltype:"@",
			icon:'@',
			shape:'@',
			size:'@',
			loading:'=',
			ghost:'=',
			style:'@'
		},
		template:'<button ng-click="click()" ng-style="style" ng-class="btnCls" type="{{htmltype}}" ng-disabled="disabled">\
					<i class="anticon anticon-spin anticon-loading" ng-if="loading"></i>\
					<i ng-class="iconCls" ng-if="!loading && icon"></i>\
					<span ng-transclude ng-if="shape==\'circle\'?false:true"></span>\
				</button>',
		link: function(scope,element,attrs){
			var prefixCls = 'ant-btn';
			scope.iconCls = 'anticon anticon-' + scope.icon;
			scope.clicked = false;
			scope.btnCls = {};

			if('disabled' in attrs){
				scope.disabled = true;
			}

			scope.btnCls[prefixCls] = true;
			scope.btnCls[prefixCls + '-' + scope.type] = scope.type;
			scope.btnCls[prefixCls + '-' + btnSize[scope.size]] = scope.size;
			scope.btnCls[prefixCls + '-' + scope.shape] = scope.shape;
			scope.btnCls[prefixCls + '-clicked'] = scope.clicked;
			scope.btnCls[prefixCls + '-background-ghost'] = scope.ghost;
			scope.click = function(){
				scope.clicked = true;
				if(scope.clearTimeout){
					clearTimeout();
				}
				scope.clearTimeout = $timeout(function(){
					scope.clicked = false;
				},500);
			}
			scope.$watch('clicked',function(newVal){
				scope.btnCls[prefixCls + '-clicked'] = newVal;
			});
		}
	}
}])
.directive('buttonGroup',['btnSize',function(btnSize){
	return {
		restrict: 'AE',
		replace: true,
		transclude: true,
		scope:{
			size:"@"
		},
		template:'<div ng-class="btnGroupCls" ng-transclude></div>',
		link: function(scope){
			var prefixCls = 'ant-btn-group';
			scope.btnGroupCls = {};
			scope.btnGroupCls[prefixCls] = true;
			scope.btnGroupCls[prefixCls + '-' + btnSize[scope.size]] = scope.size;
		}
	}
}])