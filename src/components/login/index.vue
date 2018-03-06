<template>
   <div>
      <h2 @click="loginFun">我是登陆页面</h2>
   </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {}
    },
    watch: {},
    methods: {
      loginFun () {
        this.$router.push({
          name: 'dialogue'
        });
      }
    }
  }
</script>
<style>

</style>
