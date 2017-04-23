angular.module('util',[])
.factory('reg',function(){
	return {
		isNumber:function(val){
			var reg = /^\d*$/;
			return reg.test(val);
		}
	}
})