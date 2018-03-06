/**
 * Created by IT on 2017-11-26.
 */
// 暂时性  数据库
// 数据库类
import localforage from 'localforage' // 本地数据库
import { resolve } from 'url';
import { setTimeout } from 'timers';
let webDB = {
    // 强行清空会话中的新消息数量
    remove_message_length(openid) {
        let store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'message_length'
        });
        console.log(openid)
        store.removeItem(openid)
    },
    // 设置会话中的新消息数量保存到数据库
    set_message_length(openid, data, store, this_vue) {
        store.getItem(openid).then((result) => {
            if (result) {
                result++
                store.setItem(openid, result)
                this_vue.$store.commit('Set_jiaobiao_status')
            } else {
                store.setItem(openid, data.length)
                this_vue.$store.commit('Set_jiaobiao_status')
            }
        })
    },
    // 获取会话中的新消息数量保存到数据库
    get_message_length(openid, this_vue) {
        let store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'message_length'
        });
        return new Promise((resolve) => {
            store.getItem(openid).then((result) => {
                resolve(result)
            })
        })
    },
    // 接受到新消息进行置顶
    set_message_sort(openid, data, db, this_vue) {
        let zancunArr = []
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS my (openid unique, value)');
        });
        db.transaction(function(tx) {
            tx.executeSql('SELECT * FROM my', [], function(tx, results) {
                for (let val of results.rows) {
                    zancunArr.push(val)
                }
                let zancunArrclone = zancunArr
                for (let [index, arrval] of zancunArr.entries()) {
                    if (arrval.openid == openid) {
                        zancunArrclone.splice(index, 1)
                        zancunArrclone.unshift(arrval)
                    }
                }
                db.transaction(function(tx) {
                    for (let [index, val] of zancunArrclone.entries()) {
                        tx.executeSql('DELETE FROM my WHERE openid=?', [val.openid])
                        if (index == zancunArrclone.length - 1) {
                            next(zancunArrclone)
                        }

                    }
                });
            });
        })

        function next(zancunArrclone) {
            let strobj = null
            db.transaction(function(tx) {
                for (let [index, val] of zancunArrclone.entries()) {
                    strobj = val.value
                    tx.executeSql('INSERT INTO my (openid, value) VALUES (?, ?)', [val.openid, strobj]);
                    if (index == zancunArrclone.length - 1) {
                        this_vue.$store.commit('synec')
                    }
                }
            })
        }
    },
    // 保存message消息到数据库
    set_message_data(openid, data, store, this_vue) {
        return new Promise((resolve) => {
            store = localforage.createInstance({
                name: localStorage.getItem('uid') + 'mysql',
                storeName: 'message'
            });
            let dangqian_status = this_vue.$route.query.status
                // this_vue.$router.push({ query: { status: dangqian_status } }) 
            this_vue.$store.commit('set_webDB_status') // 监听用户是否发送消息，如果有就再触发一次message数据的获取，保证user_message_list实时刷新
            let openidArr = []
            let getArr = []
            let p = new Promise((resolve, reject) => {
                store.getItem(openid).then((result) => {
                    getArr = result
                    resolve(getArr)
                })
            })
            p.then((result) => {
                if (result) { // 判断如果message有值得情况
                    openidArr = result
                    for (var i of data) {
                        openidArr.push(i)
                    }
                    store.setItem(openid, openidArr).then((response) => {
                        // this_vue.$router.push({ query: { status: dangqian_status } })
                        this_vue.$store.commit('set_webDB_status_false')
                        resolve()
                    })
                } else { // 判断如果message没有值得情况
                    store.setItem(openid, data).then((response) => {
                        // console.log(response)
                        // this_vue.$router.push({ query: { status: dangqian_status } })
                        this_vue.$store.commit('set_webDB_status_false')
                        resolve()
                    })
                }
            })
        })
    },
    // 获取所有message的消息
    get_message_data(openid) {
        let store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql'
        })
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'message'
        });
        return new Promise((resolve, reject) => {
            store.getItem(openid).then((result) => {
                resolve(result)
            })
        })
    },
    // 设置等待中的数据到数据库
    set_watting_data(waiting_data, store) {
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'waitting'
        });
        for (let val of waiting_data) {
            store.setItem(val.customer_wx_openid, val).then(() => {
                return store.getItem(val.customer_wx_openid)
            })
        }
    },
    // 获取等待中所有数据
    get_waitting_data() {
        let store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql'
        })
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'waitting'
        });
        var waitting_list = [] // 等待中中所有数据列表
        return new Promise(function(resolve, reject) {
            store.keys().then(function(keys) { // 获得所有keys的值
                if (keys.length == 0) {
                    resolve(keys)
                } else {
                    for (var i = 0; i < keys.length; i++) {
                        store.getItem(keys[i]).then((result) => { // 循环获得所有keys对应的value的值
                            waitting_list.push(result)
                            resolve(waitting_list)
                        })
                    }
                }
            })
        })
    },
    // 设置对话中的数据到数据库
    /*
    set_dialogue_up_data(dialogue_up_data, store, that) {
        // indexedDB.deleteDatabase(localStorage.getItem('uid') + 'mysql')
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'dialogue'
        });
        let now_data = null
        if (dialogue_up_data) {
            store.setItem(dialogue_up_data.customer_wx_openid, dialogue_up_data).then(() => {
                that.$store.commit('synec')
                return store.getItem(dialogue_up_data.customer_wx_openid)
            })
        }
    },*/
    set_dialogue_up_data(dataArr, db, that) {
        let strobj = null
        db.transaction(function(tx) {
            for (let val of dataArr) {
                if (val != 'string') {
                    strobj = JSON.stringify(val)
                } else {
                    strobj = val
                }
                tx.executeSql('INSERT INTO my (openid, value) VALUES (?, ?)', [val.customer_wx_openid, strobj]);
                that.$store.commit('synec')
            }
        })
    },
    // 如果是pc端讲等待中信息接入到会话中的操作
    access_session_waitting(openid, store) {
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'waitting'
        });
        return new Promise((resolve, reject) => {
            store.getItem(openid).then((result) => {
                resolve(result)
            })
        })
    },
    // 获取对话中所有数据
    get_dialogue_up_data() {
        let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS my (openid unique, value)');
        });
        let valueArr = []
        return new Promise((resolve) => {
                db.transaction(function(tx) {
                    tx.executeSql('SELECT * FROM my', [], function(tx, results) {
                        for (let val of results.rows) {
                            valueArr.push(JSON.parse(val.value))
                        }
                        if (valueArr.elngth != 0) {
                            resolve(valueArr)
                        }
                    });
                })
            })
            /*
              let store = localforage.createInstance({
                  name: localStorage.getItem('uid') + 'mysql'
              })
              store = localforage.createInstance({
                  name: localStorage.getItem('uid') + 'mysql',
                  storeName: 'dialogue'
              });
              var dialogue_list = [] // 排队中所有数据列表
              return new Promise(function(resolve, reject) {
                  store.keys().then(function(keys) { // 获得所有keys的值
                      if (keys.length == 0) {
                          resolve(keys)
                      } else {
                          for (var i = 0; i < keys.length; i++) {
                              store.getItem(keys[i]).then((result) => { // 循环获得所有keys对应的value的值
                                  dialogue_list.push(result)
                                  resolve(dialogue_list)
                              })
                          }
                      }
                  })
              })
              */
    },
    // remove waitting
    remove_waitting(openid) {
        let store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql'
        })
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'waitting'
        });
        return new Promise((resolve) => {
            store.removeItem(openid).then(() => {
                resolve()
            })
        })
    },
    // remove dialogue
    remove_dialogue(openid, that) {
        let db = openDatabase('mydb', '1.0', 'Test DB', 2 * 1024 * 1024);
        db.transaction(function(tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS my (openid unique, value)');
        });
        db.transaction(function(tx) {
                tx.executeSql('DELETE FROM my WHERE openid=?', [openid])
                that.$store.commit('synec')
                that.$store.commit('set_wechat_dialogue_data_null')
            })
            /*
              let store = localforage.createInstance({
                  name: localStorage.getItem('uid') + 'mysql'
              })
              store = localforage.createInstance({
                  name: localStorage.getItem('uid') + 'mysql',
                  storeName: 'dialogue'
              });
              store.removeItem(openid)
            */
    },
    // remove message
    remove_message(openid) {
        let store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql'
        })
        store = localforage.createInstance({
            name: localStorage.getItem('uid') + 'mysql',
            storeName: 'message'
        });
        store.removeItem(openid)
    }
}

export default webDB