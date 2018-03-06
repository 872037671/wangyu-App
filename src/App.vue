<template>
    <div id="app">
        <div class="zhe-box" v-show="this.$store.state.zhe_box"></div> <!-- 遮罩层 -->
        <!--<welcome></welcome>-->
        <div class="outter"  :class="{'hideLeft':$route.path.split('/').length>2}">
            <!--通用头部-->
            <header v-if="linkName != '登陆' && linkName != '首页' && linkName != '我的资料' && linkName != '设置头像' && linkName != '设置名字' && this.linkName != '设置性别' && this.linkName != '我的二维码'
             && this.linkName != '设置个人签名'"  class="app-header" :class="{'header-hide':!$store.state.headerStatus}">
                <wx-header :pageName="pageName"></wx-header>
            </header>
            <!--搜索框 只在“微信”和“通讯录”页面下显示-->
            <!-- <search v-if="linkName != '登陆' && linkName != '客资' && linkName != '业务跟踪' && linkName != '统计分析' && linkName != '首页' && linkName != '设置头像' && linkName != '设置名字' && this.linkName != '设置性别' && this.linkName != '我的二维码'
             && this.linkName != '设置个人签名'"
            v-show="$route.path.indexOf('explore')===-1&&$route.path.indexOf('self')===-1"></search> -->
            <!--四个门面页 “微信” “通讯录” “发现” “我”-->
            <section  class="app-content" :class="{ height100: isheight100 }">
                <!-- <keep-alive>
                    <router-view name="default" ></router-view>
                </keep-alive> -->
                <router-view name="default" ></router-view>
            </section>
            <!--底部导航 路由 -->
            <footer v-if="linkName != '登陆'"  class="app-footer">
                <wx-nav v-if="is_tab"></wx-nav>
            </footer>
        </div>
        <!--其他店内页集合 有过渡效果-->
        <transition name="custom-classes-transition" :enter-active-class="enterAnimate" :leave-active-class="leaveAnimate">
            <router-view name="subPage" class="sub-page"></router-view>
        </transition>
    </div>
</template>

<script>
    import welcome from './components/common/welcome.vue'
    import WxHeader from './components/common/wx-header'
    import WxNav from './components/common/wx-nav'
    import localforage from 'localforage' // 本地数据库
    import webDB from '@/api/webDB'
    import wechat from "@/api/wechat"
    import myself from '@/api/myself'
    import local from '@/api/local'
    import ReconnectingWebSocket from 'ReconnectingWebSocket'
    import search from './components/common/search'
    import mixin from "./vuex/mixin.js" // 混合被单独放在 mixin.js 中管理
import { setInterval, clearInterval, setTimeout } from 'timers';
import { resolve } from 'url';
    window.mixin = mixin // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin
    export default {
        name: 'app',
        components: {
            WxHeader,
            WxNav,
            search,
            welcome
        },
        data() {
            return {
                "pageName": "",
                "routerAnimate": false,
                "enterAnimate": "", //页面进入动效
                "leaveAnimate": "", //页面离开动效
                linkName: '',
                store: '',
                isheight100: false,
                HeartBeat_data: {
                    "type":"auth",
                    "uid": localStorage.getItem('uid'),
                    "token": localStorage.getItem('token'),
                    "client":"ios",
                    "company_id": localStorage.getItem('company_id'),
                },
                HeartBeat_6: {
                    "type": "get_lineup_session",
                    "client": "ios",
                    "uid": localStorage.getItem('uid'),
                },
                db_data: {
                    waiting: [],
                    queue_up: [],
                    message_dialogue: []
                },
                ws: null,
                webSQL: null,
                lockReconnect: false, // 避免重复连接
                wsUrl: 'ws://kf.lyfz.net:8282',
                heartCheck: {
                    timeout: 3000,//60秒
                    that: this,
                    reset: function(){
                        clearInterval(this.timeoutObj1);
                        return this;
                    },
                    reset2: function(){
                        clearInterval(this.timeoutObj2);
                        return this;
                    },
                    start_three: function() {
                        var self = this;
                        this.timeoutObj1 = setInterval(function() {
                            self.that.ws.send(JSON.stringify(self.that.HeartBeat_6));
                        }, 3000)
                    },
                    start_six: function() {
                        var self = this;
                        this.timeoutObj2 = setInterval(function() {
                            self.that.ws.send('{"type":"ping","client":"ios"}');
                        }, 6000)
                    },
                },
              is_tab: false
            }
        },
        watch: {
            // 监听 $route 为店内页设置不同的过渡效果
            "$route" (to, from) {
              if (this.$route.query.login_data) {
                let data = JSON.parse(this.$route.query.login_data)
                this.href_set_log(data)
              }
              // 控制底部导航隐藏
              if (this.$route.query.is_tab == '0') {
                this.is_tab = false
              } else {
                this.is_tab = true
                // if (this.$route.name == '会话') {
                this.createWebSocket(this.wsUrl)
                // }
              }
              if (to.name == '登陆') {
                // localStorage.setItem('token', null)
              } else {
                this.HeartBeat_data.token = localStorage.getItem('token') // 如果已经登陆成功并设置好了token，去拿token的值给ws
                if (this.$store.state.user.ws_status && this.$route.query.login_data == undefined) {
                  // this.createWebSocket(this.wsUrl)
                  this.$store.commit('SET_WS_TOKEN_STATUS_false')
                }
              }
              this.linkName = to.name;
              this.pageName = to.name
                if (this.linkName == '登陆' || this.linkName == '首页' || this.linkName == '我的资料' || this.linkName == '统计分析' || this.linkName == '设置头像' || this.linkName == '设置名字' || this.linkName == '设置性别' || this.linkName == '我的二维码' || this.linkName == '设置个人签名') {
                    this.isheight100 = true
                } else {
                    this.isheight100 = false
                }
                const toDepth = to.path.split('/').length
                const fromDepth = from.path.split('/').length
                if (toDepth === 2) {
                    this.$store.commit("setPageName", to.name)
                }
                //同一级页面无需设置过渡效果
                if (toDepth === fromDepth) {
                    return;
                }
                this.enterAnimate = toDepth > fromDepth ? "animated fadeInRight" : "animated fadeInLeft"
                this.leaveAnimate = toDepth > fromDepth ? "animated fadeOutLeft" : "animated fadeOutRight"
                    // 从店面页进入店内页 需要对店内页重新设置离开动效 因为他们处于不同 name 的 router-view
                if (toDepth === 3) {
                    this.leaveAnimate = "animated fadeOutRight"
                }
            }
        },
        methods: {
            createWebSocket(url) {
            	this.ws = new ReconnectingWebSocket(url);
            	this.initEventHandle();
            },
            href_set_log(data) {
              this.$store.commit('SET_WS_TOKEN_STATUS_false')
              localStorage.setItem('avatar_url', data.body.avatar_url)
              localStorage.setItem('username', data.body.username)
              localStorage.setItem('address', data.body.address)
              localStorage.setItem('phone_no', data.body.phone_no)
              localStorage.setItem('uid', data.body.uid)
              localStorage.setItem('company_id', data.body.company_id)
              localStorage.setItem('client', 'ios')
              localStorage.setItem('token', data.body.login_token)
              localStorage.setItem('autostarh', data.body.autograph)
              // this.$router.push({ name: '会话', query: { status: 1 }})
            },
            getSessionList() {
              let that = this
              wechat.getSessionList({
                success: (result) => {
                  that.store = localforage.createInstance({
                    name: localStorage.getItem('uid') + 'mysql'
                  })
                  let arr = []
                  let watting_arr = []
                  let dialogue_arr = []
                  let dialogue_store = localforage.createInstance({
                      name: localStorage.getItem('uid') + 'mysql',
                      storeName: 'dialogue'
                  });
                  let watting_store = localforage.createInstance({
                      name: localStorage.getItem('uid') + 'mysql',
                      storeName: 'watting'
                  });
                  for (let val of result.body) {
                    arr.push(val)
                  }
                  for (let val2 of arr) {
                    if (val2.state == 0) {
                      watting_arr.push(val2)
                    } else if (val2.state == 1) {
                      dialogue_arr.push(val2)
                    }
                  }
                  // 等待中的操作
                  function waitting_up_data_fn() {
                    webDB.set_watting_data(watting_arr, that.store)
                  }
                  watting_store.keys().then(function(keys) {
                    if (keys.length == 0) {
                      waitting_up_data_fn()
                    } else {
                      for (let [key_index, key] of keys.entries()) {
                        watting_store.removeItem(key)
                        if (key_index == keys.length - 1) {
                          waitting_up_data_fn()
                        }
                      }
                    }
                  })
                  // 会话的操作
                  webDB.set_dialogue_up_data(dialogue_arr, this.webSQL, that)
                  // 会话中的操作
                  // function set_dialogue_up_data_fn() {
                  //   for (let dialogue_up_val of dialogue_arr) {
                  //     webDB.set_dialogue_up_data(dialogue_up_val, that.store, that)
                  //   }
                  // }
                  // dialogue_store.keys().then(function(keys) {
                  //   if (keys.length == 0) {
                  //     set_dialogue_up_data_fn()
                  //   } else {
                  //     for (let [ket_index, key] of keys.entries()) {
                  //       dialogue_store.removeItem(key)
                  //       if (ket_index == keys.length - 1) {
                  //         set_dialogue_up_data_fn()
                  //       }
                  //     }
                  //   }
                  // })
                }
              })
            },
            // 接受消息触发
            take_up_message(data) {
              let json_value = ''
              let json_key = ''
              let message_json = null
              let that = this
              for (let i in data) {
                json_value = data[i]
                json_key = i
              }
              webDB.get_dialogue_up_data().then((result) => {
                for (let val of result) {
                  if (json_key == val.customer_wx_openid) {
                    fn()
                  }
                }
              })
              function fn() {
                local.take_up_message(that)
                for (let val of json_value) {
                  message_json = JSON.stringify(local.send_dialogue(that, val))
                  if (local.isAndroid) {
                    window['injectedAndroidObject']['notice'](message_json)
                  } else {
                      // this._invokeLocal('GoToLoginPage')
                  }
                }
              }
            },
            initEventHandle() {
                let that = this
                this.ws.onopen = function () {
                    //心跳检测重置
                    that.ws.send(JSON.stringify(that.HeartBeat_data));
                    that.heartCheck.reset2().start_six();
                    that.heartCheck.reset().start_three();
                    that.getSessionList()
                };
                this.ws.onmessage = function (event) {
                    that.listen_ws_data(event)
                }
           },
            creat_db() {
                // let request = indexedDB.open(localStorage.getItem('uid') + 'mysql')
                // indexedDB.deleteDatabase(localStorage.getItem('uid') + 'mysql')
                this.store = localforage.createInstance({
                    name: localStorage.getItem('uid') + 'mysql'
                })
                this.webSQL = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
                this.webSQL.transaction(function (tx) {
                  tx.executeSql('CREATE TABLE IF NOT EXISTS my (openid unique, value)');
                  // tx.executeSql('drop  table  my')
                });
            },
            listen_ws_data(event) {
              let that = this
                if (JSON.parse(event.data).body.type == 'message') {
                  let store = localforage.createInstance({
                      name: localStorage.getItem('uid') + 'mysql',
                      storeName: 'message_length'
                  });
                  this.message_dialogue = JSON.parse(event.data).body.sk_data
                  for (let val in this.message_dialogue) {
                    webDB.set_message_data(val, this.message_dialogue[val], this.store, this)
                    // 接受到消息后进行置顶
                    webDB.set_message_sort(val, this.message_dialogue[val], this.webSQL, this)
                    webDB.set_message_length(val, this.message_dialogue[val], store, this)

                  }
                  this.take_up_message(JSON.parse(event.data).body.sk_data) // 接受到消息安卓的调试
                } else if (JSON.parse(event.data).body.type == 'session') {
                    if (JSON.parse(event.data).body.sk_data) {
                        this.db_data.queue_up = JSON.parse(event.data).body.sk_data.queue_up
                        this.db_data.waiting = JSON.parse(event.data).body.sk_data.waiting
                        if (this.db_data.waiting.length !== 0) {
                            webDB.set_watting_data(this.db_data.waiting, this.store)
                            this.$store.commit('set_dialoguing', '1') // 一旦有等待中的消息就跳到会话页面
                            this.$router.push({ query: { status: 1 }}) // 一旦有等待中的消息就跳到会话页面
                        }
                        if (this.db_data.queue_up.length !== 0) {
                            // webDB.set_queue_up_data(this.db_data.queue_up, this.store)
                            this.$store.commit('set_queue_up', 1)
                            this.$store.commit('set_queue_up_data', this.db_data.queue_up)
                        }
                    }
                } else if (JSON.parse(event.data).body.type == 'access_session') { // 接入到等待中的数据
                  if (JSON.parse(event.data).body.sk_data.client == 'pc' || JSON.parse(event.data).body.sk_data.client == 'admin') { // 判断是否是pc端转接了会话
                    if (JSON.parse(event.data).body.sk_data.session_state == '0') {
                      webDB.access_session_waitting(JSON.parse(event.data).body.sk_data.customer_wx_openid, this.store).then((result) => {
                        webDB.remove_waitting(JSON.parse(event.data).body.sk_data.customer_wx_openid)
                        let dataArr = []
                        dataArr.push(result)
                        webDB.set_dialogue_up_data(dataArr, that.webSQL, that)
                      })
                    }
                  }
                } else if (JSON.parse(event.data).body.type == 'close_session') { // 进入删除会话中逻辑
                  if (JSON.parse(event.data).body.sk_data.client == 'pc' || JSON.parse(event.data).body.sk_data.client == 'admin') { // 判断是否是pc端转接了会话
                    if (JSON.parse(event.data).body.sk_data.session_state == '1') {
                      webDB.remove_dialogue(JSON.parse(event.data).body.sk_data.customer_wx_openid, that)
                      webDB.remove_message(JSON.parse(event.data).body.sk_data.customer_wx_openid)
                      webDB.remove_message_length(JSON.parse(event.data).body.sk_data.customer_wx_openid)
                    }
                  }
                }
            },
        },
        mounted () {
            this.creat_db()
        },
      created () {
      }
    }
</script>
<style>
    /*将公用的样式统一在此导入*/

    @import "assets/css/base.css";
    @import "assets/css/common.css";
    @import "assets/css/wx-header.css";
    @import "assets/css/lib/iconfont.css";
    /*阿里 fonticon*/

    @import "assets/css/jianrong.css";
    /*过渡效果需要的动画库*/


    @import "assets/css/font_icon/iconfont.css";
    /*公共icon  字体图标*/


    @import "assets/css/lib/animate.css";
    /*weui 样式库 非常适合高仿微信*/

    @import "assets/css/lib/weui.min.css";
    .zhe-box{
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 10;
        background: rgba(0,0,0,.5)
    }
    .height100 {
        top: 0 !important;
        bottom: 0 !important;
        background: #FBF9FE
    }
</style>
