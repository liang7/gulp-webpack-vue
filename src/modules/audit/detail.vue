<template>
	<div class="audit-detail max-width showOrderTrailSide" :class="[showOrderTrailSide?'on':'']">
		<div class="page-header cf">
			<h2>合同编号：{{loanId}} 的详情</h2>
			
		</div>
		
		<orderTrail :class="[showOrderTrailSide?'on':'']" v-on:closeOrderTrailSide="showOrderTrailSide=false"></orderTrail>
	</div>
</template>
<script>

import orderTrail from '../common/orderTrail.vue'
import { getMaterial} from 'vuex'
export default{
	components: {
		orderTrail
	},
	mounted() {
		this.canvas = document.getElementById('zoomImageCanvas');
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight - 130;
		this.ctx = this.canvas.getContext('2d');
		this.bindZoomImagesEvent();
		this.trackTransforms(this.ctx);
		this.ctx.save();
		if(this.$store.state.route.query.from != 'lockLoan') return;
	},
	data() {
		return {
			parentCode: null,
			isLevel1: true,
			showOrderTrailSide: false,
			dunuserloanext: {},
			loanId: "",
			userId: "",
			dialogHelp: false,
			from: false,
			canvas: null,
			ctx : null,
			UserAuditInfo: {},
			AuditInfo: {},
			BankDetail: {},
			dialogPass: false,
			dialogComfirmImage: false,
			showNewReasonInput: false,
			rejectCode1: null,
			rejectCode4: null,
			rejectCodeList1: [],
			rejectCodeList1_sub: [],
			rejectCodeList4: [],
			chartOpts: Vue.com.getChartOpts2(),
			material: [],
			MaterialPath: [],
			showZoomImage: false,
			showImageLoading: false,
			showImageError: false,
			prevDisabled: true,
			nextDisabled: true,
			isLockLoan: false,
			pastLoanInfo: {},
			factor: 1,
			index: 0,
			imgLength: 0,
			refuseReason: "",
			rejectConfirm: false,
			imagePass: true,
			realNameIdenty: {},
			txshkIdentifyRes:{},
			mobileOnlineStatus:{},
			mobileOnlineTime:{},
			AuthenticationInformationDate:null,
			authentDate: null,
			waitAuditTime: '00:00:00',
			waitAuditTimeClass: 'color-warning',
			interWaitAuditTime: null,
			flipx: 1,
		}
	},
	methods: {
		
	},
}
</script>
<style lang="less">
	.audit-detail {
		.credit-score {
		    font-size: 15px;
		    margin-bottom: 3px;
		}
		.credit-text {
			> h4 {
				font-size: 13px;
				font-weight: bold;
				cursor: pointer;
			}
			> h4.active + .ruleDetails {
				height: auto;
			}
			.ruleDetails {
				line-height: 1.5;
				height: 0;
				overflow: hidden;
			}
			padding: 10px 15px;
			margin-bottom: 7px;
			background: #ffffdc;
    		border-radius: 4px;
		}
		.reject-pass {
			position: fixed;
			top: 50%;
			margin-top: -44px;
			right: 21%;
			z-index: 2;
			-webkit-transition: right 0.3s;
		    -moz-transition: right 0.3s;
		    transition: right 0.3s;
			> button {
				box-shadow: 0 0 20px #aaa;
			}
			.radio-content{
				height:200px;
				overflow:auto;
			}
		}
		.reject-pass.on {
			right: 484px;
		}
		.chart {
			width: 50%;
			height: 150px;
		}
	}
	.rejectConfirm.active {
		transform: translateX(0px);
		opacity: 1;
	}
	.rejectConfirm {
		width: 300px;
		margin-left: -240px;
		opacity: 0;
		transform: translateX(1000px); 
    	transition: transform 0.3s;
		.title {
			line-height: 35px;
			padding: 15px;
			border-bottom: 1px solid #D3DCE6;
		}
		.el-input {
			margin: 15px;
			i {
				width: 25px;
			}
			i:nth-child(1) {
				right: 25px;
			}
		}
		i {
			font-size: 18px;
		}
		input[type="radio"] {
			display: none;
		}
		label {
			display: block;
			padding: 8px 15px;
			cursor: pointer;
		}
		input[type="radio"]:checked + label, label:hover {
			background-color: #EFF2F7;
		}
	}
</style>