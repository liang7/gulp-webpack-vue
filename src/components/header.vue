<template>
	<header class="nav-top cf">
		<div class="menu-icon iconfont text-center cursor inline-block" @click="toggleMenu">&#xe643;</div>
		<h1 class="inline-block title cursor" @click="toHome">贷款系统</h1>
		<div v-if="showTextTitle" style="position: absolute; top: 50%; left: 50%;font-size: 30px;margin: -22px 0 0 -60px;color: #b30d0d;">测试环境</div>
		<ul class="fr">
			<li>
				<el-dropdown trigger="click">
					<span class="iconfont cursor color-white">&#xe604;</span>
					<el-dropdown-menu slot="dropdown" class="noticeSetList">
						<div class="noticeSet-item">
							<span>进件审核通知：</span>
							<el-switch v-model="audit" class="block" on-text="" off-text=""></el-switch>
						</div>
						<div class="noticeSet-item">
							<span>待放款通知：</span>
							<el-switch v-model="waitRelease" class="block" on-text="" off-text=""></el-switch>
						</div>
						<div class="noticeSet-item">
							<span>放款失败通知：</span>
							<el-switch v-model="releaseFail" class="block" on-text="" off-text=""></el-switch>
						</div>
						<div class="noticeSet-item">
							<span>还款失败：</span>
							<el-switch v-model="backFail" class="block" on-text="" off-text=""></el-switch>
						</div>
					</el-dropdown-menu>
				</el-dropdown>
			</li>
			<li>
				<el-dropdown trigger="click">
					<span class="name" @click="handleUser">{{this.$store.state.app.logdDetail.realName.substr(this.$store.state.app.logdDetail.realName.length-2)}}</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item  @click.native="logout">退出</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</li>
		</ul>
	</header>
</template>
<script>
import { getlogdDetail, logout} from 'vuex'
export default{
	created() {
		window.setInterval(() => {
			this.setingNotice();
		}, 120000)
		window.setTimeout(res=>{
			this.setingNotice();
		},250)
		this.showTextTitle = (process.env.NODE_ENV !== 'production');
		if(window.location.hash=='#/login') return;
		this.$store.dispatch('getlogdDetail');
	},
	data (){
		return {
			showTextTitle: true,
			logdDetail: this.$store.state.app.logdDetail,
			audit: true,
			waitRelease: true,
			releaseFail: true,
			backFail: true,
		}
	},
	methods: {
		setingNotice() {
			let config = {
				audit: this.audit?1:0,
				waitRelease: this.waitRelease?1:0,
				releaseFail: this.releaseFail?1:0,
				backFail: this.backFail?1:0,
			}
			if(this.$router.currentRoute.path == '/login') return;
			//通知
			this.$http.post('/loan/notice', config).then(res => {
				let body = res.data.body;
				if(!body) return;
				if(!body.auditNumber && !body.waitReleaseNumber && !body.releaseFailNumber && !body.backFailNumber) return;
				let message = '';
				if(body.auditNumber) {
					message += '进件数量'+body.auditNumber+'个，'
				}
				if(body.waitReleaseNumber) {
					message += '待放款数量'+body.waitReleaseNumber+'个，'
				}
				if(body.releaseFailNumber) {
					message += '放款失败数量'+body.releaseFailNumber+'个，'
				}
				if(body.backFailNumber) {
					message += '还款失败数量'+body.backFailNumber+'个，'
				}
				this.$notify.info({
		    		title: '有新消息',
		     		message: '现在有'+message+'请加紧哦^_^',
		        });
			})
		},
		toggleMenu() {
			Vue.observer.$emit('toggleMenu', 1);
		},
		toHome() {
			this.$router.push({path: '/'});
		},
		handleUser() {
			if(this.$store.state.app.logdDetail.realName == '登录' && !this.$store.state.app.logdDetail.role) {
				this.$router.push({path: '/login'});
				return;
			}
		},
		logout() {
			this.$store.dispatch('logout').then(res => {
				if(typeof(res) == 'string') {
					res = JSON.parse(res)
				}
				let head = res.head||{};
				if(head.code == '100') {
					this.$message.success(head.message);
					// localStorage.setItem('_back', 1)
					this.$router.push({path: '/login'});
					return;
				}
				this.$message.error(head.message||"退出失败");
			})
		}
	}
}
</script>