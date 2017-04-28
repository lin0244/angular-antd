angular.module('util',[])
.factory('reg',function(){
	return {
		isNumber:function(val){
			var reg = /^\d*$/;
			return reg.test(val);
		}
	}
})
.factory('dom',function(){
	return {
		offset:function(ele){
			var box = {top: 0, left: 0},
				doc = ele && ele.ownerDocument;
			if(!doc)
				return;
			if(typeof ele.getBoundingClientRect !== "undefined"){
				box = ele.getBoundingClientRect();
			}
			return{
				top: box.top + (window.pageYOffset || doc.documentElement.scrollTop || doc.body.scrollTop) - (doc.documentElement.clientTop || 0),
				left: box.left + (window.pageXOffset || doc.documentElement.scrollLeft || doc.body.scrollLeft) - (doc.documentElement.clientLeft || 0),
				offsetWidth: ele.offsetWidth || box.right - box.left,
				offsetHeight: ele.offsetHeight || box.bottom - box.top,
			}
		},
		calcPosition: function(ele,container,placement){
			var _eleOffset = this.offset(ele),
				_containerOffset = this.offset(container);
			console.log(_eleOffset.top,_containerOffset.top);
			return {
				"left": _eleOffset.left - _containerOffset.left + 'px',
				"top": _eleOffset.top - _containerOffset.top + _eleOffset.offsetHeight + 'px'
			}
		},
		position: function(ele){

		}
	}
})