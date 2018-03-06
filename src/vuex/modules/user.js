import mutations from "../mutations";

const user = {
    state: {
        status: '1',
        other_list: true,
        wechat_dialogue_data: null,
        quque_status: '0',
        queue_up_data: {},
        ws_status: true,
        Set_jiaobiao_data: false,
        synec: false,
        dialogue_header_status: false, // 设置会话顶部的状态
        webDB_status: 0, // 设置用户发消息过来的自动更新数据状态值
        dialogue_tab_status: 0, // 会话导航状态栏的区分
    },
    mutations: {
        set_dialoguing: (state, data) => {
            state.status = data
            state.other_list = true
        },
        set_waiting: (state, data) => {
            state.status = data
            state.other_list = true
        },
        set_lining: (state, data) => {
            state.status = data
            state.other_list = true
        },
        set_metting: (state, data) => {
            state.status = data
            state.other_list = true
        },
        set_team_commit: (state, data) => {
            state.status = data
            state.other_list = false
        },
        // 把当前用户的数据保存到对话
        set_wechat_dialogue_data: (state, data) => {
            state.wechat_dialogue_data = data
        },
        // 删掉当前用户的数据保存到对话
        set_wechat_dialogue_data_null: (state, data) => {
            state.wechat_dialogue_data = null
        },
        // 有排队中信息
        set_queue_up: (state, data) => {
            state.quque_status = data
        },
        // 设置排队数据
        set_queue_up_data: (state, data) => {
            state.queue_up_data = data
        },
        // 会话进入聊天页面数据
        set_message_data: (state, data) => {
            state.message_data = data
        },
        // 设置wstoken状态
        SET_WS_TOKEN_STATUS: (state) => {
            state.ws_status = true
        },
        // 设置wstoken为false
        SET_WS_TOKEN_STATUS_false: (state) => {
            state.ws_status = false
        },
        // 设置角标数据的同步
        Set_jiaobiao_status: (state) => {
            state.Set_jiaobiao_data = true
        },
        // 设置角标为false
        Set_jiaobiao_status_false: (state) => {
            state.Set_jiaobiao_data = false
        },
        // 监听pc端删除了会话数据，手机也同步刷新
        synec: (state) => {
            state.synec = true
        },
        // 监听pc端删除了会话数据，手机也同步刷新
        synec_false: (state) => {
            state.synec = false
        },
        // 设置会话顶部的状态
        set_dialogue_header_status: (state) => {
            state.dialogue_header_status = true
        },
        // 设置会话顶部的状态
        set_dialogue_header_status_false: (state) => {
            state.dialogue_header_status = false
        },
        // 设置用户发消息过来的自动更新数据状态值
        set_webDB_status: (state) => {
            state.webDB_status = 1
        },
        // 设置用户发消息过来的自动更新数据状态值=>还原
        set_webDB_status_false: (state) => {
            state.webDB_status = 0
        },
        // 会话导航状态栏的区分
        set_dialogue_tab: (state) => {
            state.dialogue_tab_status = 0
        },
        set_dialogue_tab1: (state) => {
            state.dialogue_tab_status = 1
        },
        set_dialogue_tab2: (state) => {
            state.dialogue_tab_status = 2
        },
    }
}

export default user