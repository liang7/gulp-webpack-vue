<template>
	<div id="app">
    	<headers></headers>
    	<navs></navs>
	    <div class="page-content">
	        <router-view></router-view>
	    </div>
	</div>
</template>
<script>
	import headers from './header.vue'
	import navs from './nav.vue'
	export default{
		components:{headers, navs},
		data:function(){
			return {}
		}
	}
</script>