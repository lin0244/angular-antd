/*
 * API
 * <a-back-top></a-back-top>
 * +------------------+----------------------+---------+---------+
 * | attr             | descript             | type    | default |
 * +------------------+----------------------+---------+---------+
 * | visibilityHeight |                      | number  | 400     |
 * +------------------+----------------------+---------+---------+
 * | onclick          |                      | Function|         |
 * +------------------+----------------------+---------+---------+
**/

angular.module('backtop',[])
.directive('aBackTop',function(){
	return {
		restrict:'AE',
		replace:true,
		transclude:true,
		scope:{
			visibilityHeight:'=',
			onclick:'&'
		},
		template:'<div class="ant-back-top" ng-show="isVisible" ng-click="scrollToTop()">\
						<div class="ant-back-top-content">\
							<i class="anticon anticon-to-top ant-back-top-icon"></i>\
						</div>\
				  </div>',
		compile:function(element,attrs,transcludeFn){
			return function(scope,element,attrs){
				scope.isVisible = false;
				transcludeFn(scope,function(clone){
					if(clone.length){
						element.empty();
						element.append(clone);
					}
				});
				angular.element(window).on('scroll',function(){
					var scrolltop = window.document.body.scrollTop || document.documentElement.scrollTop;
					if(angular.isNumber(scope.visibilityHeight) && scrolltop > scope.visibilityHeight){
						scope.isVisible = true;
						scope.$digest();
					}
					else if(scrolltop > 400){
						scope.isVisible = true;
						scope.$digest();
					}
					else{
						scope.isVisible = false;
						scope.$digest();
					}
				});

				scope.scrollToTop = function(){
					document.body.scrollTop = 0;
					document.documentElement.scrollTop = 0;
				}
			}
		}
	}
})