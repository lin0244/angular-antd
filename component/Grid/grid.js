/**
 * API
 * <row>
 * +---------+----------------------------------------------+------------+----------+
 * | attr    | description                                  | type       | default  |
 * +---------+----------------------------------------------+------------+----------+
 * | gutter  | set the grid gutter                          | number     | 0        |
 * +---------+----------------------------------------------+------------+----------+
 * | type    | flex or not                                  | string     |          |
 * +---------+----------------------------------------------+------------+----------+
 * | align   | align.top,middle or bottom. flex only        | string     | top      |
 * +---------+----------------------------------------------+------------+----------+
 * | justify | horizontal align. flex only.                 | string     | start    |
 * +---------+----------------------------------------------+------------+----------+
 *
 * <col>
 * +---------+----------------------------------------------+------------+----------+
 * | attr    | description                                  | type       | default  |
 * +---------+----------------------------------------------+------------+----------+
 * | span    | the count of grid.                           | number     | -        |
 * +---------+----------------------------------------------+------------+----------+
 * | order   | the order of grid.                           | number     | 0        |
 * +---------+----------------------------------------------+------------+----------+
 * | offset  | the offset of grid.                          | number     | 0        |
 * +---------+----------------------------------------------+------------+----------+
 * | xs      | @media <768px.                               | number|obj | -        |
 * +---------+----------------------------------------------+------------+----------+
 * | sm      | @media ≥768px.                               | number|obj | -        |
 * +---------+----------------------------------------------+------------+----------+
 * | md      | @media ≥992px.                               | number|obj | -        |
 * +---------+----------------------------------------------+------------+----------+
 * | lg      | @media ≥1200px.                              | number|obj | -        |
 * +---------+----------------------------------------------+------------+----------+
 * | xl      | @media ≥1600px.                              | number|obj | -        |
 * +---------+----------------------------------------------+------------+----------+
 *
 *
 **/
angular.module('grid',['util'])
.directive('aRow',['reg',function(reg){
	return {
		restrict:'AE',
		replace:true,
		scope:{
			gutter:'@',
			type:'@',
			align:'@',
			justify:'@'
		},
		transclude:true,
		template:'<div ng-class="rowCls" ng-style="rowStyle" ng-transclude></div>',
		controller:function($scope){
			this.gutter = parseInt($scope.gutter || 0);
			this.isFlex = $scope.type == 'flex';
		},
		link:function(scope,ele,attrs,ctrl){
			var prefixCls = 'ant-row';

			updateCls();
			console.log(scope.rowCls);
			attrs.$observe('gutter',function(newVal){
				if(reg.isNumber(newVal)){
					ctrl.gutter = parseInt(scope.gutter || 0);
					if(ctrl.gutter == 0){
						scope.rowStyle = {};
					}
					else{
						scope.rowStyle = {
							'margin-left':'-' + ctrl.gutter / 2 + 'px',
							'margin-right':'-' + ctrl.gutter / 2 + 'px'
						};	
					}
				}
			});
			attrs.$observe('type',function(newVal){
				if(newVal == 'flex'){
					attrs.isFlex = true;
				}
				updateCls();
			});
			attrs.$observe('align',function(newVal){
				if(ctrl.isFlex){
					updateCls();
				}
			});
			attrs.$observe('justify',function(newVal){
				if(ctrl.isFlex){
					updateCls();
				}
			});
			function updateCls(){
				scope.rowCls = {};
				scope.rowCls[prefixCls] = !ctrl.isFlex;
				scope.rowCls[prefixCls + '-flex'] = ctrl.isFlex;
				scope.rowCls[prefixCls + '-flex-' + scope.align] = ctrl.isFlex && scope.align;
				scope.rowCls[prefixCls + '-flex-' + scope.justify] = ctrl.isFlex && scope.justify;
			}
		}

	}
}])
.directive('aCol',['reg',function(reg){
	return {
		restrict:'AE',
		replace:true,
		require:'^^aRow',
		transclude:true,
		scope:{
			span:'@',
			order:'@',
			offset:'@',
			xs:'@',
			sm:'@',
			md:'@',
			lg:'@',
			xl:'@'
		},
		template:'<div ng-class="colCls" ng-style="colStyle" ng-transclude></div>',
		link:function(scope,ele,attrs,ctrl){
			scope.rowCtrl = ctrl;
			attrs.$observe('span',function(newVal){
				if(reg.isNumber(scope.span)){
					scope.colCls="ant-col-" + scope.span;
				}
			})
			scope.$watch('rowCtrl.gutter',function(newVal){
				if(newVal == 0){
					scope.colStyle = {};
				}
				else{
					scope.colStyle = {
						'padding-left': ctrl.gutter/2 + 'px',
						'padding-right': ctrl.gutter/2 + 'px'
					}
				}

			})
			function updateCls(){

			}
		}
	}
}])