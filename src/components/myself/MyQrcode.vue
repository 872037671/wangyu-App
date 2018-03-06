<template>
  <!--我 组件-->
  <div id="ziliao">
    <div class="customer-header" v-if="qrcode != '' || head_pic == ''">
      <div class="check">
        <x-button @click.native="cancel" class="cancel" mini>取消</x-button>
        <x-button class="success" mini type="primary" @click.native="success">完成</x-button>
      </div>
      <span class="ceah_cen_data">我的二维码</span>
    </div>
    <div class="qrcode">
      <div class="center">
        <group class="qrcode-select">
          <selector ref="valueMapRef" placeholder="" v-model="qrcode.qrcode_model" :value-map="['value', 'label']" :options="qrcode.qrcode_list" @on-change="qrcodeSelect"></selector>
        </group>
        <div class="c-header">
          <div class="img">
            <img :src="this.qrcode.avatar_url" alt="">
          </div>
          <div class="content-text">
            <h1>{{qrcode.username}}<span></span></h1>
            <p>{{qrcode.address}}</p>
          </div>
        </div>
        <div class="erweima">
          <img :src="qrcode.qrcode_url" alt="">
        </div>
        <p class="text-p">扫描上面的二维码</p>
      </div>
    </div>
    
  </div>
</template>
<script>
    import myself from "@/api/myself"
    import { XTextarea, XButton, Group, XInput, Selector, Cell, CellBox  } from 'vux'
    
    export default {
      mixins: [window.mixin],
      data() {
        return {
          appid: '',
          e_data: '',
          qrcode: {
            qrcode_url: '',
            qrcode_model: '0',
            myNum: '',
            qrcode_leibie: '',
            username: '',
            address: '',
            avatar_url: '',
            qrcode_list: [
              {
                label: '利亚方舟影楼管理软件',
                value: '0'
              },
              {
                label: '网鱼服务营销平台',
                value: '1'
              },
              {
                label: '广东点赞科技',
                value: '2'
              },
              {
                label: 'mpqinyetest001',
                value: 3
              },
              {
                label: '儿童摄影案例',
                value: '4'
              }
            ]
          }
        }
      },
      components: {
        XTextarea,
        Group,
        XButton,
        XInput,
        Selector,
        Cell,
        CellBox
      },
      methods: {
        fileSelected(e) {
          console.log(1)
          let file = e.target.files[0]
          let that = this
          let param = new FormData()
          param.append('file', file, file.name)
          const xhr = new XMLHttpRequest();
          xhr.open('POST', 'http://localhost:8073/api/v1/we_chat/WxOperation/uploadResources');
          xhr.setRequestHeader('token', localStorage.getItem('token'))
          xhr.setRequestHeader('client', localStorage.getItem('client'))
          xhr.setRequestHeader('uid',localStorage.getItem('uid'))
          xhr.send(param);
          xhr.onload = function() {
            let result = JSON.parse(xhr.response).body
            that.head_pic.resources_id = result.resources_id
            that.head_pic.url = result.url
            localStorage.setItem('avatar_url', result.url)
            that.qrcode.avatar_url = ''
            that.qrcode.avatar_url = result.url
          }
          $('#file_pic').replaceWith(`<input type="file" style="display: none" name="file" @change="fileSelected($event)" ref="file_pic" id="file_pic">`)
        },
        // 下拉选择公司选择二维码
        qrcodeSelect(val) {
          this.qrcode.qrcode_leibie = val
          this.getWxAuthList()
        },
        cancel() {
          this.$router.push({ name: '个人信息' })
        },
        success() {
          this.$router.push({ name: '个人信息' })
        },
        // 拿到二维码数据
        createPersonQrcode() {
          myself.createPersonQrcode({
            data: {
              appid: this.appid
            },
            success: (result) => {
              this.qrcode.qrcode_url = ''
              this.qrcode.qrcode_url = result.body.qrcode_url
            }
          })
        },
        // 获取我的所有授权公众号或小程序list 及appid
        getWxAuthList() {
          myself.getWxAuthList({
            success: (result) => {
              this.appid = result.body[this.qrcode.qrcode_leibie].appid
              for (let [index, val] of result.body.entries()) {
                val.type == 2 ? this.qrcode.qrcode_list.splice(index, 1) : fn(this)
              }
              function fn(that) {
                that.$store.commit('set_appid', result.body[that.qrcode.qrcode_leibie].appid)
                that.createPersonQrcode()
              }
            }
          })
        }
      },
      mounted () {
        this.e_data = this.$route.query.e_data
        this.qrcode.avatar_url = localStorage.getItem('avatar_url')
        this.qrcode.username = localStorage.getItem('username')
        this.qrcode.address = localStorage.getItem('address')
      }
    }
</script>
<style lang="less">
    @import "../../assets/css/self.css";
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
    .qrcode {
      position: fixed;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      background: url('../../assets/bg/myself_bg.jpg') no-repeat;
      background-size: 100% 100%;
      z-index: 5;
      .center {
        width: 600px;
        position: absolute;
        top: 10%;
        left: 0;
        right: 0;
        margin: auto;
        background: #fff;
        padding: 40px;
        border-radius: 20px;
        .qrcode-select {
          margin-bottom: 20px;
          .weui-cells {
            padding: 0;
            .vux-selector {
              padding: 5px;
              font-size: 30px
            }
          }
        }
        .c-header {
          overflow: hidden;
          position: relative;
          .img {
            width: 120px;
            height: 120px;
            float: left;
            img {
              width: 100%;
              height: 100%
            }
          }
          .content-text {
            float: left;
            margin-left: 25px;
            font-size: 25px;
            text-align: left;
            width: 60%;
            position: relative;
            h1 {
              width: 80%;
              span {
                width: 25px;
                height: 25px;
                background: url('../../assets/bg/sexmen.png') no-repeat;
                background-size: 100% 100%;
                display: inline-block;
                margin-left: 25px;
              }
            }
            p {
              font-size: 20px;
              margin-top: 20px;
              overflow: hidden;
            }
          }
        }
        .erweima {
          width: 300px;
          height: 300px;
          margin: 30px auto;
          img {
            width: 100%
          }
        }
      }
      .text-p {
        font-size: 25px;
        color: #999999
      }
      .weui-cell__bd {
        padding: 20px 0
      }
    }
    
</style>