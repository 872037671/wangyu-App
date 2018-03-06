<template>
  <div>
    <div @click="click">
      <audio ref="audios" class="audio" type=audio/mpeg preload="none" :src="audio_url" />
      <em class="icon"><i class="now" v-if="marks"></i><i class="ing" v-if="!marks"></i></em>
    </div>
  </div>
</template>

<script>
export default {
  props: ['itemid'],
  data () {
    return {
      // audio_url: ''
      marks: true
    }
  },
  computed: {
    audio_url: function() {
      return 'http://kf.lyfz.net/api/v1/we_chat/Business/getMaterial?company_id=' + this.itemid.company_id + '&appid=' + this.itemid.appid + '&media_id=' + this.itemid.media_id + '&type=' + this.itemid.message_type
    }
  },
  mounted () {
    
  },
  methods: {
    click() {
      let that = this
      this.$refs.audios.play()
      this.marks = false
      this.$refs.audios.addEventListener('ended', function () {
      that.marks = true
      }, false)
    }
  }
}
</script>

<style lang="less">
  .icon {
    width: 50px;
    height: 40px;
    display: block;
    i {
      width: 50px;
      height: 40px;
      display: inline-block;
      background: url('../../assets/bg/voies.png') no-repeat;
      background-size: 100% 100% 
    }
    .ing {
      background: url('../../assets/bg/viocing.png') no-repeat;
      background-size: 100% 100% 
    }
  }
</style>

