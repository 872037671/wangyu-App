<template>
  <div id="contact">
    <section>
      <div class="seek-box cl">
        <!-- 筛选条件 -->
        <div class="" @click="is_seekTxt_show = true,is_screen_show = false,is_group_show = false">
          <span class="iconfont icon-sousuo"></span>
          <span>搜索</span>
        </div>
        <div class="" style="text-align: -webkit-center" @click="is_screen_show = true,is_seekTxt_show = false,is_group_show = false">
          <span class="iconfont icon-shaixuan"></span>
          <span>筛选</span>
        </div>
        <div class="" style="text-align: -webkit-right" @click="is_screen_show = false,is_seekTxt_show = false,is_group_show = true">
          <span class="iconfont icon-fensi"></span>
          <span>粉丝分组</span>
        </div>
        <!-- end筛选条件 -->


        <!-- 搜索隐藏层 -->
        <div class="seek-txt" v-show="is_seekTxt_show">
          <div>
            <div>
              <div> <span class="iconfont icon-sousuo"></span></div>
              <div> <input type="text" placeholder="请输入客户名或公共号"></div>
              <div> <span class="iconfont icon-guanbi" style="vertical-align: -webkit-baseline-middle;"></span> </div>
            </div>
          </div>
          <div @click="is_seekTxt_show = false">取消</div>
        </div>
        <!-- end搜索隐藏层 -->
      </div>

      <!-- 客户列表 -->
      <div class="client-box">
        <ul>
          <li>
              <div class="l">
                <div class="picture">
                  <img src="" alt="">
                </div>
              </div>
              <div class="r">
                <div class="title">哈哈哈</div>
                <div>
                  <span class="customer">潜在客户</span>
                  <span class="level">铂金版</span>
                </div>
                <i class="icon-status"></i>
                <p class="date">完成期限：  2017.11.09</p>
              </div>
          </li>
          <li>
            <div class="l">
              <div class="picture">
                <img src="" alt="">
              </div>
            </div>
            <div class="r">
                <div class="title">哈哈哈</div>
                <div>
                  <span class="customer">潜在客户</span>
                  <span class="level">铂金版</span>
                </div>
                <i class="icon-status"></i>
                <p class="date">完成期限：  2017.11.09</p>
              </div>
          </li>
        </ul>
      </div>
      <!-- end客户列表 -->

      <!-- 筛选隐藏层 -->
      <div class="screen-box cl"  v-show="is_screen_show">
        <div class="l">
          <ul>
            <li>
              <div>dawdwad</div>
              <div><span class="iconfont icon-jiantouyou" ></span></div>
            </li>
            <li>
              <div>dawdwad</div>
              <div><span class="iconfont icon-jiantouyou" ></span></div>
            </li>
            <li>
              <div>dawdwad</div>
              <div><span class="iconfont icon-jiantouyou" ></span></div>
            </li>
          </ul>
        </div>
        <div class="r">
          <ul>
            <li>
              <div>dawdwad</div>
              <div></div>
            </li>
            <li>
              <div>dawdwad</div>
              <div></div>
            </li>
            <li>
              <div>dawdwad</div>
              <div></div>
            </li>
            <li>
              <div>dawdwad</div>
              <div></div>
            </li>
            <li>
              <div>dawdwad</div>
              <div></div>
            </li>
          </ul>
        </div>
        <div class="xuanxiang" style="padding: 5px 10px;text-align: center;width: 100%;color: #999;">
          <span class="setting">设置</span>
          <span class="clear">清空</span>
          <span @click="is_screen_show = false" class="true">确定</span>
        </div>
      </div>
      <!-- end筛选隐藏层 -->



      <!-- 分组隐藏层 -->
      <div class="group-box cl"  v-show="is_group_show">
        <div class="l">
          <ul>
            <li>
              <div>dawdwad</div>
            </li>
            <li>
              <div>dawdwad</div>
            </li>
            <li>
              <div>dawdwad</div>
            </li>
          </ul>
        </div>
        <div style="padding: 5px 10px;text-align: center;width: 100%;color: #999;">
          <span @click="is_group_show = false">取消</span>
        </div>
      </div>
      <!-- end分组隐藏层 -->

    </section>
  </div>
</template>
<script>
  export default {
    mixins: [window.mixin],
    data() {
      return {
        "pageName": "业务跟踪",
        is_seekTxt_show: false,
        is_screen_show: false,
        is_group_show: false
      }
    },
    mounted() {
      // mutations.js中有介绍
      this.$store.commit("toggleTipsStatus", -1)
    },
    activated() {
      this.$store.commit("toggleTipsStatus", -1)
    },
    computed: {
      contactsInitialList() {
        return this.$store.getters.contactsInitialList
      },
      contactsList() {
        return this.$store.getters.contactsList
      }
    },
    mounted() {

    },
    methods: {
      toPs(i){
        window.scrollTo(0,this.$refs['key_'+i][0].offsetTop)
      }
    }
  }
</script>
<style lang="less">
  .seek-box{
    height: 80px;
    width: 100%;
    background-color: #efeef4;
    position: relative;
    >div{
      width: 33.33333333%;
      float: left;
      height: 100%;
      box-sizing: border-box;
      padding: 0 10px;
      display: -webkit-box;
      -webkit-box-align: center;
      span{
        color: #808080;
        font-size: 30px;
        position: relative;
      }
      span:first-child{
        vertical-align: bottom;
      }
    }
    .seek-txt{
      position: absolute;
      height: 100%;
      width: 100%;
      box-sizing: border-box;
      padding: 10px;
      z-index: 1;
      background-color: #efeef4;
      >div:first-child{
        position: absolute;
        left: 10px;
        top:10px;
        bottom: 10px;
        right: 90px;
        >div{
          background-color: #fff;
          border-radius: 30px;
          height: 100%;
          width: 100%;
          position: relative;
          >div{
            display: inline-block;
            height: 100%;
          }
          >div:nth-child(1){
            width: 80px;
            text-align: center;
            span{
              vertical-align: middle;
              font-size: 40px;
              position: relative;
            }
          }
          >div:nth-child(2){
            position: absolute;
            left: 80px;
            top: 0;
            bottom: 0;
            right: 80px;
            input{
              height: 100%;
              width: 100%;
              position: absolute;
              border: 0;
              color: #808080;
            }
          }
          >div:nth-child(3){
            width: 80px;
            float: right;
            color: #808080;
            text-align: center;
            line-height: 50px;
          }
        }
      }
      >div:last-child{
        position: absolute;
        top:10px;
        bottom: 10px;
        right: 10px;
        width: 80px;
        color: #808080;
        font-size: 24px;
        display: -webkit-box;
        -webkit-box-align: center;
        text-align: -webkit-center;
      }
    }

  }
  .screen-box{
    position: absolute;
    padding: 0;
    top:80px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 5px 3px 3px #f2eeee;
    >div{
      width: 50%;
      float: left;
      box-sizing: border-box;

    }
    div.l,div.r{
      ul{
        li{
          display: -webkit-box;
          border-bottom: 1px #eaeaea solid;
          height: 70px;
          padding: 0px 10px;
          div{
            font-size: 30px;
            color: #999;
            line-height: 70px;
          }
          div:first-child{
            width: 80%;
          }
          div:last-child{
            width: 20%;
            text-align: right;
          }
        }
        li:last-child{
          border: 0;
        }
      }
    }
    div.r{
      ul{
        li{
          background-color: #f7f7f7;
          div{
            color: #333;
          }
        }
      }
    }
    .xuanxiang{
      display: flex;
      justify-content: space-around;
      span{
        width: 20%;
        display: inline-block;
        border-radius: 15px;
        border: 2px solid #C9C9C9;
      }
    }
  }
  .group-box{
    position: absolute;
    padding: 0;
    top:80px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 5px 3px 3px #f2eeee;
    div{
      ul{
        li{
          padding: 15px 10px;
          box-sizing: border-box;
          border-bottom: 1px #eaeaea solid;
          div{
            color: #b6b6b6;
          }
        }
      }
    }
  }
  .client-box{
    position: relative;
    background-color: #fff;
    overflow: auto;
    ul{
      li{
        position: relative;
        height: 130px;
        border-bottom: 1px #eaeaea solid;
        div.l{
          width: 120px;
          position: absolute;
          left: 10px;
          top: 10px;
          bottom: 10px;
          display: -webkit-box;
          -webkit-box-align: center;
          div.picture{
            height: 90px;
            width: 90px;
            border-radius: 20px;
            background-color: #0bb20c;
            img{
              height: 100%;
              width: 100%;
            }
          }
        }
        div.r{
          position: absolute;
          left: 120px;
          right: 10px;
          top: 10px;
          bottom: 10px;
          div.title{
            font-weight: bold;
            font-size: 20px
          }
        }
        .date{
          position: absolute;
          right: 0;
          bottom: 0;
          color: #999999
        }
        div.title{
          font-weight: bold;
          font-size: 20px;
        }
        div{
          margin-top: 10px;
          span{
            color: #fff;
            display: inline-block;
            background: #FF6969;
            border-radius: 10px;
            text-align: center;
            font-size: 20px;
            padding: 5px 10px;
            margin-right: 20px
          }
          .level{
            background: #12A1FF
          }
        }
        .icon-status{
          width: 170px;
          height: 45px;
          display: block;
          position: absolute;
          right: 0;
          top: 5px;
          background:url('../../assets/bg/success.png') no-repeat;
          background-size: 100% 100%
        }
      }
      li:last-child{
        border: 0
      }
    }
  }
</style>
