<template>
	<div class="showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header">
			<h2>进件审核</h2>
			<span class="iconfont cursor icon-hover" @click="dialogHelp = true" title="帮助">&#xe6d7;</span>
		</div>
		
		<orderTrail :class="[showOrderTrailSide?'on':'']" v-on:closeOrderTrailSide="handleCloseOrderTrailSide" id="orderTrailSide"></orderTrail>
	</div>
</template>
<script>
import orderTrail from '../common/orderTrail.vue'
import { getAuditorList, getChannelList } from 'vuex'
export default{
	components: {
		orderTrail
	},
	created() {

	},
	data() {
		return {
			currentItem: {},
			showOrderTrailSide: false,
			rows: 20,
			pages: 1,
			total: 0,
			dialogHelp: false,
			condition: '',
			dateRange: '',
			auditorName: '审核人',
			auditor: null,
			auditStatusName: '状态',
			sort: null,
			auditStatus: null,
			channelId: -1,
			channelName: '来源',
			channelList: null,
			auditorList: [],
			
			
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