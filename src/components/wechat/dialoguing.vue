<template>
  <div class="waitting_list wechat-list">
    <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
    <div v-for="(item, index) in show_data" :key="index">
      <swiperSlide class="wait-slot" :list_data="show_data" :index="index">
        <div slot="doiag"  @click="href_message(item, index)">
          <div class="img">
            <img :src="item.customer_wx_portrait">
            <circlej :data="item"></circlej>
          </div>
          <div class="msg-info">
            <h1>{{item.customer_wx_nickname}}</h1>
            <div class="bot-msg">
              <span>{{item.app_name}}</span>
              <p>{{item.add_time}}</p>
            </div>
          </div>
        </div>
      </swiperSlide>
    </div>
  </div>
</template>

<script>
import swiperSlide from './swiper_slide'
import webDB from '@/api/webDB'
import localforage from 'localforage'
import circlej from './circle'
import { resolve } from 'url';
import { setTimeout } from 'timers';

export default {
  components: {
    swiperSlide,
    circlej
  },
  data() {
    return {
      show_data: [] // 对话页要展示的数据
    }
  },
  watch: {
    type_delete_dialogue: function(val) {
      let that = this
      webDB.get_dialogue_up_data().then((result) => {
        this.show_data = undefined
        new Promise((resolve) => {
          resolve(result)
        }).then((result) => {
            that.show_data = result
          })
      })
      // this.$store.commit('Set_jiaobiao_status')
      this.$store.commit('synec_false')
    }
  },
  computed: {
    type_delete_dialogue: function() {
      return this.$store.state.user.synec
    }
  },
  methods: {
    getData() {
      webDB.get_dialogue_up_data().then((result) => {
        this.show_data = result
      })
    },
    wait_ev() {
      let store = localforage.createInstance({
          name: localStorage.getItem('uid') + 'mysql'
      })
      let that = this
      let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
      let dataArr = []
      dataArr.push(this.$store.state.user.wechat_dialogue_data)
      if (this.$store.state.user.wechat_dialogue_data) {
        webDB.set_dialogue_up_data(dataArr, db, this)
      }
    },
    href_message(data, index) {
      let user_info = {
        appid: data.appid,
        customer_wx_nickname: data.customer_wx_nickname,
        app_name: data.app_name,
        session_frequency: data.session_frequency,
        add_time: data.add_time,
        company_id: data.company_id,
        customer_wx_openid: data.customer_wx_openid,
        uid: data.uid
      }
      this.$router.push({ name: '消息发送页', query: {status: 1}})
      localStorage.setItem('user_info', JSON.stringify(user_info))
      localStorage.setItem('user_openid', data.customer_wx_openid) // 会话进入聊天页面, 设置openid到 localStroge
      localStorage.setItem('session_id', data.session_id) // 会话进入聊天页面, session_id localStroge
      localStorage.setItem('user_head_pc', data.customer_wx_portrait) // 会话进入聊天页面, 设置用户头像到 localStroge
      webDB.remove_message_length(data.customer_wx_openid)
    }
  },
  mounted () {
    this.wait_ev()
    this.getData()
    this.$store.commit('set_dialogue_header_status')
  }
}
</script>

<style lang="less">
  .list-row {
    border-bottom: 1px solid #E6E6E6
  }
  div {font-family: "微软雅黑"}
  .wait-slot{
    overflow: hidden;
    .img{
      width: 120px;
      border-radius: 10px;
      float: left;
      position: relative;
      img {
        width: 100%
      }
      .span{
        display: inline-block;
        width: 40px;
        height: 40px;
        background: red;
        position: absolute;
        top: 0;
        right: -10px;
        border-radius: 50%;
        color: #fff;
        text-align: center;
        line-height: 40px
      }
    }
    .msg-info {
      float: right;
      width: 80%;
      height: 120px;
      position: relative;
      h1 {
        color: #333333;
        font-size: 30px;
        font-weight: bold
      }
      .bring {
        width: 200px;
        height: 50px;
        background: #008BE8;
        color: #fff;
        text-align: center;
        line-height: 50px;
        position: absolute;
        right: 0;
        font-weight: bold;
        font-size: 20px;
        border-radius: 25px;
        top: 15px
      }
      .bot-msg {
        position: absolute;
        width: 100%;
        bottom: 0;
        left: 0;
        span {
          float: left;
          color: #999999;
          font-size: 20px;
        }
        p {
          float: right;
          color: #999999;
          font-size: 20px;
        }
      }
    }
  }
  .weui-dialog {
    width: 80% !important;
    max-width: 80% !important
  }
  .weui-dialog__ft {
    height: 80px;
    line-height: 80px
  }
</style>
