<template>
	<div class="wrapper-dialog">
		<div class="login-box">
			<div class="line">
				<label for="username" class="word">用户ERP</label>
				<input type="text" class="user-name" id="username" v-model="useErp"/>
			</div>
			<div class="line">
				<label for="userword" class="word">用户密码</label>
				<input type="password" class="user-word" id="userword" v-model="usePass" />
			</div>
			<div class="btns" @click="loginFun">登陆</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import {userLogin} from "@/api";

export default {
	components: {},
	data() {
		return {
			useErp:"",
			usePass:""
		};
	},
	created() {},
	mounted() {

	},
	destroyed() {},
	methods: {
		async loginFun(){
			let transData = {
				useErp:this.useErp,
				usePassWord:this.usePass
			}
			let res  = await userLogin(transData);
			if(res.success){
				sessionStorage.setItem("currUser", JSON.stringify(res));
				this.$router.push("/main");
			}else{
				this.$toast.text('账号或者密码不正确');
			}
		}
	}
};
</script>
<style lang="scss">
.wrapper-dialog{
	.login-box{
		width: 500px;
		height: 300px;
		background: #eee;
		position: absolute;
		top:50%;
		left: 50%;
        transform: translate(-50%,-50%);
		padding:20px;
		.line{
			height: 100px;
			line-height: 100px;
			width: 100%;
			display: flex;
			align-items: center;
			.word{
				width: 80px;
			}
			.user-name, .user-word{
				flex:1;
				height: 50px;
				line-height: 50px;
				border: 1px solid #999;
			}
		}
		.btns{
			margin:10px auto;
			height: 50px;
			line-height: 50px;
			width: 100px;
			text-align: center;
			background: red;
			color: #fff;
			cursor: pointer;
		}
	}
}

</style>
