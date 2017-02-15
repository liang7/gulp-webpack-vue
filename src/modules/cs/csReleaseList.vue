<template>
	<div class="showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header">
			<h2>放款处理</h2>
		</div>
		
		<orderTrail :class="[showOrderTrailSide?'on':'']" v-on:closeOrderTrailSide="handleCloseOrderTrailSide" id="orderTrailSide"></orderTrail>
	</div>
</template>
<script>

import Clipboard from '../../utils/clipboard.min'
import orderTrail from '../common/orderTrail.vue'
export default{
	components: {
		orderTrail
	},
	created(){

	},
	data() {
		return {
			showOrderTrailSide: false,
			
		}
	},
	methods: {
		handleCloseOrderTrailSide() {
			this.showOrderTrailSide=false;
		},
		getOrderTrail(d) {
			this.showOrderTrailSide = true;
			Vue.observer.$emit('getOrderTrail', {
				loanId: d.loanId,
				addTrailUrl: '/loan/addCsOrderTrail'
			})
		},
	}
}
</script>
<style>
	.releaseList-popover {
		display: block;
	    min-height: 74px;
	}
</style>