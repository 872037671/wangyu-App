<template>
  <div>
    <span ref="boxx">{{emo}}</span>
  </div>
</template>

<script>
import qqWechatEmotionParser from 'qq-wechat-emotion-parser'
export default {
  props: ['texted'],
  data () {
    return {
      opp: {}  
    }
  },
  computed: {
    emo: function() {
      let tt = this.texted
      let tx = qqWechatEmotionParser(tt)
      this.opp.innerHTML = tx
      return tx
    }
  },
  mounted () {
    this.opp = this.$refs.boxx
  }
}
</script>

<style>

</style>

