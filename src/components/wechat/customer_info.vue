<template>
    <div class="dialogue-info">
        <x-header :right-options="{showMore: false}" @on-click-more="showMenus = true">业务跟踪</x-header>
        <div class="header-info">
            <div class="left">
                <img :src="user_head_pic" alt="">
                <div class="text">
                    <p>微信名称：{{customer_wx_nickname}}</p>
                    <p>来源平台：{{app_name}}</p>
                </div>
            </div>
            <div class="right">
                <!-- <p>公众平台</p> -->
                <p>会话次数： {{session_frequency}}</p>
            </div>
        </div>
        <div class="text-con">
            <span>首次沟通：{{add_time}}</span>
            <span>最近沟通：{{zuijin_time}}</span>
        </div>
        <section class="sec-content">
            <div class="wrap">
                <group title="">
                    <selector title="粉丝分组" placeholder="无标签" v-model="demo02" :options="list" @on-change="onChange"></selector>
                </group>
                <group>
                    <x-input title="公司名称" v-model="setCustomerInfo_data.company_names"></x-input>
                </group>
                <div class="username">
                  <group>
                      <x-input title="客户姓名" v-model="setCustomerInfo_data.real_name" @on-change="username_change" @on-focus="username_focus"></x-input>
                  </group>
                  <div class="xialaSelect" v-if="xialaSelect_status">
                    <ul>
                      <li @click="choose_customer(item, index)" v-if="item.real_name != '' && item.real_name != null" v-for="(item, index) in focu_data_list" :key="index">{{item.real_name}}</li>
                    </ul>
                  </div>
                </div>
                <group title="性别">
                  <radio v-model="radio_demo" :options="radiocheck" @on-change="change_sex"></radio>
                </group>
                <group>
                    <x-input title="手机号码" v-model="setCustomerInfo_data.real_phone"></x-input>
                </group>
                <group title="客户生日">
                  <datetime
                    v-model="date_value"
                    @on-change="change_birthday"
                    title="生日"></datetime>
                </group>
                <group>
                    <x-input title="电话号码" v-model="setCustomerInfo_data.tel"></x-input>
                </group>
                <group>
                    <x-input title="邮箱" v-model="setCustomerInfo_data.email"></x-input>
                </group>
                <group>
                    <x-textarea title="备注" v-model="setCustomerInfo_data.desc"></x-textarea>
                </group>
            </div>
        </section>
        <!-- <section class="sec-content" style="padding-bottom:100px;border-bottom:none">
            <div class="wrap">
                <group>
                    <x-input title="所属行业" v-model="gongsi_name"></x-input>
                </group>
                <group>
                    <x-input title="意向产品" v-model="gongsi_name"></x-input>
                </group>
                <group>
                    <x-input title="意向度" v-model="gongsi_name"></x-input>
                </group>
            </div>
        </section> -->
        <x-button style="width:80%;margin:30px auto" @click.native="save_data" type="primary">保存</x-button>
    </div>
</template>
<script>
    import { Selector, Group, XInput, XTextarea, Divider, Card, XButton, XHeader, Radio, Datetime, Alert } from 'vux'
    import myself from '@/api/myself'
    export default {
        data() {
            return {
                sheetVisible: 123,
                xialaSelect_status: false,
                group_data: '粉丝分组',
                demo02: '无标签',
                user_head_pic: '',
                list: [
                    {
                        key: '1',
                        value: '无标签'
                    },
                    {
                        key: '2',
                        value: '意向客户'
                    },
                    {
                        key: '3',
                        value: '订单客户'
                    },
                    {
                        key: '4',
                        value: '追销客户'
                    },
                    {
                        key: '5',
                        value: '其他'
                    }
                ],
                radiocheck: [ '男', '女' ],
                radio_demo: '男',
                date_value: '',
                gongsi_name: '',
                zuijin_time: localStorage.getItem('zuij_time'),
                customer_wx_nickname: JSON.parse(localStorage.getItem('user_info')).customer_wx_nickname,
                app_name: JSON.parse(localStorage.getItem('user_info')).app_name,
                session_frequency: JSON.parse(localStorage.getItem('user_info')).session_frequency,
                add_time: JSON.parse(localStorage.getItem('user_info')).add_time,
                setCustomerInfo_data: {
                  appid: JSON.parse(localStorage.getItem('user_info')).appid,
                  birthday :"",
                  company_id: JSON.parse(localStorage.getItem('user_info')).company_id,
                  company_names:"",
                  contact_address:"", // 联系地址可以为空
                  customer_info_id: "", // 可以为空
                  customer_type: 0,
                  desc: "",
                  email: "",
                  is_Loading: false,
                  openid: JSON.parse(localStorage.getItem('user_info')).customer_wx_openid,
                  product_id: [], // 可以为空
                  real_name: "", 
                  real_phone: "",
                  real_sex: "",
                  tel: "",
                  uid: JSON.parse(localStorage.getItem('user_info')).uid,
                  wx_company_id: "", // 可以为空
                  wx_company_name: null, // 可以为null
                  wx_number: "", // 联系微信暂时为空
                  wx_user_group_id: -1, // 空
                  wx_user_group_name: null // 空
                },
                focu_data_list: {}
            }
        },
        components: {
            Selector,
            Group,
            Alert,
            Radio,
            XInput,
            XTextarea,
            Divider, 
            Card,
            Datetime,
            XHeader,
            XButton
        },
        methods: {
          save_data() {
            let that = this
            myself.setCustomerInfo({
              data: that.setCustomerInfo_data,
              success: (result) => {
                this.$vux.alert.show({
                  content: '保存成功'
                })
              }
            })
          },
          // 选择生日
          change_birthday(val) {
            this.setCustomerInfo_data.birthday = val
          },
          // 选择性别
          change_sex(val) {
            if (val == '男') {
              this.setCustomerInfo_data.real_sex = '1'
            } else {
              this.setCustomerInfo_data.real_sex = '2'
            }
          },
          onChange(val) {
            this.setCustomerInfo_data.customer_type = val-1
          },
          back_dialogue() {
              window.history.go(-1)
          },
          // 离开时的选项
          choose_customer(item, index) {
            console.log(item)
            this.add_time = item.add_time
            this.setCustomerInfo_data.birthday = item.birthday
            this.setCustomerInfo_data.company_id = item.company_id
            this.setCustomerInfo_data.company_names = item.company_names
            this.setCustomerInfo_data.customer_type = item.customer_type
            this.setCustomerInfo_data.desc = item.desc
            this.setCustomerInfo_data.email = item.email
            this.setCustomerInfo_data.real_name = item.real_name
            this.setCustomerInfo_data.real_phone = item.real_phone
            this.setCustomerInfo_data.real_sex = item.real_sex
            this.setCustomerInfo_data.tel = item.tel
            this.setCustomerInfo_data.uid = item.uid
            this.setCustomerInfo_data.tel = item.tel
            this.xialaSelect_status = false
            if (item.real_sex == '0') {
              this.radio_demo = '女'
            }
            this.date_value = item.birthday
          },
          username_focus(e) {
            this.xialaSelect_status = true
          },
          // 用户姓名发生变化
          username_change(val) {
            myself.searchCustomerInfo({
              data: {
                real_name: val
              },
              success: (result) => {
                this.focu_data_list = result.body
                // console.log(result)
              }
            })
          },
          // 还原数据
          reduction() {
            let that = this
            myself.getWxCustomerInfo({
              data: {
                appid: JSON.parse(localStorage.getItem('user_info')).appid,
                openid: JSON.parse(localStorage.getItem('user_info')).customer_wx_openid
              },
              success: (result) => {
                that.setCustomerInfo_data = result.body
                this.date_value = result.body.birthday
                if (result.body.real_sex == '1') {
                  that.radio_demo = '男'
                } else {
                  that.radio_demo = '女'
                }
                that.setCustomerInfo_data.appid = JSON.parse(localStorage.getItem('user_info')).appid
                that.setCustomerInfo_data.openid = JSON.parse(localStorage.getItem('user_info')).customer_wx_openid
              }
            })
          }
        },
        mounted () {
          this.user_head_pic = localStorage.getItem('user_head_pc')
          this.reduction()
        }
    }
</script>

<style lang="less">
@import "../../assets/css/wx-header.css";
@import "../../assets/css/customer.css";
    
</style>

