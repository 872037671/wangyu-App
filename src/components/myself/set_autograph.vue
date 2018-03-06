<template>
  <div>
    <div class="customer-header">
      <div class="check">
        <x-button @click.native="cancel" class="cancel" mini>取消</x-button>
        <x-button class="success" mini type="primary" @click.native="success">完成</x-button>
      </div>
      <span class="ceah_cen_data">设置个人签名</span>
    </div>
    <group>
      <x-textarea placeholder="修改个人签名" v-model="autostarh_data" :max="20"></x-textarea>
    </group>
  </div>
</template>

<script>
import myself from "@/api/myself"
import { XTextarea, Group, XButton } from 'vux'
export default {
  mixins: [window.mixin],
  components: {
    XTextarea,
    Group,
    XButton
  },
  data() {
    return {
      appid: '',
      autostarh_data: ''
    }
  },
  methods: {
    success() {
      // 修改个人签名
      myself.updateAutograph({
        data: {
          autograph: this.autostarh_data
        },
        success: (result) => {
          localStorage.setItem('autostarh', this.autostarh_data)
          this.$router.push({ name: '个人信息' })
        }
      })
    },
    cancel() {
      this.$router.push({ name: '个人信息' })
    },
  }
}
</script>

<style lang="less">
  .customer-header {
    text-align: center;
    position: relative;
    .ceah_cen_data {
      position: absolute;
      left: 0;
      right:0;
      top: 0;
      bottom: 0;
      margin: auto;
      font-size: 30px;
      color: #fff
    }
    .check {
      color: #fff;
      position: relative;
      z-index: 10;
      .cancel {
        float: left;
        margin-left: 25px;
        margin-top: 30px !important;
        font-size: 25px;
      }
      .success {
        float: right;
        margin-right: 25px;
        margin-top: 30px !important;
        font-size: 25px;
      }
    }
  }
</style>

