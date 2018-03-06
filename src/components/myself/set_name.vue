<template>
  <div>
    <div class="customer-header">
      <div class="check">
        <x-button @click.native="cancel" class="cancel" mini>取消</x-button>
        <x-button class="success" mini type="primary" @click.native="success">完成</x-button>
      </div>
      <span class="ceah_cen_data">修改名字</span>
    </div>
    <group>
      <x-textarea :max="20" v-model="name.name_data"></x-textarea>
    </group>
  </div>
</template>

<script>
import myself from "@/api/myself"
import { XTextarea, Group, XButton } from 'vux'
export default {
  components: {
    XTextarea,
    Group,
    XButton
  },
  data() {
    return {
      appid: '',
      name: {
        name_data: ''
      },
    }
  },
  methods: {
    success() {
      myself.updateUserName({
        data: {
          user_name: this.name.name_data
        },
        success: (result) => {
          localStorage.setItem('username', this.name.name_data)
          this.$router.push({ name: '个人信息' })
        }
      })
    },
    cancel() {
      this.$router.push({ name: '个人信息' })
    }
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

