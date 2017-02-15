<template>
	<div class="login-wrap">
		<el-card class="box-card login">
			<form class="el-form demo-form-stacked el-form--label-top" v-on:submit.prevent="login($event)">
				<div class="login-title">贷款系统</div>
				<div class="el-form-item is-required">
					<label class="el-form-item__label">用户</label>
					<div class="el-form-item__content">
						<div class="el-input">
							<input type="text" class="el-input__inner" v-model="loginForm.username">
						</div>
					</div>
				</div>
				<div class="el-form-item is-required">
					<label class="el-form-item__label">密码</label>
					<div class="el-form-item__content">
						<div class="el-input">
							<input type="password" class="el-input__inner" v-model="loginForm.password">
						</div>
					</div>
				</div>
				<button type="submit" class="el-button login-btn el-button--success">登录</button>
			</form>
		</el-card>
	</div>
</template>

<script>
import { getSnsLogins } from 'vuex'
export default{
	data:function(){
		return {
			loginBtn: {
				loading: false,
				text: '登录'
			},
			loginForm: {
				username: '',
				password: '',
			},
		}
	},
	methods: {
		login: function(e){
			if(!this.loginForm.username || !this.loginForm.password) {
				this.$message.error('账号或密码不能为空');
				return false;
			}
			this.loginBtn = {
				loading: true,
				text: '登录中...',
			};
            this.$store.dispatch('getSnsLogins',this.loginForm).then(res => {
            	if(typeof(res) == 'string') {
            		res = JSON.parse(res)
            	}
            	let head = res.head||{};
            	if(head.code != '100') {
            		this.loginBtn = {
            			loading: false,
            			text: '登录',
            		}
            		this.$message.error(head.message||'登录失败');
            		return;
            	}
            	let _b_u = localStorage.getItem('_b_u');
            	if(_b_u) {
            		localStorage.removeItem('_b_u');
            		this.$router.push({path:_b_u});
            		// this.$router.go(-1)
            	} else {
            		this.$router.push({path:'/'});
            	}
            	this.$store.dispatch('getlogdDetail')
            	this.$store.dispatch('getUserDirectoryList');
            });
            return false;
		}
	}
}
</script>