<template>
    <!--微信组件-->
  <div id="wechat">
    <!-- <ul class="wechat-list" v-show="this.$store.state.user.other_list">
        props传递消息对象 baseMsgObj
        <msg-item v-for="baseMsgObj in $store.state.msgList.baseMsg" :item="baseMsgObj" class="list-row line-bottom" :key="baseMsgObj.mid"></msg-item>
    </ul> -->
    <!-- <div class="teamcommit" v-show="this.$store.state.user.status == 5">
        <div class="select-wrap">
            <ul>
                <li class="select-wrap-list">
                    <div class="one-leve" @click="list_show = !list_show">
                        <i v-show="list_show" class="icon"></i>
                        <i v-show="!list_show" class="icon-down"></i>
                        <span class="department">管理部</span>
                        <span class="people_num">2/4</span>
                    </div>
                    <transition name="fade">
                        <div class="select_list" v-show="list_show">
                            <img src="https://sinacloud.net/vue-wechat/images/headers/header01.png" alt="">
                            <div class="text-content">
                                <span class="title">利亚方舟</span>
                                <p class="msg-hi">在不在在不在。。。</p>
                            </div>
                            <span class="the-time">09.21</span>
                        </div>
                    </transition>
                </li>
                <li class="select-wrap-list">
                    <div class="one-leve" @click="list_show2 = !list_show2">
                        <i v-show="list_show" class="icon"></i>
                        <i v-show="!list_show" class="icon-down"></i>
                        <span class="department">售后部</span>
                        <span class="people_num">2/4</span>
                    </div>
                    <transition name="fade">
                        <div class="select_list" v-show="list_show2">
                            <img src="https://sinacloud.net/vue-wechat/images/headers/header01.png" alt="">
                            <div class="text-content">
                                <span class="title">利亚方舟</span>
                                <p class="msg-hi">在不在在不在。。。</p>
                            </div>
                            <span class="the-time">09.21</span>
                        </div>
                    </transition>
                </li>
                <li class="select-wrap-list">
                    <div class="one-leve" @click="list_show3 = !list_show3">
                        <i v-show="list_show" class="icon"></i>
                        <i v-show="!list_show" class="icon-down"></i>
                        <span class="department">开发部</span>
                        <span class="people_num">2/4</span>
                    </div>
                    <transition name="fade">
                        <div class="select_list" v-show="list_show3">
                            <img src="https://sinacloud.net/vue-wechat/images/headers/header01.png" alt="">
                            <div class="text-content">
                                <span class="title">利亚方舟</span>
                                <p class="msg-hi">在不在在不在。。。</p>
                            </div>
                            <span class="the-time">09.21</span>
                        </div>
                    </transition>
                </li>
            </ul>
        </div>
    </div> -->
    <tab v-model="item_tab" class="wechat-tabs">
      <tab-item @on-item-click="onItemClick">对话中</tab-item>
      <tab-item @on-item-click="onItemClick">等待中</tab-item>
      <tab-item @on-item-click="onItemClick">排队中</tab-item>
    </tab>
    <waitting v-if="this.$store.state.user.status == 2" class="list-row line-bottom"></waitting>
    <queue_up_ing v-if="this.$store.state.user.status == 3" class="list-row line-bottom"></queue_up_ing>
    <dialoguing v-if="this.$store.state.user.status == 1" class="list-row line-bottom"></dialoguing>
  </div>
</template>
<script>
import { Tab, TabItem, Swiper, SwiperItem } from 'vux'
    import localforage from 'localforage' // 本地数据库
    import webDB from '@/api/webDB'
    import search from "../common/search"
    import msgItem from "../wechat/msg-item"
    import wechat from '@/api/wechat'
    import { setTimeout } from 'timers';
    import waitting from './waitting'
    import queue_up_ing from './queue_up_ing'
    import dialoguing from './dialoguing'

    export default {
        components: {
            search,
            msgItem,
            waitting,
            queue_up_ing,
            dialoguing,
            Tab,
            TabItem,
            Swiper,
            SwiperItem,
        },
        methods: {
          onItemClick (index) {
            if (index == 0) {
              this.$store.commit('set_dialoguing', 1)
              this.$router.push({ query: { status: 1 }})
              this.$store.commit('set_dialogue_tab')
            } else if (index == 1) {
              this.$store.commit('set_dialoguing', 2)
              this.$router.push({ query: { status: 2 }})
              this.$store.commit('set_dialogue_tab1')
            } else if (index == 2) {
              this.$store.commit('set_dialoguing', 3)
              this.$router.push({ query: { status: 3 }})
              this.$store.commit('set_dialogue_tab2')
            }
          }
        },
        watch: {
          tab_status: function(val) {
            this.item_tab = val
          }
        },
        computed: {
          tab_status: function() {
            return this.$store.state.user.dialogue_tab_status
          }
        },
        mounted () {
          this.$store.commit('set_dialoguing', 1)
        },
        mixins: [window.mixin],
        data() {
            return {
                item_tab: 0,
                "pageName": "会话",
                list_show: true,
                list_show2: false,
                list_show3: false,
                waitting: []
            }
        }
    }
</script>
<style lang="less">
    @import "../../assets/css/wechat.css";
    @import '~vux/src/styles/1px.less';
    @import '~vux/src/styles/center.less';
    .wechat-tabs {
      height: 80px !important;
      line-height: 80px !important;
      .vux-tab-item {
        font-size: 30px !important;
        line-height: 80px !important;
      }
    }
</style>
