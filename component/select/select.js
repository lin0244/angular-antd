angular.module('select',[])
.directive('aSelect',function($timeout){
	return{
		restrict:'E',
		replace: true,
		scope:{
			style:'@',
			placeholder:"@"
		},
		template:'<div class="ant-select ant-select-enabled" style="{{style}}">\
					<div class="ant-select-selection ant-select-selection--single" role="combobox" aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">\
						<div class="ant-select-selection__rendered">\
							<div class="ant-select-selection-selected-value" style="display: block; opacity: 1;">Jack</div>\
						</div>\
						<span class="ant-select-arrow"></span>\
					</div>\
				</div>',
		link: function(scope,element,attrs){
			var templateInsert = '<div><div class="ant-select-dropdown ant-select-dropdown--single ant-select-dropdown-placement-bottomLeft"></div></div>'
			angular.element(document.body).append(templateInsert);
		}
	}
})