<style lang="less" scoped>
    @import "../assets/css/base/fn";

    .bg {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #1c2438;
    }

    .login {
        position: absolute;
        width: 400px;
        height: 360px;
        border-radius: 6px;
        border: 1px solid @border-color;
        box-shadow: 0 0 6px rgba(0, 0, 0, .2);
        top: 50%;
        left: 50%;
        margin-left: -200px;
        margin-top: -180px;
        background-color: #fff;
        padding: 70px 30px 0;
    }

    .form-item {
        margin-bottom: 20px;
    }
</style>
<template>
    <div class="bg" @keyup.enter="onLogin">
        <div class="login">
            <div class="form-item">
                <Input v-model="userName" placeholder="请输入用户名" size="large">
                <Button slot="prepend" icon="person"></Button>
                </Input>
            </div>
            <div class="form-item">
                <Input v-model="pwd" type="password" placeholder="请输入密码" size="large">
                <Button slot="prepend" icon="locked"></Button>
                </Input>
            </div>
            <div class="form-item">
                <Checkbox v-model="rememberMe">记住我</Checkbox>
            </div>
            <Button type="primary" size="large" @click="onLogin" long>登录</Button>
        </div>
    </div>
</template>
<script>
    import api from 'service/system'
    import storage from 'util/storage'
    export default{
        data(){
            return {
                userName: '',
                pwd: '',
                rememberMe: true
            }
        },
        mounted(){
            //account localStorage作为存储记住账户密码的
            let account = storage.getAccount()
            if (account&&account.rememberMe) {
                this.userName = account.userName
                this.pwd = account.pwd
                this.rememberMe = account.rememberMe
            }
            //username localStorage作为存储当前用户是否登录过了，只要不点退出按钮就一直处于登录状态，哪怕是重新打开浏览器
            /*if (storage.getUserName()) {
                this.$router.replace('/')
            }*/
        },
        methods: {
            onLogin(){
                let userName=this.userName.trim()
                if(!userName||!this.pwd){
                   return this.$Message.warning('请输入账号和密码')
                }
                api.loginIn({phone:userName,password:this.pwd,type:'password'})
                    .then(({data}) => {
                        if (this.rememberMe) {
                            storage.setAccount(JSON.stringify({
                                userName: this.userName,
                                pwd: this.pwd,
                                rememberMe: this.rememberMe,
                            }))
                        } else {
                            storage.setAccount()
                        }
                        storage.setUserName(userName)
                        storage.setToken(data.token)
                      console.log('token:',data.token)
                        this.$router.replace('/')
                    })
            }
        }
    }
</script>
