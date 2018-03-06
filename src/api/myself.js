import service from '@/utils/request'

const myself = {}

// export function getHistoricalConversation(query) {
//   return request({
//     url: '/api/v1/message/Common/getHistoricalConversation',
//     method: 'get',
//     params: {
//       page: '1'
//     }
//   })
// }

myself.getWxAuthList = (obj) => {
    service.get('/api/v1/user/UserOperation/getWxAuthList')
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

myself.createPersonQrcode = (obj) => {
    service.post('/api/v1/extension/handle/createPersonQrcode', obj.data)
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

myself.getPersonQrcodeFansNum = (obj) => {
    service.post('/api/v1/extension/handle/getPersonQrcodeFansNum', obj.data)
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
}

// 修改个人性别
myself.updateSex = (obj) => {
    service.post('/api/v1/user/UserOperation/updateSex', obj.data)
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
}

// 修改姓名
myself.updateUserName = (obj) => {
    service.post('/api/v1/user/UserOperation/updateUserName', obj.data)
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
}

// 修改个人签名
myself.updateAutograph = (obj) => {
    service.post('/api/v1/user/UserOperation/updateAutograph', obj.data)
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
}

// 接入会话
myself.sessionAccess = (obj) => {
    service.post('/api/v1/we_chat/WxOperation/sessionAccess', obj.data)
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
}

// 接入排队会话
myself.accessQueuingSession = (obj) => {
    service.post('/api/v1/message/Common/accessQueuingSession', obj.data)
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
}

// 结束会话
myself.closeSession = (obj) => {
    service.post('/api/v1/we_chat/WxOperation/closeSession', obj.data)
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
}

//发送客服消息
myself.sendMessage = (obj) => {
    service.post('/api/v1/we_chat/WxOperation/sendMessage', obj.data)
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
}

// 设置微信用户的客户信息
myself.setCustomerInfo = (obj) => {
    service.post('/api/v1/customer/CustomerOperation/setCustomerInfo', obj.data)
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
}

// 获取客户信息
myself.getWxCustomerInfo = (obj) => {
    service.post('/api/v1/customer/CustomerOperation/getWxCustomerInfo', obj.data)
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
}

// 获取子账号列表
myself.getUserList = (obj) => {
    service.post('/api/v1/user/UserOperation/getUserList', obj.data)
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
}

// 会话转接
myself.sessionTransfer = (obj) => {
    service.post('/api/v1/message/Common/sessionTransfer', obj.data)
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
}

// 模糊搜索获取客户信息
myself.searchCustomerInfo = (obj) => {
    service.post('/api/v1/customer/CustomerOperation/searchCustomerInfo', obj.data)
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
}

// 设置账号头像
myself.setUserPortrait = (obj) => {
    service.post('/api/v1/user/UserOperation/setUserPortrait', obj.data)
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
}

export default myself
