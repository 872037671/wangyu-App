const Upload_methods = {}

const xhr = new XMLHttpRequest();
xhr.open('POST', 'http://localhost:8073/api/v1/we_chat/WxOperation/uploadResources');
xhr.setRequestHeader('token', localStorage.getItem('token'))
xhr.setRequestHeader('client', localStorage.getItem('client'))
xhr.setRequestHeader('uid', localStorage.getItem('uid'))
xhr.send(param);

export default Upload_methods