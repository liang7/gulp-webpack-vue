<template>
	<nav class="nav-content">
		<div class="nav-b" :class="[hideMenu?'on':'']">
<!-- 			<ul class="nav-list">
				<li v-for="item in this.$store.state.app.directoryList">
					<router-link v-bind:to="'/'+item.url" class="box" v-if="!item.childs">
						<i class="iconfont-before" v-bind:class="item.icon"></i>
						<span class="ellipsis flex">{{item.name}}</span>
					</router-link>
					<a v-if="item.childs" href="javascript:void(0)" class="box" @click="collapse($event)" :class="[item.model == controller?'active':'']">
						<i class="iconfont-before" v-bind:class="item.icon"></i>
						<span class="ellipsis flex">{{item.name}}</span>
						<i class="el-icon-arrow-right" v-if="item.childs"></i>
					</a>
					<ul v-if="item.childs" class="nav-list">
						<li v-for="sub in item.childs">
							<router-link v-bind:to="'/'+sub.url" class="box">
								<span class="ellipsis flex">{{sub.name}}</span>
							</router-link>
						</li>
					</ul>
				</li>
			</ul> -->
			<ul class="nav-list">
				<li>
					<router-link :to="'/dashboard'" class="box">
						<i class="iconfont-before icon-dashboard"></i>
						<span class="ellipsis flex">Dashboard</span>
					</router-link>
				</li>
				<li>
					<router-link :to="'/audit/list'" class="box">
						<i class="iconfont-before icon-audit"></i>
						<span class="ellipsis flex">进件审核</span>
					</router-link>
				</li>
				<li>
					<router-link :to="'/dun/list'" class="box">
						<i class="iconfont-before icon-dun"></i>
						<span class="ellipsis flex">催收</span>
					</router-link>
				</li>
				<li>
					<a href="javascript:void(0)" class="box" @click="collapse($event)">
						<i class="iconfont-before icon-report"></i>
						<span class="ellipsis flex">报表</span>
						<i class="el-icon-arrow-right"></i>
					</a>
					<ul class="nav-list">
						<li>
							<router-link :to="'/report/operationReport'" class="box">
								<span class="ellipsis flex">运营报表</span>
							</router-link>
						</li>
						<li>
							<router-link :to="'/report/auditReport'" class="box">
								<span class="ellipsis flex">信审报表</span>
							</router-link>
						</li>
						<li>
							<router-link :to="'/report/financeReport'" class="box">
								<span class="ellipsis flex">财务报表</span>
							</router-link>
						</li>
						<li>
							<router-link :to="'/report/dunReport'" class="box">
								<span class="ellipsis flex">催收报表</span>
							</router-link>
						</li>
						<li>
							<router-link :to="'/report/dundailyreport'" class="box">
								<span class="ellipsis flex">催收日报</span>
							</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0)" class="box" @click="collapse($event)">
						<i class="iconfont-before icon-finance"></i>
						<span class="ellipsis flex">财务</span>
						<i class="el-icon-arrow-right"></i>
					</a>
					<ul class="nav-list">
						<li>
							<router-link :to="'/finance/releaseList'" class="box">
								<span class="ellipsis flex">放款</span>
							</router-link>
						</li>
						<li>
							<router-link :to="'/finance/backList'" class="box">
								<span class="ellipsis flex">还款</span>
							</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0)" class="box" @click="collapse($event)">
						<i class="iconfont-before icon-sets"></i>
						<span class="ellipsis flex">设置</span>
						<i class="el-icon-arrow-right"></i>
					</a>
					<ul class="nav-list">
						<li>
							<router-link :to="'/sets/paysetslist'" class="box">
								<span class="ellipsis flex">支付渠道设置</span>
							</router-link>
						</li>
					</ul>
				</li>
				<li> 
					<a href="javascript:void(0)" class="box" @click="collapse($event)">
						<i class="iconfont-before icon-black"></i>
						<span class="ellipsis flex">特殊名单</span>
						<i class="el-icon-arrow-right"></i>
					</a>
					<ul class="nav-list">
						<li>
							<router-link :to="'/black/blacklist'" class="box">
								<span class="ellipsis flex">特殊名单明细</span>
							</router-link>
						</li>
					</ul>
				</li>
				<li>
					<a href="javascript:void(0)" class="box" @click="collapse($event)">
						<i class="iconfont-before icon-cs"></i>
						<span class="ellipsis flex">客服</span>
						<i class="el-icon-arrow-right"></i>
					</a>
					<ul class="nav-list">
						<li>
							<router-link :to="'/cs/csReleaseList'" class="box">
								<span class="ellipsis flex">放款处理</span>
							</router-link>
						</li>
						<li>
							<router-link :to="'/cs/backList'" class="box">
								<span class="ellipsis flex">还款处理</span>
							</router-link>
						</li>
					</ul>
				</li>
			</ul>
		</div>
	</nav>
</template>	

<script>
import { getUserDirectoryList } from 'vuex'
export default{
	created() {
		if(Vue.com.getQueryString('nomenu') == '1'||window.location.hash=='#/login') return;
		this.$store.dispatch('getUserDirectoryList').then(res => {
			let path = this.$router.currentRoute.path;
			let l_ndexOf = path.lastIndexOf('/');
			if(l_ndexOf<1) return;
			this.controller = path.substring(1,l_ndexOf);
		})
	},
	mounted(){	
		Vue.observer.$on('toggleMenu', (config) =>{
			this.hideMenu = !this.hideMenu;
		})
	},
	data:function(){
		return {
			hideMenu: false,
			controller: ''
		}
	},
	methods: {
		collapse(e) {
			let target = e.target;
			if(e.target.tagName != 'A') {
				target = e.target.parentElement
			};
			if(target.className.indexOf('active')>-1) {
				target.className = "box";
			} else {
				target.className = 'box active';
			}
			return false;
		},
	}
}
</script>