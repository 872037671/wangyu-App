<template>
  <div id="ziliao">
    <div class="customer-header">
      <div class="check">
        <x-button @click.native="cancel" class="cancel" mini>取消</x-button>
        <x-button class="success" mini type="primary" @click.native="success">完成</x-button>
      </div>
      <span class="ceah_cen_data">设置头像</span>
    </div>
    <div class="head-pic">
      <div class="topshow">
        <form ref="formdata">
          <input type="file" style="display: none" name="file" ref="file_pic" id="file_pic">
        </form>
          <el-upload
            action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
            :show-file-list="false"
            :headers="postHeaders"
            class="upload_img"
            :on-success="handleAvatarSuccess">
            <div class="img">
              <img :src="this.qrcode.avatar_url" alt="">
            </div>
          </el-upload>
        <h1 style="padding-bottom:50px">{{qrcode.username}}</h1>
        <!-- <h2>其他信息其他信息其他信息</h2> -->
      </div>
      <group class="group-text">
        <cell title="推广二维码" value="" is-link @click.native="qrcode_href"></cell>
        <cell is-link title="我的推广粉丝" :value="qrcode.myNum"></cell>
      </group>
      <!-- <group class="group-text">
        <cell title="设置" value="" is-link></cell>
      </group>
      <group class="group-text">
        <cell title="关于网鱼服务营销系统" value="" is-link></cell>
      </group> -->
    </div>
  </div>
</template>

<script>
import myself from "@/api/myself"
import { XTextarea, XButton, Group, XInput, Selector, Cell, CellBox  } from 'vux'
import headers from '@/utils/getHeaders'
export default {
  mixins: [window.mixin],
  data() {
    return {
      postHeaders: headers,
      head_pic: {
        resources_id: '',
        url: ''
      },
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
      },
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
    // 调到二维码
    qrcode_href() {
      this.$router.push({ name: '我的二维码' })
    },
    // 获得头像
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
    // 上传头像成功的回调
    handleAvatarSuccess(file) {
      this.qrcode.avatar_url = file.body.url
      localStorage.setItem('avatar_url', file.body.url)
      myself.setUserPortrait({
        data: {
          "uid": localStorage.getItem('uid'),
          "resources_id": file.body.resources_id
        }
      })
    },
    // 设置我的推广粉丝数据
    getPersonQrcodeFansNum() {
      myself.getPersonQrcodeFansNum({
        data: {
          appid: localStorage.getItem('appid')
        },
        success: (result) => {
          this.qrcode.myNum = result.body.num
        }
      })
    },
    success() {
      this.$router.push({ name: '个人信息' })
    },
    cancel() {
      this.$router.push({ name: '个人信息' })
    }
  },
  mounted() {
    this.qrcode.avatar_url = localStorage.getItem('avatar_url') // 设置头像
    this.qrcode.username = localStorage.getItem('username')
    this.createPersonQrcode()
    this.getPersonQrcodeFansNum()
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
  .head-pic {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    background: #efeef4;
    z-index: 5;
    .topshow {
      background: url('../../assets/bg/top_show.jpg') no-repeat;
      background-size: 100% 100%;
      position: relative;
      .upload_img {
        width: 120px;
        margin: 0 auto;
        padding-top: 50px
      }
      .img {
        width: 120px;
        height: 120px;
        img {
          width: 100%;
          height: 100%
        }
      }
      h1 {
        font-size: 30px;
        color: #fff;
        text-align: center;
      }
      h2 {
        font-size: 30px;
        color: #fff;
        text-align: center;
        padding-bottom: 50px
      }
    }
    .group-text {
      .vux-label {
        font-size: 30px !important
      }
    }
  }
</style>

