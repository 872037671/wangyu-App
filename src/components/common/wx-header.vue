<template>
  <!--复兴性高，数据交互比较频繁-->
  <div id="wx-header">
    <!--右上角图标-->
    <div class="other" v-if="header_status">
      <!--只在“微信”页显示 更多图标-->
      <!-- <span class="iconfont icon-tips-jia" v-show="$route.path==='/dialogue'" v-on:click="$store.commit('toggleTipsStatus')"></span> -->
      <!-- <span class="box-span" v-show="$route.path==='/dialogue'" v-on:click="$store.commit('toggleTipsStatus')">
        <i class="iocnbottom"></i>{{ status_data }}
      </span> -->
      <!--只在“通讯录”页显示 显示添加好友图标-->
      <!--<router-link tag="span" to="/contact/add-friend" class="iconfont icon-tips-add-friend" v-show="$route.path==='/contact'"></router-link>-->
      <!--只在“添加朋友”页显示 -->
      <span v-show="$route.path==='/contact/new-friends'">添加朋友</span>
      <!--下面这个好像有些多余 sad -->
      <span class="iconfont icon-chat-friends" v-show="$route.path==='/wechat/dialogue'"></span>
      <!-- 更多图标的菜单 附带过渡效果-->
      <!-- <ul class="tips-menu" :class="[$store.state.tipsStatus?'tips-open':'tips-close']" v-on:click="$store.commit('toggleTipsStatus', -1)">
        <li>
          <div  @click="dialoguing">对话中</div>
        </li>
        <li @click="waiting">
          <div>等待中</div>
        </li>
        <li @click="lining">
          <div>排队中</div>
        </li>
        <li>
          <div @click="metting">最近沟通</div>
        </li>
        <li>
          <div @click="team_commit">团队沟通</div>
        </li>
      </ul> -->
      <template>
        <el-select v-model="demo" class="header_select" @change="select_method">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </template>
      <!--<div class="tips-masker" v-show="tips_isOpen"></div>-->
    </div>
    <div class="center">
      <!-- <transition name="fade">
          <div class="iconfont icon-return-arrow" style="left: 10px;position: absolute;font-size: 16px;" v-on:click="goBack" v-show="$route.path.split('/').length>2"><span>{{$store.state.backPageName}}</span></div>
      </transition>-->
      <!--显示当前页的名字-->
      <!-- <span>{{$store.state.currentPageName}}</span> -->
      <!--微信群 显示群名以及成员人数 好像和 dialogue 组件 写重了 sad -->
      <span>{{pageName}}</span>
      <span class="parentheses" v-show='$route.query.group_num&&$route.query.group_num!=1'>{{$route.query.group_num}}</span>
    </div>
  </div>
</template>
<script>
    import { Selector, Group } from 'vux'
    export default {
        props: ["pageName"],
        data() {
            return {
                // 暂且用不到
                chatCount: true,
                status_data: '等待中',
                myself_show: '',
                options: [{
                  value: '1',
                  label: '对话中'
                }, {
                  value: '2',
                  label: '等待中'
                }, {
                  value: '3',
                  label: '排队中'
                }],
                demo: '对话中',
                // dialogue_status: false
            }
        },
        components: {
          Selector,
          Group
        },
        methods: {
            // 暂且用不到 先留着
            goBack() {
                this.$router.go(-1)
                    //保证返回操作后正确显示页面名称
                    // this.$store.commit("setPageName", this.$store.state.backPageName)
            },
            select_method(val) {
              if (val == 1) {
                this.$store.commit('set_dialoguing', '1')
                this.$router.push({ query: { status: 1 }})
              } else if (val ==2) {
                this.$store.commit('set_waiting', '2')
                this.$router.push({ query: { status: 2 }})
              } else if (val ==3) {
                this.$store.commit('set_lining', '3')
                this.$router.push({ query: { status: 3 }})
              }
            }
        },
        computed: {
          header_status: function() {
            // return this.$store.state.user.dialogue_header_status
            return false
          }
        },
        watch: {
          "$route" (to, from) {
            this.myself_show = to.name
            if (to.name != '会话') {
              this.$store.commit('set_dialogue_header_status_false')
            } else {
              this.$store.commit('set_dialogue_header_status')
            }
            if (to.query.status == 1) {
              this.demo = '对话中'
            }
          }
        }
    }
</script>
<style lang="less">
  .header_select {
    .el-input__inner{
      height: 65px;
      font-size: 25px;
      text-align: center
    }
  }
  .el-select-dropdown {
    .el-scrollbar {
      ul {
        display: block !important;
      }
    }
    .el-select-dropdown__item {
      display: block !important;
      font-size: 25px;
      height: 60px;
      span {
        display: block;
        height: 60px;
        line-height: 60px !important
      }
    }
  }
</style>
