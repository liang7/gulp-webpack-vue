<template>
	<div class="showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header">
			<h2>催收</h2>
		</div>
		
		<orderTrail :class="[showOrderTrailSide?'on':'']" v-on:closeOrderTrailSide="handleCloseOrderTrailSide"></orderTrail>
	</div>
</template>
<script>

import getHasPrivilege from 'vuex'
import orderTrail from '../common/orderTrail.vue'
export default{
	components: {
		orderTrail
	},
	created() {

	},
	data() {
		return {
			friendMobile: '',
			sortName: '',
			showOrderTrailSide: false,
			setDunnerPrivilege: false,
			sort: null,
			backDetail: {},
			originUrl: window.location.origin+window.location.pathname+'#',
			checkAllOverdueDays: false,
			loanIds: [],
			channelName: '渠道',
			backChannel: 0,
			channelId: -1,
			channelList: null,
			dialogBack: false,
			dialogDunnerLister: false,
			dialogDunnerListerNew: false,
			page: 1,
			rows: 20,
			total: 0,
			condition: '',
			pages: null,
			overdueDaysOpts: null,
			beginOverdueDays: null,
			endOverdueDays: null,
			tableData: [],
			currentItem: {},
			personInChargeName:"负责人",
			personInCharge:"",
			dunnerList:[],
			caseStatus:null,
			caseStatusName:'案件状态',
			orderStatus:1,
			orderStatusName:'催收中',
			dunnerLister:[],
			reconfigurationDunnerList:[],
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
<style lang="less">
	.dunNameListMov {
		font-size:20px;
		position: absolute;
		top: 50%;
	}
	.dunNameList-wrap {
		display: inline-block;
		vertical-align: top;
		width: 40%;
	}
	.dunNameList {
		max-height: 434px;
		overflow-y: auto;
	}
	.dunNameList>p {
		cursor: pointer;
	}
	.back-btns {
		position: fixed;
		top: 50%;
		margin-top: -44px;
		left: 79%;
		z-index: 1;
		> button {
			box-shadow: 0 0 20px #aaa;
		}
	}
	.overdueDaysRange {
		padding: 0;
		width: 242px;
		height: 36px;
	}
	.overdueDaysRange input {
		height: 34px;
		border: 0;
		outline: 0;
	}
</style>