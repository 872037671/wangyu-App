<template>
  <div>
    <span class="span" v-if="length_data != null">{{length_data}}</span>
  </div>
</template>

<script>
import webDB from '@/api/webDB'
import localforage from 'localforage'

export default {
  props: ['data'],
  data () {
    return {
      length_data: null
    }
  },
  watch: {
    // 如果用户是点浏览器的返回按钮，就让角标再刷新一次
    "$route" (to, from) {
      if (to.path == '/dialogue' && to.query.status == '1') {
        webDB.get_message_length(this.data.customer_wx_openid, this).then((result) => {
          this.length_data = result
          this.$store.commit('Set_jiaobiao_status_false')
        })
      }
    },
    jiaobiao_data: function(val) {
      webDB.get_message_length(this.data.customer_wx_openid, this).then((result) => {
        this.length_data = result
        this.$store.commit('Set_jiaobiao_status_false')
      })
    }
  },
  computed: {
    jiaobiao_data: function() {
      return this.$store.state.user.Set_jiaobiao_data
    }
  },
  mounted () {
    webDB.get_message_length(this.data.customer_wx_openid, this).then((result) => {
      this.length_data = result
    })
  }
}
</script>

