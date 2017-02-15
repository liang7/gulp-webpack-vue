<template>
	<div class="orderTrailSide">
		<div class="el-card__header">
			<i class="iconfont">&#xe6ec;</i>
			订单轨迹
			<i class="el-message-box__close el-icon-close fr" @click="hideTrail($event)"></i>
		</div>
		<div class="el-tabs el-tabs--border-card" style="border:0">
			<div class="el-tabs__header">
				<div class="el-tabs__item" :class="{'is-active':type == 0}" @click="selectOrderTrail(0)">全部</div>
				<div class="el-tabs__item" :class="{'is-active':type == 1}" @click="selectOrderTrail(1)">操作轨迹</div>
				<div class="el-tabs__item" :class="{'is-active':type == 2}" @click="selectOrderTrail(2)">记录轨迹</div>
			</div>
		</div>
		<div class="orderTrailSide_bd" id="orderTrailSideBd">
			<ul class="mp0">
				<li class="text-center" style="line-height:80px;" v-show="!listData.length">无记录</li>
				<li v-for="item in listData" :class="[item.opertype==1?'text-rigth':'']">
					<div v-if="item.opertype==0">
						<div class="text">
							<span class="el-tag bg-info">{{item.label||""}}</span>{{item.content}}
						</div>
						<div class="color-gray">{{item.workName||""}}，{{item.operdate|time}}</div>
					</div>
					<div v-if="item.opertype==1">
						<div class="text">
							<span class="el-tag bg-violet">{{item.label||""}}</span>记录内容：{{item.content}}
						</div>
						<div class="color-gray text-rigth">{{item.workName||""}}，{{item.operdate|time}}</div>
					</div>
				</li>
				<li class="text-center" style="margin:20px 0" v-show="morePage">
					<el-button size="small" @click="getOrderTrail(1)" :loading="moreLoading">点击加载更多</el-button>
				</li>
			</ul>
		</div>
		<form class="orderTrailSide_ft box" v-on:submit.prevent="trail($event)">
			<div class="box">
				<input type="text" class="flex" v-model="content" v-focus="inputFocus">
				<button  type="submit" class="el-button el-button--info">发送</button>
			</div>
		</form>
	</div>
</template>
<script>

export default{
	mounted(){
		this.orderTrailSideBd = document.getElementById('orderTrailSideBd');
		Vue.observer.$off(['getOrderTrail'])
		Vue.observer.$on('getOrderTrail', (config) =>{
			if(!this.addTrailUrl) this.addTrailUrl = config.addTrailUrl;
			this.content = "";
			this.loanId = config.loanId;
			this.type = 0;
			this.page = 1;
			this.inputFocus = true;
			this.getOrderTrail()
		})
	},
	data() {
		return {
			inputFocus: true,
			orderTrailSideBd: null,
			morePage: false,
			moreLoading: false,
			type: 0,
			page: 1,
			rows: 20,
			loanId: null,
			addTrailUrl: null,
			content: '',
			listData: [],
		}
	},
	methods: {
		hideTrail(e){
			this.type = 0;
			e.target.parentElement.parentElement.className = 'orderTrailSide';
			this.$emit('closeOrderTrailSide', 'close')
			return false;
		},
		//添加记录
		trail() {
			let content = this.content;
			if(!content || content == "") {
				this.$message.error('内容不能为空');
				return;
			}
			this.$http.post(this.addTrailUrl,{loanId:this.loanId,content:content}).then(res => {
      			let head = res.data.head||{};
				if(head.code == '100') {
					this.content = "";
					this.getOrderTrail();
					this.$message.success(head.message||'添加成功');
					return;
				}
				this.$message.success(head.message||'添加失败');
			})
        	return false;
      	},
      	selectOrderTrail(type) {
      		this.page = 1;
      		this.type = type;
      		this.getOrderTrail();
      	},
      	//查询记录
      	getOrderTrail(next) {
      		if(next) {
      			this.moreLoading = true;
      			this.page += next;
      		}
      		let config = {
      			loanId: this.loanId,
      			type: this.type,
      			page: this.page,
      			rows: this.rows
      		}
      		this.$http.post('/loan/orderTrail',config).then(res => {
      			let body = res.data.body||{};
      			if(next) {
	      			this.moreLoading = false;
	      			this.listData = this.listData.concat(body.rows||[]);
	      		} else {
					this.listData = body.rows||[];
	      			this.orderTrailSideBd.scrollTop = 0;
	      		}
				this.total = body.total||0;
				this.morePage = (this.total > this.rows*this.page);
			})
      	}
	},
}
</script>
<style lang="less">
	.orderTrailSide {
		position: fixed;
		z-index: 1;
		right: 0;
		top: 56px;
		bottom: 0;
		width: 500px;
		border-left: 1px solid #d1dbe5;
		background: #fff;
		overflow: hidden;
		-webkit-transform: translateX(120%);
		-moz-transform: translateX(120%);
		transform: translateX(120%);
		transition: transform 0.3s;
		box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
	}
	.orderTrailSide .el-tabs--border-card>.el-tabs__header>.el-tabs__item {
		margin-left: 0;
		margin-right: 0;
	}
	.orderTrailSide .el-tabs__item {
		width: 33.33%;
		text-align: center;
	}
	.orderTrailSide.on {
		-webkit-transform: translateX(0);
		-moz-transform: translateX(0);
		transform: translateX(0);
	}
	.orderTrailSide_bd {
		position: absolute;
	    top: 102px;
	    right: 0;
	    left: 0;
	    bottom: 50px;
	    padding: 20px;
	    overflow-y: auto;
	    li {
	    	margin-bottom: 20px;
	    	> div {
	    		display: inline-block;
	    		width: 65%;
	    	}
	    }
	    li.text-rigth > div {
			text-align: left;
	    }
	    .text {
	    	display: inline-block;
	    	text-align: left;
	    	margin-bottom: 3px;
	    	word-break: break-all;
	    }
	    .el-tag {
	    	min-width: 40px;
	    	margin-right: 5px;
	    	text-align: center;
	    }
	}
	.orderTrailSide_ft {
		position: absolute;
		bottom: 10px;
		left: 0;
		right: 0;
		height: 36px
	}
	.orderTrailSide_ft .box {
		width: 100%;
		position: relative;
		z-index: 1;
	}
	.orderTrailSide_ft input {
		border: 1px solid #d1dbe5;
		padding: 10px;
		box-sizing: border-box;
		// background-color: #eef1f6;
		outline: 0;
	}
	.orderTrailSide_ft input:focus {
		border-color: #20a0ff;
	}
	.orderTrailSide_ft>i {
		width: 36px;
		line-height: 36px;
		text-align: center;
	}
	.orderTrailSide_ft .el-button {
		border-radius: 0
	}
</style>