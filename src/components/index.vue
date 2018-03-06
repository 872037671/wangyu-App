<template>
  <div class="login-box" style="background: #FBF9FE">
    <x-header :left-options="{showBack: false}">首页</x-header>
    <div class="wrap">
      <grid class="head-info">
        <grid-item v-for="i in 1" :key="i">
          <div class="box">
            <div class="img"></div>
            <div class="text-info">
              <h3>刘明</h3>
              <p>惠州客服部</p>
            </div>
          </div>
          <div class="icon-right"></div>
        </grid-item>
      </grid>
      <grid class="erweima">
        <grid-item v-for="i in 1" :key="i">
          <div class="box">
            <p class="text">推广二维码</p>
            <div class="img"></div>
          </div>
          <div class="icon-right"></div>
        </grid-item>
      </grid>
      <grid class="erweima">
        <grid-item v-for="i in 1" :key="i">
          <div class="box">
            <p class="text">我的粉丝</p>
            <p class="propeo-num">12345</p>
          </div>
          <div class="icon-right"></div>
        </grid-item>
      </grid>
      <grid class="erweima">
        <grid-item v-for="i in 1" :key="i">
          <div class="box">
            <p class="text">设置</p>
          </div>
          <div class="icon-right"></div>
        </grid-item>
      </grid>
      <grid class="erweima">
        <grid-item v-for="i in 1" :key="i">
          <div class="box">
            <p class="text">关于网鱼服务营销系统</p>
          </div>
          <div class="icon-right"></div>
        </grid-item>
      </grid>
    </div>

    <alert v-model="show" title="测试" content="演示"></alert>
  </div>
</template>

<script>
  import { XHeader, Grid, GridItem, GroupTitle} from 'vux'
  import wechat from "@/api/wechat"
  import { Alert } from 'vux'

  window.mixin = mixin // 将 混合/mixin 暴露在窗口对象中，某些组件需要时，直接提取 window.mixin
  export default {
    components: {
      XHeader,
      Grid,
      GridItem,
      GroupTitle,
      Alert
    },
    data() {
      return {
        show: true
      }
    },
    watch: {
    },
    beforeRouteLeave (to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      console.log(to);
      next()
    },
    methods: {
      loginFun () {
        this.$router.push({
          name: '会话'
        })
      },
      test () {
        wechat.getHistoricalConversation({
          data: {
            phone_no: 123,
            password: 3333
          },
          success: (response) => {
            cosnole.log(response);
          },
          error: (response) => {
            cosnole.log(response);
          }
        });
      }
    },
    created () {
      console.log(this.$route.query);
      this.test();
    }
  }
</script>
<style lang="less">
.wrap {
  .icon-right {
    width: 60px;
    height: 60px;
    background: url('../assets/bg/ico_jian_right.png') no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto
  }
  .box {
    width: 85%;
    overflow: hidden;
    margin-left: 5%
  }
  .head-info {
    position: relative;
    .img {
      width: 100px;
      height: 100px;
      border: 1px solid red;
      float: left;
    }
    .text-info {
      float: left;
      margin-left:20px;
      h3 {
        font-size: 40px;
        color: #333
      }
      p {
        font-size: 30px;
        color: #666;
      }
    }
  }
  .erweima {
    line-height: 100px;
    .text {
      float: left;
      font-size: 30px
    }
    .img {
      float: right;
      width: 100px;
      height: 100px;
      border: 1px solid red;
      margin-right: ;
    }
    .propeo-num {
      float: right;
      font-size: 30px
    }
  }
}
</style>
