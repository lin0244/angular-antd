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
				top: box.top + (window.pageYOffset || doc.documentElement.scrollTop || window.body.scrollTop) - (doc.documentElement.clientTop || 0),
				left: box.left + (window.pageXOffset || doc.documentElement.scrollLeft || window.body.scrollLeft) - (doc.documentElement.clientLeft || 0),
				offsetWidth: ele.offsetWidth || box.right - box.left,
				offsetHeight: ele.offsetHeight || box.bottom - box.top,
			}
		},
		position: function(ele){

		}
	}
})