<template>
  <div id="wx-nav">
	<nav>
        <router-link :to="{path: '/dialogue', query:{status:data_id}}" tag="dl" exact>
            <dt class="iconfont icon-liaotianjilu" style="font-size: 24px;">
                <!-- <i class="new-msg-count" v-show="$store.state.newMsgCount">{{$store.state.newMsgCount}}</i> -->
            </dt>
            <dd>会话</dd>
        </router-link>
		    <router-link to="/contact" tag="dl">
            <dt class="iconfont icon-kehu" >
                <!--<i class="new-msg-count">2</i>-->
            </dt>
            <dd>客资</dd>
        </router-link>
        <router-link to="/tail" tag="dl">
          <dt class="iconfont icon-genzong" style="font-size: 24px;">

            <!--<i class="new-msg-count">2</i>-->
          </dt>
          <dd>业务跟踪</dd>
        </router-link>
	    	<router-link to="/statistics" tag="dl">
            <dt class="iconfont icon-tongji4" style="font-size: 22px;">

            </dt>
            <dd>统计分析</dd>
        </router-link>
		    <router-link to="/self" tag="dl">
            <dt class="iconfont icon-mine-red" >
                <!--<i class="new-msg-dot"></i>-->
            </dt>
            <dd>我</dd>
        </router-link>
    </nav>
  </div>
</template>
<script>
    export default {
        data() {
            return {

            }
        },
        computed: {
          data_id: function() {
            return this.$store.state.user.status
          }
        },
        mounted() {
            for (var i in this.$store.state.msgList.baseMsg) {
                if (this.$store.state.msgList.baseMsg[i].read === false && this.$store.state.msgList.baseMsg[i].quiet === false) {
                    this.$store.commit('addNewMsg')
                }
            }
        }
    }
</script>
<style>
    @import "../../assets/css/wx-nav.css";
</style>
