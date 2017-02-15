<template>
	<div class="showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header">
			<h2>还款</h2>
			<span class="iconfont cursor icon-hover" @click="dialogHelp = true" title="帮助">&#xe6d7;</span>
		</div>
		
		<orderTrail :class="[showOrderTrailSide?'on':'']" v-on:closeOrderTrailSide="handleCloseOrderTrailSide" id="orderTrailSide"></orderTrail>
	</div>
</template>
<script>

import Clipboard from '../../utils/clipboard.min'
import orderTrail from '../common/orderTrail.vue'
import getHasPrivilege from 'vuex'
export default{
	components: {
		orderTrail
	},
	created(){

	},
	mounted() {

	},
	data() {
		return {
			showOrderTrailSide: false,
			edit_repayAmount:"",
			edit_modifyReason:'',
			dialogModifyRepayAmount: false,
			get_repayment_modifyAmount: false,
			repayment_modifyAmount: false,
			nowTime: Date.now(),
			statusListNames: null,
			rows: 10,
			backChannel: null,
			repayAmount: '',
			modifyReason: '',
			isEditRepayAmount: false,
			isOverdue: false,
			dialogBack: false,
			dialogFinish: false,
			dialogHelp: false,
			finishDate: null,
			modifyRepayAmountData: {},
			currentItem: {},
			finishDateData: {},
			finishDateOpts: {},
			pages: 1,
			total: 0,
			condition: '',
			dateRange: '',
			loanStatusTips: {},
			loanStatus: -1,
			loanStatusName: '状态',
			
			
			tableData: [],
			
		}
	},
	methods: {
		handleCloseOrderTrailSide() {
			this.showOrderTrailSide=false;
			this.currentLoanId = null;
		},
		
	},
	watch: {

	}
}
</script>
<style>
	.table-backList>tbody>tr>td i {
		color: #475669;
	}
	.backList-popover {
		display: block;
	    min-height: 156px;
	}
</style>