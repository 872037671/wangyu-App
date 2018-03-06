<template>
  <!--我 组件-->
  <div id="self">
    <group>
      <cell is-link title="头像" @click.native="header_pic_href(head_pic)">
        <img :src="avatar_url" alt="" class="self-header">
      </cell>
      <cell is-link title="名字" @click.native="name_href">{{username}}</cell>
      <cell is-link title="性别" @click.native="sex_href">{{sex_default}}</cell>
      <!-- <cell is-link title="地区">
        <x-address :title="title" v-model="value2" raw-value :list="addressData"></x-address>
      </cell> -->
      <cell is-link title="我的二维码" @click.native="qrcode_href(qrcode)"><img :src="qrcode_url" alt="" class="self-header"></cell>
    </group>
    <!-- <group label-width="5em" label-align="left">
      <cell is-link title="我的地址" @click.native="address_setting(address)"></cell>
    </group> -->
    <group @click.native="autograph_href(autostarh)">
      <cell is-link title="个人签名">
        {{autostarh}}
      </cell>
    </group>

    <x-button @click.native="goToLoginPage" class="goOut" type="primary">退出登录</x-button>
  </div>
</template>
<script>
import myself from "@/api/myself"
import local from '@/api/local'
import { Scroller, Divider, Spinner, XButton, Group, Cell, LoadMore, XAddress, ChinaAddressV4Data, Value2nameFilter as value2name } from 'vux'
    export default {
        mixins: [window.mixin],
        data() {
            return {
                appid: '',
                title: '',
                "pageName": "我",
                value2: ['天津市', '市辖区', '和平区'],
                addressData: ChinaAddressV4Data,
                autostarh: '',
                autostarh_model: '',
                sex: 'sex',
                sex_default: '',
                username: '',
                name: 'name',
                address: 'address',
                qrcode: 'qrcode',
                head_pic: 'head_pic',
                avatar_url: '',
                qrcode_url: ''
            }
        },
        components: {
          Scroller,
          Divider,
          Spinner,
          Group,
          XButton,
          Cell,
          XAddress,
          ChinaAddressV4Data,
        },
        methods: {
          // 返回到登录页面
          goToLoginPage () {
            local.take_up_message(this)
            if (local.isAndroid) {
              window['injectedAndroidObject']['signOut']()
            } else {
              // this._invokeLocal('GoToLoginPage')
            }
          },
          address_setting(e_data) {
            this.$router.push({ name: '我的资料', query: { e_data }})
          },
          header_pic_href() {
            this.$router.push({ name: '设置头像' })
          },
          name_href() {
            this.$router.push({ name: '设置名字' })
          },
          sex_href() {
            this.$router.push({ name: '设置性别' })
          },
          qrcode_href() {
            this.$router.push({ name: '我的二维码' })
          },
          autograph_href() {
            this.$router.push({ name: '设置个人签名' })
          },
          getQrCode() {
            myself.getWxAuthList({
              success: (result) => {
                this.appid = result.body[0].appid
                this.createPersonQrcode()
              }
            })
          },
          createPersonQrcode() {
            myself.createPersonQrcode({
              data: {
                appid: this.appid
              },
              success: (result) => {
                console.log(result)
                this.qrcode_url = result.body.qrcode_url
              }
            })
          }
        },
        mounted() {
          this.$store.commit("toggleTipsStatus", -1)
          this.username = localStorage.getItem('username')
          this.avatar_url = localStorage.getItem('avatar_url')
          this.getQrCode()
          if(localStorage.getItem('sex') == undefined) {
            this.sex_default = '男'
          } else {
            this.sex_default = localStorage.getItem('sex')
          }
          if(localStorage.getItem('autostarh') == undefined) {
            this.autostarh = 'autostarh'
          } else {
            this.autostarh = localStorage.getItem('autostarh')
          }
        },
        activated() {
          this.$store.commit("toggleTipsStatus", -1)
        }
    }
</script>
<style lang="less">
    @import "../../assets/css/self.css";
    #self {
      .weui-cells {
        padding: 15px
      }
      div {
        font-size: 30px
      }
      .vux-popup-dialog .vux-popup-header{
          height: 60px;
          line-height: 60px
      }
      .goOut{
        font-size: 30px;
        padding:10px 0;
        margin-top: 30px
      }
    }
</style>