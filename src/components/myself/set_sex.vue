<template>
  <div>
    <div class="customer-header">
      <div class="check">
        <x-button @click.native="cancel" class="cancel" mini>取消</x-button>
        <x-button class="success" mini type="primary" @click.native="success">完成</x-button>
      </div>
      <span class="ceah_cen_data">设置性别</span>
    </div>
    <group>
      <selector placeholder="选择性别" @on-change="sexchange" :value-map="['value', 'label']" v-model="sex.demo" :options="sex.list"></selector>
    </group>
  </div>
</template>

<script>
import myself from "@/api/myself"
import { XTextarea, Group, XButton, Selector } from 'vux'
export default {
  components: {
    XTextarea,
    Group,
    XButton,
    Selector
  },
  data() {
    return {
      sex: {
        demo: '',
        list: [{label: '男', value: '1'}, {label: '女', value: '2'}]
      },
    }
  },
  methods: {
    success() {
      this.$router.push({ name: '个人信息' })
    },
    cancel() {
      this.$router.push({ name: '个人信息' })
    },
    sexchange(val) {
      this.sex.demo = val
      myself.updateSex({
        data: {
          sex: val
        },
        success: (result) => {
          if (this.sex.demo == 1) {
            localStorage.setItem('sex', '男')
          } else {
            localStorage.setItem('sex', '女')
          }
        }
      })
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

