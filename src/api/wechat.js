import service from '@/utils/request'

const weachat = {}

weachat.Login = (obj) => {
    service.post('/api/v1/user/Auth/Login', obj.data)
        .then(function(response) {
            if (response.data.meta.code === 200) {
                obj.success(response.data);
            } else {
                obj.error(response.data);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
};

weachat.getSessionList = (obj) => {
    service.post('/api/v1/we_chat/WxOperation/getSessionList', obj.data)
        .then((result) => {
            if (result.data.meta.code === 200) {
                obj.success(response.data);
            } else {
                obj.erroer(result.data.meta);
            }
        })
        .catch(function(error) {
            console.log(error);
        })
}

// 拉取客服当前等待中会话中相关会话数据
weachat.getSessionList = (obj) => {
    service.get('/api/v1/message/Conversation/getSessionList')
        .then(function(response) {
            if (response.data.meta.code === 200) {
                obj.success(response.data);
            } else {
                obj.error(response);
            }
        })
        .catch(function(error) {
            console.log(error);
        });
}

export default weachat