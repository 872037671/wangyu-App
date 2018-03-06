<template>
    <div class="dialogue">
        <!-- <header id="wx-header">
            <div class="other">
                <router-link :to="{path:'/wechat/dialogue/dialogue-info',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-group" v-show="$route.query.group_num&&$route.query.group_num!=1"></router-link>
                <router-link :to="{path:'/wechat/dialogue/dialogue-detail',query: { msgInfo: msgInfo}}" tag="span" class="iconfont icon-chat-friends" v-show="$route.query.group_num==1"></router-link>
            </div>
            <div class="center">
                <router-link to="/dialogue" tag="div" class="iconfont icon-return-arrow">
                    <span></span>
                </router-link>
                <span>{{pageName}}</span>
                <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
                <div class="list-select" @click="list_select_status = !list_select_status"></div>
                <div class="list-ul" v-show="list_select_status">
                    <ul>
                        <router-link to="/wechat/dialogue/customer-info" tag="li">客户信息</router-link>
                        <li>转接</li>
                        <li>群聊</li>
                        <router-link to="/wechat/dialogue/business-info" tag="li">业务跟踪</router-link>
                    </ul>
                </div>
            </div>
        </header> -->
        <x-header class="dialogue-header" :right-options="{showMore: true}" :left-options="{preventGoBack: true}" @on-click-more="showMenus = true" @on-click-back="back_last">{{customer_name}}</x-header>
        <div>
            <actionsheet :menus="menus" v-model="showMenus" @on-click-menu="menueven" show-cancel></actionsheet>
        </div>
        <section :class="{ section_box: component_sucai_data , dialogueSection: true, clearfix: true }" v-on:click="MenuOutsideClick">
            <div class=" clearfix" v-for="(item, index) in user_message_list" :key="index">
              <div class="row" v-show="item.opercode">
                <img :src="user_head_pc" class="header">
                <p class="text" v-show="item.message_type == 3">
                  <Audio :itemid="item"></Audio>
                </p>
                <p v-show="item.text != ''" class="text"><face :texted="item.text"></face></p>
                <img v-show="item.file_url" style="float:left;width:100px;margin-left:10px" :src="item.file_url" alt="">
              </div>
              <div class="my-msg" v-show="item.typeof">
                <img :src="my_head_pc" class="header">
                <p v-show="item.text" class="text">{{item.text}}</p>
                <img class="sucai_img" :src="item.img_url" alt="">
              </div>
            </div>
            <!-- <div class="my-msg" v-for="item in my_message_list">
                <img :src="my_head_pc" class="header">
                <p v-show="item.text" class="text">{{item.text}}</p>
                <img class="sucai_img" :src="item.img_url" alt="">
            </div> -->
            <span class="msg-more" id="msg-more">
                <ul>
                    <li>复制</li>
                    <li>转发</li>
                    <li>收藏</li>
                    <li>删除</li>
                </ul>
            </span>
        </section>
        
        <footer class="dialogue-footer" :class="{ dialoguefooterslide: component_sucai_data , dialoguefooterface: component_face_data }">
            <div class="component-dialogue-bar-person">
                <span class="iconfont icon-dialogue-jianpan" v-show="!currentChatWay" v-on:click="currentChatWay=true"></span>
                <span class="icon-voice" v-show="currentChatWay" v-on:click="currentChatWay=false"></span>
                <div class="chat-way" v-show="!currentChatWay">
                    <div class="chat-say" v-press>
                        <span class="one">按住 说话</span>
                        <span class="two">松开 结束</span>
                    </div>
                </div>
                <div class="chat-way" v-show="currentChatWay">
                    <input class="chat-txt" type="text" v-model="input_text" v-on:focus="focusIpt" v-on:blur="blurIpt"/>
                </div>
                <!-- <span class="expression icon-face" @click="component_face_data = !component_face_data"></span> -->
                <span class="more icon-adds" @click="style_blean"></span>
                <x-button class="icon-send" style="margin-left:5px" type="primary" @click.native="send_text_data">发送</x-button>
                <div class="recording" style="display: none;" id="recording">
                    <div class="recording-voice" style="display: none;" id="recording-voice">
                        <div class="voice-inner">
                            <div class="voice-icon"></div>
                            <div class="voice-volume">
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                        </div>
                        <p>手指上划,取消发送</p>
                    </div>
                    <div class="recording-cancel" style="display: none;">
                        <div class="cancel-inner"></div>
                        <p>松开手指,取消发送</p>
                    </div>
                </div>
            </div>
            <section class="face-emotion" v-show="component_face_data">
                <div v-for="(item, index) in list" class="vux-center-h" :key="index">
                    <emotion>{{item}}</emotion>
                    <emotion is-gif @click.native="face_add_icons(index, item)">{{item}}</emotion>
                </div>
            </section>
            <div class="component-cucai" v-show="component_sucai_data">
                <el-upload
                  action="http://kf.lyfz.net/api/v1/we_chat/WxOperation/uploadResources"
                  :show-file-list="false"
                  :headers="postHeaders"
                  class="upload_img"
                  :on-success="handleAvatarSuccess">
                  <div class="pic">
                      <div class="img"></div>
                      <p>图片</p>
                  </div>
                </el-upload>
                <!-- <div class="text">
                    <div class="img"></div>
                    <p>文件素材</p>
                </div>
                <div class="href-text">
                    <div class="img"></div>
                    <p>超文本</p>
                </div>
                <div class="msg">
                    <div class="img"></div>
                    <p>模板消息</p>
                </div> -->
            </div>
        </footer>

        <!-- 转接 -->
        <alert v-model="zhuanjie_show" @on-hide="onHide">
          <selector class="zhuanjie-header" placeholder="行政部" v-model="zhuanjiedemo" ref="valueMapRef" @on-change="Change_zhuanjie" :value-map="['key', 'value']" :options="zhuanjie_list"></selector>
          <div class="main-box">
            <div class="list" v-for="(item, index) in zhunajieData.data_list" :key="index">
              <img :src="item.avatar_url" alt="">
              <div class="content">
                <p class="username">姓名：{{item.user_name}}</p>
                <p class="phone_no">账号：{{item.phone_no}}</p>
                <p class="department">部门：{{item.user_group_name}}</p>
                <p class="caozuo">操作：<span @click="sessionTransfer(item.uid)">转接</span></p>
              </div>
            </div>
          </div>
        </alert>
        
    </div>
</template>
<script>
import { XHeader, Actionsheet, ButtonTab, ButtonTabItem, XButton, WechatEmotion as Emotion, Divider, Alert, Selector } from 'vux'
import webDB from '@/api/webDB'
import myself from '@/api/myself'
import localforage from 'localforage'
import headers from '@/utils/getHeaders'
import { resolve } from 'url';
import Audio from './audio'
import face from './face'


export default {
  components: {
    XHeader,
    Actionsheet,
    face,
    Audio,
    ButtonTab,
    ButtonTabItem,
    XButton,
    Emotion,
    Alert,
    Selector,
    Divider
  },
  data() {
    return {
      postHeaders: headers,
      zhuanjie_show: false,
      zhuanjiedemo: '440',
      pic_resources_id: '',
      customer_name: '',
      zhunajieData: {
        page: '1',
        user_group_id: '',
        data_list: []
      },
      zhuanjie_list: [
        {
          key: '440', 
          value: '行政部'
        }, 
        {
          key: '441', 
          value: '惠州团队'
        },
        {
          key: '442', 
          value: '武汉团队'
        }, 
        {
          key: '443', 
          value: '西安团队'
        },
        {
          key: '444', 
          value: '网销团队'
        }, 
        {
          key: '445', 
          value: '惠州工程部'
        },
        {
          key: '446', 
          value: '售后部门'
        }, 
        {
          key: '447', 
          value: '武汉开发团队'
        }
      ],
      menus: [
        {
          label: '客户信息',
          value: '1',
          otherProp: 'hey'
        }, {
          label: '转接',
          value: '2',
        }
      ],
      list: ['微笑', '撇嘴', '色', '发呆', '得意', '流泪', '害羞', '闭嘴', '睡', '大哭', '尴尬', '发怒', '调皮', '呲牙', '惊讶', '难过', '酷', '冷汗', '抓狂', '吐', '偷笑', '可爱', '白眼', '傲慢', '饥饿', '困', '惊恐', '流汗', '憨笑', '大兵', '奋斗', '咒骂', '疑问', '嘘', '晕', '折磨', '衰', '骷髅', '敲打', '再见', '擦汗', '抠鼻', '鼓掌', '糗大了', '坏笑', '左哼哼', '右哼哼', '哈欠', '鄙视', '委屈', '快哭了', '阴险', '亲亲', '吓', '可怜', '菜刀', '西瓜', '啤酒', '篮球', '乒乓', '咖啡', '饭', '猪头', '玫瑰', '凋谢', '示爱', '爱心', '心碎', '蛋糕', '闪电', '炸弹', '刀', '足球', '瓢虫', '便便', '月亮', '太阳', '礼物', '拥抱', '强', '弱', '握手', '胜利', '抱拳', '勾引', '拳头', '差劲', '爱你', 'NO', 'OK', '爱情', '飞吻', '跳跳', '发抖', '怄火', '转圈', '磕头', '回头', '跳绳', '挥手', '激动', '街舞', '献吻', '左太极', '右太极'],
      showMenus: false,
      message_pic_url: '',
      input_text: '', // 聊天输入框信息
      img_url: '',
      input_text_arr: [], // 聊天输入框信息数组
      list_select_status: false,
      component_sucai_data: false,
      component_face_data: false,
      query_dangqian_status: '',
      pageName: this.$route.query.name,
      currentChatWay: true, //ture为键盘打字 false为语音输入
      timer: null,
      // sayActive: false // false 键盘打字 true 语音输入
      match_openid: '', // 用来匹配哪个用户的openid
      user_message_list: [], // 对方信息列表
      my_message_list: [], // 我的信息列表
      user_head_pc: '', // 对方头像
      my_head_pc: localStorage.getItem('avatar_url') // 我的头像
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$store.commit("setPageName", vm.$route.query.name)
    })
  },
  watch: {
    // 监听用户是否发送消息，如果有就再触发一次message数据的获取，保证user_message_list实时刷新
    webDB_status: function(val) {
      webDB.get_message_data(this.match_openid).then((response) => {
        if (response[0]) {
          webDB.remove_message_length(response[0].customer_wx_openid)
        }
      })
      if (val == '0') {
        webDB.get_message_data(this.match_openid).then((response) => {
          let linshi_data = []
          for (let i = 0; i < response.length; i++) {
            if (response[i].user_type != '1') {
              linshi_data[i] = response[i]
            }
          }
          this.user_message_list = linshi_data
        })
      }
    }
  },
  computed: {
    webDB_status: function() {
      return this.$store.state.user.webDB_status
    },
    type_delete_dialogue: function() {
      return this.$store.state.user.synec
    },
    msgInfo() {
      for (var i in this.$store.state.msgList.baseMsg) {
        if (this.$store.state.msgList.baseMsg[i].mid == this.$route.query.mid) {
          return this.$store.state.msgList.baseMsg[i]
        }
      }
    }
  },
  directives: {
    press: {
      inserted(element, binding) {
        var recording = document.querySelector('.recording'),
          recordingVoice = document.querySelector('.recording-voice'),
          recordingCancel = document.querySelector('.recording-cancel'),
          startTx, startTy;
          element.addEventListener('touchstart', function(e) {
            // 用bind时，vue还没插入到dom,故dom获取为 undefine，用 inserted 代替 bind,也可以开个0秒的定时器
            element.className = "chat-say say-active"
            recording.style.display = recordingVoice.style.display = "block"
                // console.log('start')
            var touches = e.touches[0]
            startTx = touches.clientX
            startTy = touches.clientY
            e.preventDefault()
          }, false)
          element.addEventListener('touchend', function(e) {
            /*var touches = e.changedTouches[0];
            var distanceY = startTy - touches.clientY;
            if (distanceY > 50) {
                console.log("取消发送信息");
            }else{
                console.log("发送信息");
            }*/
            element.className = "chat-say"
            recordingCancel.style.display = recording.style.display = recordingVoice.style.display = "none"
            // console.log('end')
            e.preventDefault()
          }, false)
          element.addEventListener('touchmove', function(e) {
          var touches = e.changedTouches[0],
            endTx = touches.clientX,
            endTy = touches.clientY,
            distanceX = startTx - endTx,
            distanceY = startTy - endTy;
          if (distanceY > 50) {
            element.className = "chat-say"
            recordingVoice.style.display = "none"
            recordingCancel.style.display = "block"
          }else{
            element.className = "chat-say say-active"
            recordingVoice.style.display = "block"
            recordingCancel.style.display = "none"
          } // 阻断事件冒泡 防止页面被一同向上滑动
          e.preventDefault()
          }, false);
        }
      },
      more: {
        bind(element, binding) {
          var startTx, startTy
          element.addEventListener('touchstart', function(e) {
            var msgMore = document.getElementById('msg-more'),
              touches = e.touches[0];
            startTx = touches.clientX
            startTy = touches.clientY
            clearTimeout(this.timer)
            this.timer = setTimeout(()=>{
              // 控制菜单的位置
              msgMore.style.left = ((startTx - 18) > 180 ? 180 : (startTx - 18)) + 'px'
              msgMore.style.top = (element.offsetTop - 33) + 'px'
              msgMore.style.display = "block"
              element.style.backgroundColor = '#e5e5e5'
            },500)
          }, false)
          element.addEventListener('touchmove', function(e) {
            var touches = e.changedTouches[0],
              disY = touches.clientY;
            if (Math.abs(disY-startTy)>10) {
              clearTimeout(this.timer)
            }
          }, false)
          element.addEventListener('touchend', function(e) {
            clearTimeout(this.timer)
          }, false)
        }
      }
  },
  methods: {
    style_blean() {
      this.component_sucai_data = !this.component_sucai_data
    },
    Change_zhuanjie(val) {
      this.zhunajieData.user_group_id = val
      this.choose_department()
    },
    // 下拉选择部门
    choose_department() {
      myself.getUserList({
        data: {
          page: this.zhunajieData.page,
          user_group_id: this.zhunajieData.user_group_id,
        },
        success: (result) => {
          this.zhunajieData.data_list = result.body.user_list
          console.log(result)
        }
      })
    },
    // 会话转接
    sessionTransfer(uid) {
      let useruid = uid
      myself.sessionTransfer({
        data: {
          session_id: localStorage.getItem('session_id'),
          uransfer_uid: useruid
        },
        success: (result) => {
          console.log(result)
        }
      })
    },
    onHide() {
      console.log(312)
    },
    handleAvatarSuccess(file) {
      this.message_pic_url = file.body.url
      this.my_message_list.push({ text: '', img_url: file.body.url })
      let store = localforage.createInstance({
          name: localStorage.getItem('uid') + 'mysql'
      })
      let that = this
      let my_message_info = [{ text: '', img_url: file.body.url, typeof: 1 }]
      webDB.set_message_data(localStorage.getItem('user_openid'), my_message_info, store, that)
      this.pic_resources_id = file.body.resources_id
      myself.sendMessage({
        data: {
          "session_id": localStorage.getItem('session_id'),
          "message": '',
          "resources_id": that.pic_resources_id,
          type: 2
        }
      })
    },
    menueven(key) {
      if (key == 1) {
          this.$router.push({ name: 'customer_info' })
      } else if (key == 4) {
          this.$router.push({ name: 'business_info' })
      } else if (key == 2) {
          this.zhuanjie_show = true
      }
    },
    // 返回到上个目录
    back_last() {
      let that = this
      this.$router.push({ name: '会话', query: that.$route.query })
      this.$store.commit('Set_jiaobiao_status') // 清楚数据库里面的会话角标length
    },
    // 添加表情到信息栏目
    face_add_icons(index, item) {
      this.input_text += item
    },
    // 发送信息
    send_text_data() {
      let that = this
      if (this.input_text == '') {
        return
      }
      this.my_message_list.push({ text: this.input_text, img_url: '' })
      this.component_sucai_data = false
      myself.sendMessage({
        data: {
          "session_id": localStorage.getItem('session_id'),
          "message": that.input_text,
          "resources_id": '',
          type: 1
        }
      })
      let store = localforage.createInstance({
          name: localStorage.getItem('uid') + 'mysql'
      })
      let my_message_info = [{ text: this.input_text, img_url: '', typeof: 1 }]
      webDB.set_message_data(localStorage.getItem('user_openid'), my_message_info, store, this)
      this.input_text = []
    },
    // 解决输入法被激活时 底部输入框被遮住问题
    focusIpt() {
      this.timer = setInterval(function() {
        document.body.scrollTop = document.body.scrollHeight
      }, 100)
    },
    blurIpt() {
      clearInterval(this.timer)
    },
    getmessage_ev() {
      this.customer_name = JSON.parse(localStorage.getItem('user_info')).customer_wx_nickname
      this.user_head_pc = localStorage.getItem('user_head_pc')
      this.match_openid = localStorage.getItem('user_openid')
      let linshi_data = []
      let linshi_data2 = []
      let index = 0
      let index2 = 0
      let that = this
      webDB.get_message_data(this.match_openid).then((response) => {
        this.user_message_list = response
          // 拿最后一个信息获取最近聊天时间
          // for (let j = 0; j < linshi_data.length; j++) {
          //   if(j == linshi_data.length - 1) {
          //   localStorage.setItem('zuij_time', linshi_data[j].add_time)  
          //   }
          // }
      })
      // 只要点金消息发送页就清除掉message_length
      let obj_data = JSON.parse(localStorage.getItem('user_info')).customer_wx_openid
      webDB.remove_message_length(obj_data)
    },
    // 点击空白区域，菜单被隐藏
    MenuOutsideClick(e) {
      var container = document.querySelectorAll('.text'),
        msgMore = document.getElementById('msg-more')
      if (e.target.className === 'text') {

      } else {
        msgMore.style.display = 'none'
        container.forEach(item=>item.style.backgroundColor='#fff')
      }
    }
  },
  mounted () {
    this.getmessage_ev()
  }
}
</script>
<style lang="less">
    @import "../../assets/css/dialogue.css";
    .say-active {
        background: #c6c7ca;
    }
    .vux-header .vux-header-left .vux-header-back {
        font-size: 35px
    }
    .vux-actionsheet-menu-default {
      padding: 30px 0 !important
    }
    .vux-header-title-area, .vux-header .vux-header-title {
        font-size: 35px !important;
        height: 90px !important;
        line-height: 90px !important
    }
    .zhuanjie-header {
      padding-bottom: 20px !important;
      margin-bottom: 10px !important;
      border-bottom: 1px solid #D7DDE4
    }
    .audio {
      // width: 100px;
      // height: 20px;
    }
    .main-box {
      width: 100%;
      display: flex;
      height: 700px;
      overflow-y: scroll;
      flex-wrap: wrap;
      .list {
        width: 100%;
        margin: 20px 0;
        overflow:hidden;
        img{
          width: 30%;
          float: left;
        }
        .content {
          float: right;
          width: 65%;
          p{
            text-align: left;
            font-size: 30px;
          }
          span {
            display: inline-block;
            border: 2px solid #D7DDE4;
            padding: 2px 15px;
            border-radius: 5px;
          }
        }
      }
    }
    .dialogue {
      .dialogueSection {
        background: #f8f8f9 !important
      }
      .weui-dialog {
        width: 80% !important;
        max-width: 80% !important
      }
      .weui-dialog__ft {
        height: 80px;
        line-height: 80px
      }
      .weui-actionsheet__cell {
        font-size: 30px;
        padding: 30px 0
      }
    }
</style>
