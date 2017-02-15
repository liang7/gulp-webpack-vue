<template>
	<div class="el-card box-card table-card record_contacts_side">
		<div class="el-card__header">
			<button class="el-button" :class="[record_contacts =='contacts'?'el-button--primary':'el-button--default']" @click="getContacts">通讯录</button>
			<button class="el-button" :class="[record_contacts =='record'?'el-button--primary':'el-button--default']" @click="getRecord">通话记录</button>
			<i class="el-message-box__close el-icon-close fr" @click="hideContacts($event)"></i>
		</div>
		<div class="record_contacts_bd">
			<table class="el-table custom-table" v-show="record_contacts =='record'">
			    <thead>
			        <tr>
			            <th>备注名</th>
			            <th>号码</th>
			            <th>通话时间</th>
			            <th>通话时长</th>
			            <th>通话类型</th>
			        </tr>
			    </thead>
				<tbody>
				    <tr v-for="item in tableData">
				        <td>{{item.name}}</td>
				        <td>{{item.phone}}</td>
				        <td>{{item.callTime|time}}</td>
				        <td>{{item.duration|minuteSecond}}</td>
				        <td>{{callTypeName[item.callType||1]}}</td>
				    </tr>
				</tbody>
			</table>
			<table class="el-table custom-table table-fixed" v-show="record_contacts =='contacts'">
			    <thead>
			        <tr>
			            <th>姓名</th>
			            <th>号码</th>
			        </tr>
			    </thead>
				<tbody>
				    <tr v-for="item in tableData">
				        <td>{{item.name}}</td>
				        <td>{{item.phone}}</td>
				    </tr>
				</tbody>
			</table>
		</div>
		<el-pagination class="record_contacts_pat" @current-change="currentChange" @size-change="sizeChange" :current-page="1" :page-size="rows" layout="total, prev, pager, next, jumper" :total="total">
		</el-pagination>
	</div>
</template>
<script>
export default{
	created(){
		this.loanId = this.$store.state.route.params.loanId;
		if(!this.loanId) return;
		Vue.observer.$on('getContacts', () =>{
			this.getList();
		})
	},
	data() {
		return {
			record_contacts: 'contacts',
			page: 1,
			rows: 20,
			total: 0,
			tableData: [],
			callTypeName: {
				1: '呼入',
				2: '呼出',
				3: '未接',
				4: '挂断',
			}
		}
	},
	methods: {
		hideContacts(e){
			e.target.parentElement.parentElement.className = 'el-card box-card table-card record_contacts_side';
			this.$emit('closeContactsSide', 'close')
			return false;
		},
		getContacts() {
			this.record_contacts = 'contacts';
			this.getList(1)
		},
		getRecord() {
			this.record_contacts = 'record';
			this.getList(1)
		},
		currentChange(val) {
			this.page = val;
			this.getList()
		},
		sizeChange(val) {
			this.rows = val;
			this.getList()
		},
		getList(triggerFirst) {
			if(triggerFirst) this.page = 1;
			if(Vue.com.paginationBug(triggerFirst)) return;
			let config = {
				loanId: this.loanId,
				rows: this.rows||20,
				page: this.page || 1,
			}
			this.$http.post('/user/'+(this.record_contacts=="contacts"?"contactsList":'callRecords'),config).then(res => {
				let body = res.data.body || {};
				this.tableData = body.rows;
				this.total = body.total;
			})
		}
	}
}
</script>
<style lang="less">
	.record_contacts_side {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		width: 0;
		margin-bottom: 0;
		width: 0;
		transition: width .3s;
	}
	.record_contacts_side.on {
		width: 600px;
	}
	.record_contacts_pat {
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.record_contacts_bd {
		position: absolute;
		top: 73px;
		left: 0;
		right: 0;
		bottom: 64px;
		overflow: auto;
	}
</style>