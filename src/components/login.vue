<template>
  <div class="login-box">
    <!--<welcome></welcome>-->
     <div class="loogo">
     </div>
     <h3>网鱼服务营销系统</h3>
     <div class="form">
        <div class="list">
          <span class="iconfont icon-tel"></span>
          <input type="text" placeholder="请输入用户名" v-model="phone_no">
        </div>
       <div class="list">
         <span class="iconfont icon-suo"></span>
         <input type="password" placeholder="请输入密码" v-model="password">
       </div>
       <div class="sub" @click="loginFun">
         登陆
       </div>
     </div>
    <div class="register">
      <div>忘记密码</div>
      <div>没有账号？注册</div>
    </div>
  </div>
</template>

<script>
  import wechat from "@/api/wechat"
  import webDB from '@/api/webDB'
  import localforage from 'localforage' // 本地数据库
  import md5 from 'js-md5';
  let Base64 = require('js-base64').Base64;

  window.mixin = mixin // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin
  export default {
    name: 'app',
    components: {
    },
    data() {
      return {
        phone_no: '13627283512',
        avatar_url: '',
        password: '0110035814',
        store: null,
      }
    },
    watch: {
    },
    mounted () {
      // console.log(wechat)
    },
    methods: {
      loginFun () {
        this.test()
      },
      getSessionList() {
        // 开始登陆后处理数据库的逻辑
        let that = this
        wechat.getSessionList({
          success: (result) => {
            that.store = localforage.createInstance({
              name: localStorage.getItem('uid') + 'mysql'
            })
            for (let val of result.body) {
              if (val.state == 0) {
                that.store = localforage.createInstance({
                    name: localStorage.getItem('uid') + 'mysql',
                    storeName: 'waitting'
                });
                let arr = []
                arr.push(val)
                that.store.keys().then(function(keys) {
                  let p = new Promise((resolve, reject) => {
                    for (let i of keys) {
                      that.store.removeItem(i)
                    }
                    resolve()
                  })
                  p.then(() => {
                    webDB.set_watting_data(arr, that.store)
                  })
                })
              } else if (val.state == 1) {
                that.store = localforage.createInstance({
                    name: localStorage.getItem('uid') + 'mysql',
                    storeName: 'dialogue'
                });
                let arr = []
                arr.push(val)
                that.store.keys().then(function(keys) {
                  let p = new Promise((resolve, reject) => {
                    for (let i of keys) {
                      that.store.removeItem(i)
                    }
                    resolve()
                  })
                  p.then(() => {
                    webDB.set_dialogue_up_data(arr, that.store)
                  })
                })
              }
            }
          }
        })
      },
      test () {
        let that = this
        let pass = md5(this.password)
        if (this.$route.query.login_data) {

        } else {
          wechat.Login({
            data: {
              phone_no: this.phone_no,
              password: pass,
              client: 'ios',
              version: '0.9.33',
              client_network_mac: '3d58760a91f85373ec04702638bb9fa3'
            },
            success: (response) => {
              localStorage.setItem('avatar_url', response.body.avatar_url)
              localStorage.setItem('username', response.body.username)
              localStorage.setItem('address', response.body.address)
              localStorage.setItem('phone_no', response.body.phone_no)
              localStorage.setItem('uid', response.body.uid)
              localStorage.setItem('company_id', response.body.company_id)
              localStorage.setItem('client', 'ios')
              localStorage.setItem('token', '')
              localStorage.setItem('token', response.body.login_token)
              localStorage.setItem('autostarh', response.body.autograph)
              this.$router.push({ name: '会话', query: { status: 1 }})
              this.$store.commit('SET_WS_TOKEN_STATUS')
              // that.getSessionList()
              let webSQL = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
              webSQL.transaction(function (tx) {  
                // tx.executeSql('CREATE TABLE IF NOT EXISTS my (openid unique, value)');
                tx.executeSql('drop  table  my')
              });
            },
            error: (response) => {
  //          cosnole.log(response);
            }
          });
        }
      }
    },
    mounted () {
      this.$store.commit('SET_WS_TOKEN_STATUS_false')
    }
  }
</script>
<style>
  /*将公用的样式统一在此导入*/
  .app-content{
    padding-bottom: 0;
    overflow: hidden;
  }
  .login-box{
    background:url("../assets/images/login-bg.jpg");
    position: relative;
    height: 100%;
    width: 100%;
    background-size: 100% 100%;
    overflow: hidden;
  }
  .loogo{
    height: 160px;
    width: 160px;
    margin: 100px auto 0 auto;
    background-color: #fff;
    border-radius: 10px;
  }
  h3{
    padding: 5px 0;
    font-size: 30px;
    color: #fff;
    text-align: center;
  }
  .form{
    width: 430px;
    margin: 100px auto 0 auto;
    height: 280px;
    overflow: hidden;
  }
  .form .list{
    width: 100%;
    display: -webkit-box;
    box-sizing: border-box;
    border-bottom: 1px #fff solid;
    -webkit-box-align: center;
    padding: 15px 0;
    overflow: hidden;
  }
  .form .list span{
    display: -webkit-box;
    font-size: 36px;
    position: relative;
    left: -8px;
    color: #fff;
  }
  .form .list input{
    display: -webkit-box;
    outline: 0;
    border: 0;
    background-color: rgba(0,0,0,0);
    color: #fff;
  }
  ::-webkit-input-placeholder{
    color: #fff;
  }
  .sub{
    background-color: #2e99ed;
    height: 65px;
    text-align: center;
    line-height: 65px;
    color: #fff;
    font-size: 32px;
    border-radius: 30px;
    margin-top: 32px;
  }
  .register{
    width: 430px;
    height: 160px;
    margin: 100px auto 0 auto;
  }
  .register div:first-child{
    height: 80px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    box-sizing: border-box;
    border-bottom: 1px #fff solid;
    font-size: 30px;
  }
  .register div:last-child{
    height: 80px;
    line-height: 80px;
    color: #fff;
    text-align: center;
    font-size: 30px;
  }
</style>
