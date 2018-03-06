<template>
  <div class="waitting_list wechat-list">
    <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
    <div v-for="(item, index) in waitting_list" :key="item.wx_user_id">
      <swiperSlide class="wait-slot" :wait_list_data="waitting_list" :wait_index="index">
        <div slot="waitting" @click="href_dialogue(item)">
          <img :src="item.customer_wx_portrait" alt="">
          <div class="msg-info">
            <h1>{{item.customer_wx_nickname}}</h1>
            <div class="bring">接入</div>
            <div class="bot-msg">
              <span>{{item.app_name}}</span>
              <p>等待时间：{{item.add_time}}</p>
            </div>
          </div>
        </div>
        <div v-show="false" slot="doiag">绘画中</div>
      </swiperSlide>
    </div>
  </div>
</template>

<script>
import swiperSlide from './swiper_slide'
import webDB from '@/api/webDB'
import myself from '@/api/myself'
import { Alert } from 'vux'
// import { DEFAULT_ECDH_CURVE } from 'tls';

export default {
  components: {
    swiperSlide,
    Alert
  },
  data() {
    return {
      status: this.$store.state.user.status,
      store: null,
      waitting_list: [],
      customer_wx_openid: this.$store.state.user.set_access_session_data
    }
  },
  watch: {
    status: function(val) {
      console.log(val)
    },
    "$route" (to, from) {
      let that = this
      if (to.query.type_delete) {
        webDB.get_waitting_data().then((result) => {
          that.waitting_list = result
          this.$router.push({ query: { status: 2, type_delete: undefined }})
        })
      }
    }
  },
  methods: {
    wait_ev() {
      let that = this
      webDB.get_waitting_data().then((result) => {
        that.waitting_list = result
      })
    },
    href_dialogue(data) {
      let that = this
      myself.sessionAccess({
        data: {
          session_id: data.session_id
        },
        success: (result) => {
          that.$vux.alert.show({
            content: '接入会话成功'
          })
          that.alert_show = true
          that.$store.commit('set_wechat_dialogue_data', data) // 传数据到对话界面
          that.$store.commit('set_dialoguing', 1) // 接入到对话页面
          that.$router.push({ query: { status: 1 }})
          webDB.remove_waitting(data.customer_wx_openid, that).then(() => {
            that.$store.commit('set_dialogue_tab')
          })
        },
        error: (res) => {
          console.log(res);
        }
      })
    }
  },
  mounted () {
    this.wait_ev()
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
    img{
      width: 120px;
      border-radius: 10px;
      float: left;
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
</style>
