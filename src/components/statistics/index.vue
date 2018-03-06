<template>
   <div style="background: #EFEEF4;height: 100%">
    <el-tabs style="margin-top:45px" v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="访问分析" name="first">
        <div class="fangwen1">
          <div class="head-title">
            <h1>访问量</h1>
            <div class="right">
              <Group class="month_data_default">
                <selector placeholder="请选择省份" v-model="month_data_default" :options="month_data"></selector>
                <span class="span-text">{{month_data_default}}</span>
              </Group>
              <Group class="laiyuan">
                <selector placeholder="请选择省份" v-model="laiyuan_data_default" :options="laiyuan_data"></selector>
                <span class="span-text">{{laiyuan_data_default}}</span>
              </Group>
            </div>
          </div>
          <div class="group-girl">
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
          </div>
        </div>
        <div class="fangwen2" style="margin-top:30px">
          <div class="head-title">
            <h1>趋势图</h1>
            <ul class="tishi">
              <li>总访问量</li>
              <li>首次访问量</li>
              <li>粉丝分组</li>
            </ul>
            <img src="../../assets/bg/chart1.png" alt="">
          </div>
        </div>
        <div class="fangwen3" style="margin-top:30px;">
          <div class="head-title">
            <h1>详情</h1>
          </div>
          <el-table
            :data="tableData">
            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="姓名">
            </el-table-column>
          </el-table>
        </div>
        <div class="fangwen4">
          <div class="head-title">
            <h1>来源分析</h1>
            <div class="right">
              <Group class="laiyuan">
                <selector placeholder="访问总量" v-model="fenxi_data_default" :options="fenxi_data"></selector>
                <span class="span-text">{{fenxi_data_default}}</span>
              </Group>
            </div>
          </div>
          <img src="../../assets/bg/chart1.png" alt="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="粉丝数量分析" name="second">
        <div class="fangwen1">
          <div class="head-title">
            <h1>访问量</h1>
            <div class="right">
              <Group class="month_data_default">
                <selector placeholder="请选择省份" v-model="month_data_default" :options="month_data"></selector>
                <span class="span-text">{{month_data_default}}</span>
              </Group>
              <Group class="laiyuan">
                <selector placeholder="请选择省份" v-model="laiyuan_data_default" :options="laiyuan_data"></selector>
                <span class="span-text">{{laiyuan_data_default}}</span>
              </Group>
            </div>
          </div>
          <div class="group-girl">
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
            <div class="group-list">
              <h1>总访问量</h1>
              <p class="number">231231</p>
            </div>
          </div>
        </div>
        <div class="fangwen2" style="margin-top:30px">
          <div class="head-title">
            <h1>趋势图</h1>
            <ul class="tishi">
              <li>总访问量</li>
              <li>首次访问量</li>
              <li>粉丝分组</li>
            </ul>
            <img src="../../assets/bg/chart1.png" alt="">
          </div>
        </div>
        <div class="fangwen3" style="margin-top:30px;">
          <div class="head-title">
            <h1>详情</h1>
          </div>
          <el-table
            :data="tableData">
            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="姓名">
            </el-table-column>
          </el-table>
        </div>
        <div class="fangwen4">
          <div class="head-title">
            <h1>来源分析</h1>
            <div class="right">
              <Group class="laiyuan">
                <selector placeholder="访问总量" v-model="fenxi_data_default" :options="fenxi_data"></selector>
                <span class="span-text">{{fenxi_data_default}}</span>
              </Group>
            </div>
          </div>
          <img src="../../assets/bg/chart1.png" alt="">
        </div>
      </el-tab-pane>
      <el-tab-pane label="工作量分析" name="third">
        <div class="screen-nav">
          <div class="nav-list" @click="ul_list = !ul_list">
            今日
          </div>
          <div class="nav-list" @click="ul_list = !ul_list">
            全部
          </div>
          <div class="nav-list" @click="ul_list = !ul_list">
            会话数
          </div>
          <div class="ul-list" v-show="ul_list">
            <ul>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
            </ul>
          </div>
        </div>
        <div class="fangwen2" style="margin-top:30px">
          <div class="head-title">
            <h1>趋势图</h1>
            <ul class="tishi">
              <li>总访问量</li>
              <li>首次访问量</li>
              <li>粉丝分组</li>
            </ul>
            <img src="../../assets/bg/chart1.png" alt="">
          </div>
        </div>
        <div class="fangwen3" style="margin-top:30px;">
          <div class="head-title">
            <h1>详情</h1>
          </div>
          <el-table
            :data="tableData">
            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="姓名">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="质量分析" name="fourth">
        <div class="screen-nav">
          <div class="nav-list" @click="ul_list = !ul_list">
            今日
          </div>
          <div class="nav-list" @click="ul_list = !ul_list">
            全部
          </div>
          <div class="nav-list" @click="ul_list = !ul_list">
            会话数
          </div>
          <div class="ul-list" v-show="ul_list">
            <ul>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
              <li>会话数</li>
            </ul>
          </div>
        </div>
        <div class="fangwen2" style="margin-top:30px">
          <div class="head-title">
            <h1>趋势图</h1>
            <ul class="tishi">
              <li>总访问量</li>
              <li>首次访问量</li>
              <li>粉丝分组</li>
            </ul>
            <img src="../../assets/bg/chart1.png" alt="">
          </div>
        </div>
        <div class="fangwen3" style="margin-top:30px;">
          <div class="head-title">
            <h1>详情</h1>
          </div>
          <el-table
            :data="tableData">
            <el-table-column
              prop="date"
              label="日期">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名">
            </el-table-column>
            <el-table-column
              prop="address"
              label="姓名">
            </el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
    </el-tabs>
   </div>
</template>

<script>
  import { Selector, Group,Tab, TabItem } from 'vux'
  export default {
    name: 'app',
    components: {
      Selector,
      Group,
      Tab,
      TabItem
    },
    data() {
      return {
        ul_list: false,
        header_select: '利亚方舟影楼管理系统',
        header_select_list: [{key: 'gd', value: '利亚方舟影楼管理系统'}, {key: 'gx', value: '利亚方舟影楼管理系统'}],
        activeName: 'first',
        fenxi_data_default: '全部来源',
        fenxi_data: [
          {
            value: '今天',
            key: '1'
          },
          {
            value: '昨天',
            key: '2'
          },
          {
            value: '本周',
            key: '3'
          },
          {
            value: '本月',
            key: '4'
          }
        ],
        month_data_default: '今天',
        month_data: [
          {
            value: '今天',
            key: '1'
          },
          {
            value: '昨天',
            key: '2'
          },
          {
            value: '本周',
            key: '3'
          },
          {
            value: '本月',
            key: '4'
          }
        ],
        laiyuan_data_default: '全部来源',
        laiyuan_data: [
          {
            value: '今天',
            key: '1'
          },
          {
            value: '昨天',
            key: '2'
          },
          {
            value: '本周',
            key: '3'
          },
          {
            value: '本月',
            key: '4'
          }
        ],
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀'
          }, {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区'
          }, {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普'
          }, {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区'
          }
        ]
      }
    },
    watch: {},
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>
<style lang="less">
  .app-content {
    overflow-y: auto !important;
  }
  .el-select-dropdown__item span{
    // padding: 25px !important
  }
  .header_fenxi {
    .weui-cells {
      background: #0084ff !important;
      margin-top: 0 !important
    }
    .weui-cell__bd {
      justify-content: center !important;
      position: relative;
      text-align: center !important;
      .weui-select {
        display: block;
        width: 50% !important;
        margin: 0 auto !important;
        text-align: center !important;
        display: flex;
        justify-content: center !important;
        color: #fff !important;
        option {
          text-align: center !important;
          color: #999999
        }
      }
    }
  }
  .tabs {
    .el-tabs__header {
      margin-bottom: 0 !important
    }
    height: 80px !important;
    .el-tabs__nav {
      width: 100%;
      background: #EFEEF4
    }
    .el-tabs__item {
      line-height: 80px !important;
      height: 80px !important;
      width: 25%;
      text-align: center;
      padding: 0 !important;
      color: #909091;
      font-size: 25px;
    }
    .el-tabs__item.is-active {
      color: #409EFF !important;
    }
  }
  .fangwen1 {
    background: #fff;
    padding: 30px;
    .head-title {
      padding-bottom: 30px;
      border-bottom: 2px solid #EBEBEB;
      overflow: hidden;
      h1 {
        float: left;
        color: #0084ff;
        font-size: 30px;
        font-weight: bold
      }
      .right {
        float: right;
        width: 70%;
        .span-text {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center
        }
        .month_data_default {
          position: relative;
          width: 40%;
          float: left;
          .weui-cells {
            margin-top: 0 !important
          }
        }
        .laiyuan {
          width: 40%;
          float: right;
          .weui-cells {
            margin-top: 0 !important
          }
        }
      }
    }
    .group-girl {
      display: flex;
      justify-content: center;
      margin-top: 30px;
      .group-list {
        width: 24%;
        text-align: center;
        border-right: 2px solid #F2F2F2;
        h1 {
          font-size: 25px;
          font-weight: bold
        }
      }
      .group-list:nth-last-child(1){
        border-right: none
      }
    }
  }
  .fangwen2 {
    background: #fff;
    padding: 30px;
    .head-title {
      padding-bottom: 30px;
      border-bottom: 2px solid #EBEBEB;
      overflow: hidden;
      h1 {
        float: left;
        color: #0084ff;
        font-size: 30px;
        font-weight: bold
      }
    }
    .tishi {
      width: 100%;
      display: flex;
      justify-content: flex-start;
      li {
        margin-right: 30px
      }
    }
    img {
      width: 100%
    }
  }
  .fangwen3 {
    background: #fff;
    padding: 30px;
    .head-title {
      padding-bottom: 30px;
      border-bottom: 2px solid #EBEBEB;
      overflow: hidden;
      h1 {
        float: left;
        color: #0084ff;
        font-size: 30px;
        font-weight: bold
      }
    }
  }
  .fangwen4 {
    margin-top: 30px;
    margin-bottom: 100px;
    background: #fff;
    padding: 30px;
    .head-title {
      padding-bottom: 30px;
      border-bottom: 2px solid #EBEBEB;
      overflow: hidden;
      h1 {
        float: left;
        color: #0084ff;
        font-size: 30px;
        font-weight: bold
      }
      .right {
        float: right;
        width: 70%;
        .span-text {
          position: absolute;
          left: 0;
          right: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center
        }
        .month_data_default {
          position: relative;
          width: 40%;
          float: left;
          .weui-cells {
            margin-top: 0 !important
          }
        }
        .laiyuan {
          width: 40%;
          float: right;
          .weui-cells {
            margin-top: 0 !important
          }
        }
      }
    }
    img {
      width: 100%
    }
  }
  .screen-nav {
    display: flex;
    justify-content: center;
    background: #fff;
    position: relative;
    height: 80px;
    line-height: 80px;
    .nav-list {
      border-right: 2px solid #E6E6E6;
      width: 34%;
      text-align: center
    }
    .ul-list {
      position: absolute;
      top: 80px;
      width: 100%;
      ul {
        background: #F7F7F7;
        li {
          padding: 0 20px;
          border-bottom: 1px solid #E6E6E6
        }
      }
    }
  }
</style>
