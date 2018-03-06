<template>
  <div>
    <div class="delete">
      <div class="slider">
        <div class="content" 
            @touchstart='touchStart'
            @touchmove='touchMove'
            @touchend='touchEnd'
            :style="deleteSlider"
        >
      <!-- 插槽中放具体项目中需要内容         -->   
          <slot name="waitting"></slot>
          <slot name="doiag"></slot>
        </div>
        <div v-if="this.$route.query.status == 1" @click="deletelist" class="remove" ref='remove'>
          <!-- <span class="message">消息置顶</span> -->
          <span class="delete_mes">结束会话</span>
        </div>
        <div v-if="this.$route.query.status == 2" @click="deletelist_waitting" class="remove" ref='remove'>
          <!-- <span class="message">消息置顶</span> -->
          <span class="delete_mes">删除</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import myself from '@/api/myself'
import webDB from '@/api/webDB'
import { Alert } from 'vux'

export default {
  props: ['list_data', 'index', 'wait_list_data', 'wait_index'],
  components: {
    Alert
  },
  data() {
     return {
        startX:0,   //触摸位置
        endX:0,     //结束位置
        moveX: 0,   //滑动时的位置
        disX: 0,    //移动距离
        deleteSlider: '',//滑动时的效果,使用v-bind:style="deleteSlider",
        delete_list_data: [], // ajax 删除对话中的数据
        delete_waitting_list_data: [] // ajax 删除等待中的数据
     }
  },
  methods:{
    deletelist() {
      this.delete_list_data.push(this.list_data[this.index].session_id)
      myself.closeSession({
        data: {
          session_list: this.delete_list_data
        },
        success: () => {
          webDB.remove_dialogue(this.list_data[this.index].customer_wx_openid, this)
          webDB.remove_message(this.list_data[this.index].customer_wx_openid, this)
          webDB.remove_message_length(this.list_data[this.index].customer_wx_openid)
          this.deleteSlider = "transform:translateX(" + 0 + "px)";
          this.list_data.splice(this.index, 1)
          that.$vux.alert.show({
              content: '消息删除成功'
          })
        }
      })
    },
    deletelist_waitting() {
      this.delete_waitting_list_data.push(this.wait_list_data[this.wait_index].session_id)
      myself.closeSession({
        data: {
          session_list: this.delete_waitting_list_data
        },
        success: () => {
          this.$store.commit('set_dialoguing', 1)
          this.$store.commit('set_dialogue_tab')
          webDB.remove_waitting(this.wait_list_data[this.wait_index].customer_wx_openid, this)
          this.wait_list_data.splice(this.wait_index, 1)
          this.$vux.alert.show({
            content: '消息删除成功'
          })
        }
      })
    },
    touchStart(ev){
      ev= ev || event
      //tounches类数组，等于1时表示此时有只有一只手指在触摸屏幕
      if(ev.touches.length == 1) {
        // 记录开始位置
        this.startX = ev.touches[0].clientX;
      }
    },
    touchMove(ev){
      ev = ev || event;
        //获取删除按钮的宽度，此宽度为滑块左滑的最大距离
      let wd=this.$refs.remove.offsetWidth;
        if(ev.touches.length == 1) {
          // 滑动时距离浏览器左侧实时距离
          this.moveX = ev.touches[0].clientX
  
          //起始位置减去 实时的滑动的距离，得到手指实时偏移距离
          this.disX = this.startX - this.moveX;
            // 如果是向右滑动或者不滑动，不改变滑块的位置
            if(this.disX < 0 || this.disX == 0) {
              this.deleteSlider = "transform:translateX(0px)";
              // 大于0，表示左滑了，此时滑块开始滑动 
              }else if (this.disX > 0) {
                  //具体滑动距离我取的是 手指偏移距离*5。
                this.deleteSlider = "transform:translateX(-" + this.disX*5 + "px)";
                
                // 最大也只能等于删除按钮宽度 
                if (this.disX*5 >=wd) {
                    this.deleteSlider = "transform:translateX(-" +wd+ "px)"; 
                  }
              }
          }
    },
    touchEnd(ev){
      ev = ev || event;
      let wd=this.$refs.remove.offsetWidth;
      if (ev.changedTouches.length == 1) {
        let endX = ev.changedTouches[0].clientX;
        this.disX = this.startX - endX;
        //如果距离小于删除按钮一半,强行回到起点
        if ((this.disX*5) < (wd/2)) {
           this.deleteSlider = "transform:translateX(0px)";
        }else{
          //大于一半 滑动到最大值
          this.deleteSlider = "transform:translateX(-"+wd+ "px)";
        }
      }
    }      
  },
  mounted () {
    if (this.$route.query.status == undefined) {
      this.$router.push({ query: { status: 1 }})
    }
  }
}
</script>

<style lang="less">
  .slider{
    width: 100%;
    height:140px;
    position: relative;
    user-select: none;
    .content{
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 100;
      //    设置过渡动画
      transition: 0.3s;
      background: #FFFFFF;
      padding: 10px
    }
    .remove{
      position: absolute;
      width:300px;
      height:100%;
      background:red;
      right: 0;
      top: 0;
      color:#fff;
      text-align: center;
      font-size: 30px;
      line-height: 140px;
      display: flex;
      justify-content: center;
      .message {
        width: 50%;
        display: inline-block;
        background: #cccccc
      }
      .delete_mes {
        width: 50%;
        display: inline-block
      }
    }
  }
</style>

