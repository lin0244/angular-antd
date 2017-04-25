/**
 * API
 * <a-dropdown></a-dropdown>
 * +----------+--------------------------------+---------+-------+
 * |
**/
angular('dropdown',[])
.directive('aDropdown',function(){
	return {
		restrcit:'AE',
		replace:true,
		scope:{
			trigger:'@',
			overlay:'='
		}
	}
})