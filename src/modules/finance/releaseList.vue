<template>
	<div class="showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header">
			<h2>放款</h2>
			<span class="iconfont cursor icon-hover" @click="dialogHelp = true" title="帮助">&#xe6d7;</span>
		</div>
		
		<orderTrail :class="[showOrderTrailSide?'on':'']" v-on:closeOrderTrailSide="handleCloseOrderTrailSide" id="orderTrailSide"></orderTrail>
	</div>
</template>
<script>
import orderTrail from '../common/orderTrail.vue'
import Clipboard from '../../utils/clipboard.min'
export default{
	components: {
		orderTrail
	},
	created(){
		
	},
	data() {
		return {
			currentItem:{},
			showOrderTrailSide: false,
			rows: 20,
			getedSwitchData: false,
			statusListNames: null,
			switchData: false,
			dialogRelFail: false,
			dialogHelp: false,
			releaseTime: "",
			refuseReason: "",
			type: null,
			pages: 1,
			total: 0,
			condition: '',
			dateRange: '',
			releaseStatusTips: {},
			releaseStatus: -1,
			releaseStatusName: '状态',


			tableData: [],

		}
	},
	methods: {
		handleCloseOrderTrailSide() {
			this.showOrderTrailSide=false;
			this.currentLoanId = null;
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