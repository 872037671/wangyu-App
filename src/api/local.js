export default {
    // 判断是否为android客户端
    isAndroid() {
        return localStorage.getItem('ua_client') === 'android'
    },
    take_up_message(that) {
        if (that.$route.query.client) {
            return localStorage.getItem('ua_client')
        } else {
            localStorage.setItem('ua_client', that.$route.query.client)
            return that.$route.query.client
        }
    },
    send_dialogue(that, data) {
        let num = ''
        for (let i = 0; i < 6; i++) {
            num += Math.floor(Math.random() * 10)
        }
        return {
            title: data.customer_wx_nickname,
            message: data.text,
            id: data.customer_wx_openid,
            identifier: num
        }
    }
}