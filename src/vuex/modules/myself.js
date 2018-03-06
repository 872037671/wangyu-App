import mutations from "../mutations";

const myself = {
    state: {
        appid: '',
        avatar_url: '',
        username: '',
        address: ''
    },
    mutations: {
        set_appid: (state, data) => {
            state.appid = data
        }
    }
}

export default myself