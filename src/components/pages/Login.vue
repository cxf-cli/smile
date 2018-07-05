<template>
  <div>
    <van-nav-bar
      title="用户登录"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div class="login-panel">
      <van-field
        v-model="username"
        label="用户名"
        icon="clear"
        placeholder="请输入用户名"
        required
        @click-icon="username=''"
        :error-message="usernameErrorMsg"
      />
      <van-field
        v-model="password"
        label="密码"
        type="password"
        placeholder="请输入密码"
        :error-message="passwordErrorMsg"
        required
      />
      <div class="login-button">
        <van-button type="primary" @click="loginAction" :loading="openLoading" size="large">登录</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import url from '@/serviceAPI.config.js';
import { Toast } from 'vant';
export default {
	data() {
		return {
			username: '',
			password: '',
			openLoading: false, //是否开启用户的Loading
			usernameErrorMsg: '', //当用户名出现错误的时候
			passwordErrorMsg: '', //当密码出现错误的时候
		};
  },
  created(){
    if(localStorage.userInfo){
      Toast.success('您已经登陆过了');
			this.$router.push('/');
    }
  },
	methods: {
		goBack() {
			this.$router.go(-1);
		},
		loginAction() {
			this.checkForm() && this.axiosLoginUser();
		},
		axiosLoginUser() {
      this.openLoading = true;
      this.$graphql.request(`
        mutation{
          UserLogin(data:{
            userName: "${this.username}",
            password: "${this.password}"
          }){
            code
            message
          }
        }
      `).then(res=>{
        console.log(res)
        if(res.UserLogin.code === 200 && res.UserLogin.message === true){
          new Promise((resolve,reject)=>{
            localStorage.userInfo = {userName: this.username}
            setTimeout(()=>{
              resolve()
            },500)
          }).then(()=>{
            Toast.success('登录成功');
				    this.$router.push('/');
          }).catch(e=>{
            Toast.fail('登录状态保存失败'+e);
          })
        }else{
          Toast.fail('登录失败');
          this.openLoading = false;
        }
      }).catch(e=>{
        Toast.fail('登录失败');
        this.openLoading = false;
      })
			// axios({
			// 	url: url.loginUser,
			// 	method: 'post',
			// 	data: {
			// 		userName: this.username,
			// 		password: this.password,
			// 	},
			// })
			// 	.then(res => {
      //     console.log(res)
			// 		// //如果返回code为200，代表注册成功，我们给用户作Toast提示
			// 		// if (res.data.code == 200) {
			// 		// 	Toast.success('注册成功');
			// 		// 	this.$router.push('/');
			// 		// } else {
			// 		// 	console.log(res.data.message);
			// 		// 	Toast.fail('注册失败');
			// 		// 	this.openLoading = false;
			// 		// }
			// 	})
			// 	.catch(e => {
			// 		// Toast.fail('注册失败');
			// 		// this.openLoading = false;
			// 	});
		},
		//表单验证
		checkForm() {
			let isOk = true;
			if (this.username.length < 5) {
				this.usernameErrorMsg = '用户名不能小于5位';
				isOk = false;
			} else {
				this.usernameErrorMsg = '';
			}
			if (this.password.length < 6) {
				this.passwordErrorMsg = '密码不能少于6位';
				isOk = false;
			} else {
				this.passwordErrorMsg = '';
			}
			return isOk;
		},
	},
};
</script>

<style lang="scss" scoped>
.login-panel {
	width: 96%;
	border-radius: 5px;
	margin: 20px auto;
	padding-bottom: 80px;
}
.login-button {
	padding-top: 10px;
}
</style>
