<template>
  <div class="waitting_list wechat-list">
    <!--自定义指令 v-swiper 用于对每个消息进行滑动处理-->
    <div class="wait-slot" v-for="item in dialoguing_list" :key="item.wx_user_id" @click="bring_dialogue(item)">
      <div class="delete">
        <div class="slider">
          <div class="content">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import swiperSlide from './swiper_slide'
import webDB from '@/api/webDB'
import { setTimeout, setInterval } from 'timers';
import myself from '@/api/myself'

export default {
  components: {
    swiperSlide
  },
  data() {
    return {
      dialoguing_list: []
    }
  },
  methods: {
    wait_ev() {
      let that = this
      if (this.$store.state.user.quque_status == 1) {
        this.dialoguing_list =  this.$store.state.user.queue_up_data
      }
    },
    // 接入到会话
    bring_dialogue(data) {
      let that = this
      myself.accessQueuingSession({
        data: {
          'session_id': data.session_id
        },
        success: (result) => {
          that.$store.commit('set_wechat_dialogue_data', data) // 传数据到对话界面
          that.$store.commit('set_dialoguing', 1) // 接入到对话页面
          that.$router.push({ query: { status: 1 }})
          that.$store.commit('set_dialogue_tab')
          that.$router.push({ query: { status: 1 }})
        }
      })
    }
  },
  mounted () {
    this.wait_ev()
    let that = this
    setInterval(that.wait_ev,3000)
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
