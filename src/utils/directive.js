import Vue from 'vue'

Vue.directive('focus',  function(el, obj){
	if(obj.value) {
		el.focus();
	} else {
		el.blur();
	}
})