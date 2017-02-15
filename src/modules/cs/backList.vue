<template>
	<div class="showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header">
			<h2>还款处理</h2>
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
		let that = this;
		let clipboard = new Clipboard('.btn-copy');
		clipboard.on('success', function(e) {
		    that.$message.success('已复制');
		});
	},
	data() {
		return {
			showOrderTrailSide:false,
		}
	},
	methods: {
		handleCloseOrderTrailSide() {
			this.showOrderTrailSide=false;
		},
		copyTrData(d) {
			return d.loanId+'\t'+(d.realName||"")+'\t'+(d.cardNo||"")+'\t'+(d.mobile||"")+'\t'+(d.bankName||"")+'\t'+(d.bankCardNo||"")+'\t'+(d.planRepayDate||"")+'\t'+(d.repayAmount||0)+'\t'+(d.plannedTermPrincipal||0)+'\t'+(d.plannedTermInterest||0)+'\t'+(d.overDueFee||0)+'\t'+(d.lateFees||0)+'\t'+(d.exemptionAmount||0)+'\t'+(d.overdueDays||"")+'\t'+(d.channel||"")+'\t'
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
	.table-backList>tbody>tr>td i {
		color: #475669;
	}
	.backList-popover {
		display: block;
	    min-height: 156px;
	}
	.message-popover {
		text-align: center;
	}
	.message-popover>span {
		line-height: 30px;
		cursor: pointer;
	}
	.message-popover>span:nth-child(1) {
		border-bottom: 1px dashed #ddd;
		display: block;
	}
	.nobor, .nobor:hover {
		border-color: transparent;
		outline: 0;
	}
</style>