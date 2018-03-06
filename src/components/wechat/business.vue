<template>
  <div class="business">
    <x-header :right-options="{showMore: false}" @on-click-more="showMenus = true">客户信息</x-header>
    <div class="wrap">
      <div class="add-button">
        <x-button style="margin:20px 0" class="add-bussiness" type="primary">添加业务提醒</x-button>
      </div>
      <div class="news-business">
        <h1>创建人刘明   创建时间2017-11-01</h1>
        <group>
          <datetime
            v-model="datetime_value"
            @on-change="change"
            title="提醒日期"></datetime>
        </group>
        <group title="Default">
          <x-input title="客服" placeholder="张三"></x-input>
        </group>
        <group>
          <x-textarea height="100" title="提醒内容" placeholder="跟踪客户，上次客户说婚纱3599 在便宜5块就可以定"></x-textarea>
        </group>
        <div class="status">
          <x-button class="status-button">未完成</x-button>
          <x-button class="contact" type="primary">立即联系</x-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { XButton, XHeader, Datetime, Group, XInput, XTextarea  } from 'vux'
export default {
  components: {
    XButton,
    XHeader,
    Datetime,
    Group,
    XInput,
    XTextarea 
  },
  data () {
    return {
      showMenus: false,
      datetime_value: ''
    }
  },
  methods: {
    change(val) {
      console.log(val)
    }
  }
}
</script>

<style lang="less">
@import "../../assets/css/wx-header.css";
.wrap{
  width: 90%;
  margin: 0 auto;
  .news-business {
    h1 {
      color: #333;
      margin: 10px 0
    }
    .status{
      display: flex;
      justify-content: space-between;
      .status-button {
        width: 30%;
        margin: 15px 0
      }
      .contact{
        width: 30%;
        margin: 15px 0
      }
    }
  }
}
</style>

