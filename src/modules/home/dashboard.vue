<template>
	<div class="dashboard-chart cf">
		<div class="flexs cf" v-show="p_todayPassRate || p_yesterdayPassRate">
			<div class="audit-today audit-t-y fl" v-show="p_todayPassRate">
				<div class="audit-t-y-bd">
					<strong v-bind:title="'我今天审件通过'+(todayPassRate.auditPassCount||0)+'件'">{{todayPassRate.auditPassCount|amount}}</strong>
					<div>今日审件</div>
				</div>
				<div class="cf">
					<div class="passRate fl" v-bind:title='"今日我的审核通过率："+(todayPassRate.passRate||0)+"%"'>{{todayPassRate.passRate||0}}%</div>
					<strong class="num fr" v-bind:title='"今日共进件："+(todayPassRate.auditCount||0)'>{{todayPassRate.auditCount||0}}</strong>
				</div>
			</div>
			<div class="audit-yesterday audit-t-y fr" v-show="p_yesterdayPassRate">
				<div class="audit-t-y-bd">
					<strong v-bind:title="'我昨日审件通过'+(yesterdayPassRate.auditPassCount||0)+'件'">{{yesterdayPassRate.auditPassCount|amount}}</strong>
					<div>昨日审件</div>
				</div>
				<div class="cf">
					<div class="passRate fl" v-bind:title='"昨日我的审核通过率："+(yesterdayPassRate.passRate||0)+"%"'>{{yesterdayPassRate.passRate||0}}%</div>
					<strong class="num fr" v-bind:title='"昨今日共进件："+(yesterdayPassRate.auditCount||0)'>{{yesterdayPassRate.auditCount||0}}</strong>
				</div>
			</div>
		</div>
		<div class="flexs" v-show="p_DailyAuditCount">
			<div class="chart-hd">
				<h3 class="chart-title">近30天</h3>
				<span>每天审件</span>
			</div>
			<div class="chart-bd" id="_DailyAuditCount"></div>
		</div>
		<div class="flexs" v-show="p_StatusPercent">
			<div class="chart-hd">
				<h3 class="chart-title">系统借款状态比列</h3>
			</div>
			<div class="chart-bd" id="_StatusPercent"></div>
		</div>
		<div class="flexs" v-show="p_AvgAmountPerDay">
			<div class="chart-hd">
				<h3 class="chart-title">截止到昨日日均仪表盘</h3>
			</div>
			<div class="chart-bd" id="_AvgAmountPerDay"></div>
		</div>
		<div class="flexs" v-show="p_AvgAmountPerLoan">
			<div class="chart-hd">
				<h3 class="chart-title">截止到昨日日件均仪表盘</h3>
			</div>
			<div class="chart-bd" id="_AvgAmountPerLoan"></div>
		</div>
		<div class="flexs" v-show="p_DailyOverdueRate">
			<div class="chart-hd">
				<h3 class="chart-title">30天以来的逾期率</h3>
				<span>当天逾期率=截止当天逾期总金额/截止当天在贷总金额</span>
			</div>
			<div class="chart-bd" id="_DailyOverdueRate"></div>
		</div>
		<div class="flexs" v-show="p_dailyCreditAmount">
			<div class="chart-hd">
				<h3 class="chart-title">{{realTimeCreditAmount}}</h3>
				<span>当前在贷金额</span>
			</div>
			<div class="chart-bd" id="_dailyCreditAmount"></div>
		</div>
		<div class="flexs" v-show="p_users">
			<div class="chart-hd">
				<h3 class="chart-title">用户量</h3>
			</div>
			<div class="chart-bd" id="_users"></div>
		</div>
		<div class="flexs" v-show="p_dailyReleaseAmount">
			<div class="chart-hd">
				<h3 class="chart-title">{{realTimeReleaseAmount}}</h3>
				<span>当前总放款金额</span>
			</div>
			<div class="chart-bd" id="_dailyReleaseAmount"></div>
		</div>
		<div class="flexs" v-show="p_dailyReleaseCount">
			<div class="chart-hd">
				<h3 class="chart-title">{{realTimeReleaseCount}}</h3>
				<span>当前放款笔数</span>
			</div>
			<div class="chart-bd" id="_dailyReleaseCount"></div>
		</div>
		<div class="flexs" v-show="p_dailyOverdueAmount">
			<div class="chart-hd">
				<h3 class="chart-title">{{realTimeOverdueAmount}}</h3>
				<span>当前逾期金额</span>
			</div>
			<div class="chart-bd" id="_dailyOverdueAmount"></div>
		</div>
		<div class="flexs" v-show="p_dailyOverdueCount">
			<div class="chart-hd">
				<h3 class="chart-title">{{realTimeOverdueCount}}</h3>
				<span>当前逾期笔数</span>
			</div>
			<div class="chart-bd" id="_dailyOverdueCount"></div>
		</div>
		<div class="flexs" v-show="p_dailyPassRate">
			<div class="chart-hd">
				<h3 class="chart-title">{{realTimePassRate}}%</h3>
				<span>总通过率</span>
			</div>
			<div class="chart-bd" id="_dailyPassRate"></div>
		</div>
		<div class="flexs" v-show="p_termDistribution">
			<div class="chart-hd">
				<h3 class="chart-title">所有订单选择期限</h3>
			</div>
			<div class="chart-bd" id="_termDistribution"></div>
		</div>
	</div>
</template>
<script>

// import highcharts from 'highcharts'
export default{
	created() {
		let today = Vue.moment().format('YYYY-MM-DD');
		let near30 = Vue.moment((new Date()).DateAdd('d', -30)).format('YYYY-MM-DD');
		//今日审件通过率
		this.$http.post('/audit/todayPassRate').then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_todayPassRate = false;
				return;
			};
			this.todayPassRate = data.body;
		});
		//昨日审件通过率
		this.$http.post('/report/yesterdayPassRateReport').then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_yesterdayPassRate = false;
				return
			};
			this.yesterdayPassRate = data.body;
		});
		//近30天每天审件
		this.$http.post('/report/dailyAuditCountReport', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_DailyAuditCount = false;
				return
			};
			let d = data.body.datas;
			let len = d.length;
			if(!len) return;
			let chartOpts = Vue.com.getChartOpts3();
			chartOpts.plotOptions = {
	            column: {
	                stacking: 'normal'
	            }
	        }
			chartOpts.chart.type = 'column';
			chartOpts.tooltip.formatter = function(){
				let points = this.points, tpl='<span>'+this.x+'</span><br>';
				tpl += '<span><b style="color:'+points[0].color+'">● </b>'+points[0].series.name+'：<b>'+points[0].total+'</b></span><br>';
				tpl += '<span><b style="color:'+points[1].color+'">● </b>'+points[1].series.name+'：<b>'+(points[1].y)+'</b></span><br>';
				return tpl;
			};
			let item1 = {
				name: '审件数',
				color: '#009900',
				data: []
			};
			let item2 = {
				name: '审件通过数',
				color: '#99cc00',
				data: []
			};
			let createTime = [];
			for (let i = 0; i < len; i++) {
				createTime.push(d[i].date);
				item1.data.push(d[i].auditCount - d[i].auditPassCount);
				item2.data.push(d[i].auditPassCount);
			}
			chartOpts.xAxis.categories = createTime;
			chartOpts.series = [item1, item2];
			$('#_DailyAuditCount').highcharts(chartOpts)
		});
		//系统借款状态比列
		this.$http.post('/report/statusPercentReport').then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_StatusPercent = false;
				return
			};
			let d = data.body;
			if(!d) return;
			let chartOpts = Vue.com.getChartOpts3();
			chartOpts.chart.type = 'pie';
			chartOpts.tooltip.pointFormat = '{series.name}: <b>{point.percentage:.1f}%</b>';
	        chartOpts.plotOptions = {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
	                }
	            }
	        };
			chartOpts.series = [{
	            type: 'pie',
	            name: '系统借款状态比列',
	            data: [
	                ['还款中',  d.backing],
	                ['逾期中',  d.overing],
	                ['已结清',  d.finish]
	            ]
	        }];
			$('#_StatusPercent').highcharts(chartOpts)
		})
		// //每天数量平均值
		this.$http.post('/report/avgAmountPerDayReport').then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_AvgAmountPerDay = false;
				return
			};
			let body = data.body||{};
			if(!body.datas) return;
			$('#_AvgAmountPerDay').highcharts(this.lineDataOpts(body.datas, 'amountPerDay', '每天数量平均值'))
		})
		// //每天贷款金额平均值数据
		this.$http.post('/report/avgAmountPerLoanReport', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_AvgAmountPerLoan = false;
				return
			};
			let body = data.body||{};
			if(!body.datas) return;
			$('#_AvgAmountPerLoan').highcharts(this.lineDataOpts(body.datas, 'amountPerLoan', '当日贷款金额平均值数据'))
		});
		// //30天以来的逾期率
		this.$http.post('/report/dailyOverdueRateReport', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_DailyOverdueRate = false;
				return
			};
			let opt = this.columnDataOpts(data.body.datas, '%','overdueRate',{
				name: '当天逾期率',
				color: '#ff6600',
				data: []
			},1)
			opt.yAxis.plotLines= [{   
                value: 10,  
                color: '#bbbbbb',  
                dashStyle: 'shortdash',  
                width: 1
            }]
			$('#_DailyOverdueRate').highcharts(opt)
		});

		// //近30天的每天在贷情况
		this.$http.post('/report/dailyCreditAmount', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_dailyCreditAmount = false;
				return
			};
			let body = data.body||{};
			if(!body.datas) return;
			this.realTimeCreditAmount = body.realTimeCreditAmount;
			$('#_dailyCreditAmount').highcharts(this.lineDataOpts(body.datas, 'creditAmount', '当天在贷情况', '#2c8fff'))
		})

		// //近30天的每天的放款金额
		this.$http.post('/report/dailyReleaseAmount', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_dailyReleaseAmount = false;
				return
			};
			let body = data.body||{};
			if(!body.datas) return;
			this.realTimeReleaseAmount = body.realTimeReleaseAmount;
			$('#_dailyReleaseAmount').highcharts(this.lineDataOpts(body.datas, 'releaseAmount', '当天放款', '#2c8fff'))
		})
		// //近30天的每天的放款金额
		this.$http.post('/report/dailyOverdueAmount', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_dailyOverdueAmount = false;
				return
			};
			let body = data.body||{};
			if(!body.datas) return;
			this.realTimeOverdueAmount = body.realTimeOverdueAmount;
			$('#_dailyOverdueAmount').highcharts(this.lineDataOpts(body.datas, 'overdueAmount', '当天逾期'))
		})

		// //用户量
		this.$http.post('/report/users').then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_users = false;
				return
			};
			let d = data.body;
			if(!d) return;
			let chartOpts = Vue.com.getChartOpts3();
			chartOpts.chart.type = 'pie';
			chartOpts.colors = ['#8e8e8e', '#c5c5c5'];
			chartOpts.tooltip.formatter = function() {
            	return '<b>'+this.key+'</b>: '+(this.key == '总用户'?this.total:this.y)+'人'
			};
	        chartOpts.plotOptions = {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    formatter: function () {
	                    	return '<b>'+this.key+'</b>: '+(this.key == '总用户'?this.total:this.y)+'人'
	                    },
	                }
	            }
	        };
			chartOpts.series = [{
	            type: 'pie',
	            name: '用户量',
	            data: [
	                ['在贷用户',  d.creditingUsers||0],
	                ['总用户',  (d.users-d.creditingUsers)],
	                // ['总用户',  (d.users||0)]
	            ]
	        }];
			$('#_users').highcharts(chartOpts)
		});
		// //所有订单选择期限
		this.$http.post('/report/termDistribution').then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_termDistribution = false;
				return
			};
			let d = data.body;
			if(!d) return;
			let chartOpts = this.chartOpts;
			chartOpts.chart.type = 'pie';
			chartOpts.colors = ['#2c8fff', '#ff8e01', '#ff0001'];
			chartOpts.tooltip.pointFormat = '{point.name}: <b>{point.y}笔</b>';
	        chartOpts.plotOptions = {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    format: '<b>{point.name}</b>:{point.y}笔（{point.percentage:.1f} %）',
	                }
	            }
	        };
			chartOpts.series = [{
	            type: 'pie',
	            name: '所有订单选择期限',
	            data: [
	                ['7天期限',  d.sevenDaysTermCount||0],
	                ['14天期限',  d.fortnightTermCount||0],
	                ['28天期限',  d.twentyEightDaysCount||0]
	            ]
	        }];			
	        $('#_termDistribution').highcharts(chartOpts)
		});
		// //近30天的每天的放款笔数
		this.$http.post('/report/dailyReleaseCount', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_dailyReleaseCount = false;
				return
			};
			if(!data.body.datas) return;
			this.realTimeReleaseCount = data.body.realTimeReleaseCount;
			$('#_dailyReleaseCount').highcharts(this.columnDataOpts(data.body.datas, '笔','releaseCount',{
				name: '当天放款',
				color: '#2c8fff',
				data: []
			}))
		});
		// //近30天的每天的逾期笔数
		this.$http.post('/report/dailyOverdueCount', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_dailyOverdueCount = false;
				return
			};
			if(!data.body.datas) return;
			this.realTimeOverdueCount = data.body.realTimeOverdueCount;
			$('#_dailyOverdueCount').highcharts(this.columnDataOpts(data.body.datas, '笔','overdueCount',{
				name: '当天逾期',
				color: '#ff0001',
				data: []
			}))
		});
		// //近30天的每天的通过率
		this.$http.post('/report/dailyPassRate', {startDate: near30, endDate: today}).then(res => {
			let data = res.data || {};
			if(data.head.code == '104') {
				this.p_dailyPassRate = false;
				return
			};
			if(!data.body.datas) return;
			this.realTimePassRate = data.body.realTimePassRate;
			$('#_dailyPassRate').highcharts(this.columnDataOpts(data.body.datas, '%','passRate',{
				name: '当天通过率',
				color: '#00c58e',
				data: []
			}))
		});
	},
	data() {
		return {
			chartOpts: Vue.com.getChartOpts3(),
			todayPassRate: {},
			yesterdayPassRate: {},
			realTimeCreditAmount: null,
			realTimeReleaseAmount: null,
			realTimeOverdueAmount: null,
			realTimeReleaseCount: null,
			realTimeOverdueCount: null,
			realTimePassRate: null,

			p_todayPassRate: true,
			p_yesterdayPassRate: true,
			p_DailyAuditCount: true,
			p_StatusPercent: true,
			p_AvgAmountPerDay: true,
			p_AvgAmountPerLoan: true,
			p_DailyOverdueRate: true,
			p_users:true,
			p_dailyCreditAmount:true,
			p_dailyReleaseAmount:true,
			p_dailyOverdueAmount:true,
			p_dailyReleaseCount:true,
			p_dailyOverdueCount:true,
			p_dailyPassRate:true,
			p_termDistribution:true,
		}
	},
	methods: {
		lineDataOpts(data, itemName, name, color) {
			let d = data;
			let len = d.length;
			if(!len) return;
			let chartOpts = this.chartOpts;
			chartOpts.tooltip.pointFormat = '{series.name}: <b>{point.y:.1f}元</b>';
			let item = {
				name: name,
				color: color||'#f45b5b',
				data: []
			};
			let createTime = [];
			for (let i = 0; i < len; i++) {
				createTime.push(d[i].date);
				item.data.push(d[i][itemName]||0);
			}
			chartOpts.chart.type = (itemName == "amountPerLoan"?'area':'spline');
			chartOpts.xAxis.categories = createTime;
			chartOpts.series = [item];
			return chartOpts;
		},
		columnDataOpts(data, em, itemName, item, isNewOpts) {
			let d = data;
			let len = d.length;
			if(!len) return;
			let chartOpts = isNewOpts?Vue.com.getChartOpts3():this.chartOpts;
			chartOpts.tooltip.pointFormat = '{series.name}: <b>{point.y}'+em+'</b>';
			chartOpts.chart.type = 'column';
			let createTime = [];
			for (let i = 0; i < len; i++) {
				createTime.push(d[i].date);
				item.data.push(d[i][itemName]||0);
			}
			chartOpts.xAxis.categories = createTime;
			chartOpts.series = [item];
			return chartOpts;
		}
	}
}
</script>
<style lang="less">
	.dashboard-chart {
	 	margin-right: -1.33%;
		margin-bottom: 20px;
		.flexs {
			position: relative;
			float: left;
			background: #fff;
			margin: 0 1.33% 20px 0;
			height: 180px;
			width: 32%;
			box-sizing: border-box;
			overflow: hidden;
		}
		.chart-hd {
			position: absolute;
			padding: 10px 20px;
			z-index: 1;
			top: 0;
			left: 0;
			right: 0;
			h3 {
				font-size: 15px;
			}
			span {
				color: #bbb;
			}
		}
		.chart-bd {
			height: 180px;
			position: relative;
    		z-index: 1;
		}
		.flexs.cf {
			background: transparent;
		}
		.audit-t-y {
			width: 47%;
			height: 180px;
			padding: 20px 20px 10px;
			color: #fff;
			box-sizing: border-box;
			font-size: 13px;
			.audit-t-y-bd {
				height: 90px;
				strong {
					font-size: 58px;
				    font-weight: 400;
				    line-height: 0.8;
				}
			}
			> .cf {
				.passRate {
					width: 47px;
					height: 30px;
					line-height: 30px;
					text-align: center;
				}
				.num {
					margin-top: 15px;
				}
			}
		}
		.audit-today {
			background: #f60;
			.passRate {
				background: #fff;
				color: #f60;
			}
		}
		.audit-yesterday {
			background: #42a5f5;
			.passRate {
				background: rgba(255, 255, 255, .7);
				color: #42a5f5;
			}
		}
	}
</style>