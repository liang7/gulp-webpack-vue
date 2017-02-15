<template>
	<div class="dunDetail-wrap">

			<div class="page-header" style="margin-top:20px">
				<h2>详情</h2>
				<span style="font-size: 12px;">（借款编号-{{loanId}}）</span>
			</div>
			
	</div>
</template>
<script>
import contacts from './contacts'
import zoomImage from '../../utils/zoomImage'
import { getMaterial} from 'vuex'
export default{
	components: {
		contacts
	},
	created() {
		let query = this.$store.state.route.query;
		this.loanId = this.$store.state.route.params.loanId;
		this.userId = query.userId;
		this.dun = (query.from =='dun');
		this.personInChargeName = query.chargeName;
		if(!query.caseStatus || query.caseStatus=='null' || query.caseStatus=='undefined') {
			this.caseStatus = null;
		} else {
			this.caseStatus = query.caseStatus - 0;
		}
		this.query = query;

	},
	data() {
		return {
			type: 0,
			dunuserloanext:{},
			query:{},
			focusDetails:false,
			moreDisabled:false,
			moreLoading:false,
			backLoading:false,
			moreText:'点击加载更多...',
			dun:false,
			page:1,
			month: null,
			typeOpts:[{
				label: '全部',
				value: 0
			},{
				label: '只看催收记录',
				value: 1
			},{
				label: '只看其它记录',
				value: 2
			},],
			dunquerymonths: [],
			querydunrecord: [],
			showContactsSide: false,
			dialogRecords: false,
			recordsTitle: '记录',
			dialogAddContacts: false,
			caseStatus: null,
			caseStatusOpts:[{
					label: '新案',
					value: 1,
				},{
					label: '承诺还款',
					value: 2,
				},{
					label: '重点跟进',
					value: 3,
				},{
					label: '每日必跟',
					value: 4,
				},{
					label: '跳票',
					value: 5,
				},{
					label: '信息均无效',
					value: 6,
				}
			],
			personInChargeName:"",
			dialogBack: false,
			duebeforephone: [],
			Material: [],
			MaterialPath: [],
			AuditInfo: {},
			BankDetail: {},
			BackDetail: {},
			frequentContact: [],
			caller: [],
			called: [],
			opercall: [],
			UserAuditInfo:{},
			today: new Date(),
			userId: null,
			loanId: null,
			page: null,
			from: null,
			zoomImage: zoomImage.zoomImage,
			newContactsPhone:'',
			newContactsName:'',
			backChannel:null,
			cellphone:null,
			details:"",
			dunName:"",
			existPhone:null,
		}
	},
	methods: {
		
	},
}
</script>
<style lang="less">
	.dunDetail-wrap {
		position: fixed;
		top: 56px;
		left: 272px;
		bottom: 0;
		right: 0;
	}
	.dun-detail.on {
		padding-right: 600px;
	}
	.back-btns.on {
		right: 583px;
	}
	.dun-detail {
		position: absolute;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		padding-right: 26%;
		overflow-y: auto;
		-webkit-transition: padding 0.3s; 
		-moz-transition: padding 0.3s; 
		transition: padding 0.3s; 
		.contact-item {
			padding: 10px 20px 0;
			border-bottom: 1px solid #D3DCE6;
			overflow: hidden;
			.title {
			    display: inline-block;
			    color: #20a0ff;
			    font-size: 15px;
			}
			.contact-text {
				margin-bottom: 5px;
			}
			ul {
				li {
					padding: 10px 0;
					p {
						word-wrap: break-word;
					}
				}
				li+li {
					border-top: 1px dashed #D3DCE6;
				}
			}
		}
	}
	.side-bottom {
		position: fixed;
		right: 0;
		bottom: 0;
		width: 450px;
		margin-bottom: 0;
		transform: translateX(120%);
	}
	.dun-record {
		.icons {
			.el-icon-check {
				font-size: 20px;
				color: #20a0ff;
			}
			.iconfont {
				font-size: 20px;
				font-weight: bold;
			}
		}
	}
	.side-bottom.active {
		-webkit-transform: translateX(0);
		-moz-transform: translateX(0);
    	transition: transform ease .3s;
	}
	.contacts-callRecord a {
		margin-left: 5px;
		text-decoration: none;
		color: #20a0ff;
	}
	.back-btns {
		position: absolute;
		top: 50%;
		margin-top: -44px;
		-webkit-transition: right 0.3s; 
		-moz-transition: right 0.3s; 
		transition: right 0.3s; 
		right: 24.5%;
		z-index: 1;
		> button {
			box-shadow: 0 0 20px #aaa;
			display: block;
		}
		> button+button {
			margin: 15px 0 0 0 !important;
		}
	}
	.lineh-22 {
		line-height: 22px;
	}
	.dundetail-remark {
		display: inline-block;
		// white-space: nowrap;
	}
	.dundetail-remark .remarkText>span:nth-child(1) {
		word-break: break-all;
	}
	.dundetail-remark .el-input--mini {
		width: auto;
		display: none;
	}
	.dundetail-remark.on .el-input--mini {
		display: inline-block;
	}
	.dundetail-remark.on .remarkText {
		display: none;
	}
	.querydunrecord-bd {
		max-height: 440px;
		overflow-y: auto;
	}
	.dun-detail .lineh-22>.inline-block {
		width: 200px;
	}
</style>