<template>
  <div
    class="house"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
      background: `url(${
        config.box.backgroundImg
      }) 100% 100%/100% 100% no-repeat`,
    }"
  >
    <div class="title" :style="[styleTitle]">
      <span>{{ data.name }}</span
      ><span
        :style="{
          background: styleTitle.backgroundClose
        }"
      ></span>
    </div>
    <div class="box">
      <div class="box_top">
        <div class="box_title" :style="[styleTitle2]">
         {{ data.name }}
        </div>
        <div class="box_top_table">
          <div class="row">
            <div>
              <span>房屋性质：</span
              ><span
                :style="{
                  color: data.rental_type == '自住' ? '#FFDB6B' : '#308DFF',
                }"
                >{{ data.rental_type }}</span
              >
            </div>
            <div>
              <span>居住人数：</span><span>{{ data.people_num }}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span>户主姓名：</span><span>{{ data.household_name }}</span>
            </div>
            <div>
              <span>详细地址：</span><span>{{ data.address }}</span>
            </div>
          </div>
          <div class="row">
            <div>
              <span>权利人：</span><span>{{ data.obligee }}</span>
            </div>
            <div>
              <span>权利人电话：</span
              ><span>{{
                data.mobile &&
                  data.mobile.replace(/(\d{5})\d{4}(\d{4})/, "$1****$2")
              }}</span>
            </div>
          </div>
        </div> 
      </div>
      <div class="box_bottom">
        <div class="box_title" :style="[styleTitle2]">
          住户信息
          <!-- <div class="tag">
            <span>党员</span>
            <span>达人</span>
            <span>村民代表</span>
          </div> -->
        </div>
        <div class="table community">
          <el-table :data="data.people" height="370">
            <!-- <el-table-column
              label="住户姓名"
              prop="name"
              align="center"
              width="180"
            >
            </el-table-column>
            <el-table-column
              label="手机号码"
              prop="mobile"
              align="center"
              width="160"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{
                    scope.row.mobile &&
                      scope.row.mobile.replace(
                        /(\d{5})\d{4}(\d{4})/,
                        "$1****$2"
                      )
                  }}
                </span>
              </template>
            </el-table-column>
            <el-table-column
              label="类型"
              prop="attr"
              align="center"
              width="100"
              show-overflow-tooltip
            >
              <template slot-scope="scope">
                <span>
                  {{ scope.row.attr }}
                </span>
              </template>
            </el-table-column>
            <el-table-column label="特殊人员标签" prop="skill" align="center">
              <template slot-scope="scope">
                <div style="display: flex; justify-content: center">
                  <div
                    style="display: flex; justify-content: center"
                    v-for="(it, i) in scope.row.tags"
                    :key="i"
                  >
                  </div>
                </div>
              </template>
            </el-table-column> -->
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//   const dangyuan = require('@/assets/img/common/popup/dangyuan.png');
//   const daren = require('@/assets/img/common/popup/daren.png');
//   const cunmin = require('@/assets/img/common/popup/cunmin.png');
import { setStyleObj, toLoadData } from "@/utils/index.js";
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      //     dangyuan,
      //     daren,
      //     cunmin,
      data: {
        position: "121.3645029677861,28.3980352906802,19.5873489077149",
        district: "[]",
        type: "大套",
        is_rental: "否",
        obligee: "陈正荣",
        mobile: "+8613605862677",
        address: "三区45幢3",
        people: [
          {
            household_name: "陈正荣",
            name: "陈宇扬",
            mobile: "+8613989638099",
            attr: "子",
            type: [],
            skill: [],
            tags: [],
            rowid: "c4f730ca-21b2-4a82-a7b0-b19014a643d9",
          },
          {
            household_name: "陈正荣",
            name: "杨恩萍",
            mobile: "+8613989638099",
            attr: "妻",
            type: ["村民代表"],
            skill: [],
            tags: ["村民代表"],
            rowid: "2b3fea9d-bf5d-4e91-bfde-892128a4409d",
          },
          {
            household_name: "陈正荣",
            name: "陈正荣",
            mobile: "+8613605862677",
            attr: "户主",
            type: [],
            skill: [],
            tags: [],
            rowid: "d0bcdb91-5e29-4823-a13a-8b1f7bdc7478",
          },
          {
            household_name: "陈米云",
            name: "陈米云",
            mobile: "+8618205862782",
            attr: "户主",
            type: [],
            skill: [],
            tags: [],
            rowid: "987c46e2-2446-4da2-8363-4f3faed2febd",
          },
        ],
        name: "C7-3",
        rowid: "24346621-fb24-48d4-9976-fa703381b667",
        rental_type: "自住",
        people_num: 4,
        household_name: "陈正荣,陈米云",
      },
    };
  },
  computed: {
    styleTitle(){
        let d = setStyleObj({ ...this.config.box });
        d.background =`url(${this.config.box.headImg}) 100% 100%/100% 100% no-repeat`;
        d.backgroundClose =`url(${this.config.box.closeImg}) 100% 100%/100% 100% no-repeat`;
        return d
    },
    styleTitle2(){
        let d = setStyleObj({ ...this.config.box.smallTitle });
        d.background=` url(${this.config.box.smallImg}) no-repeat`;
        return d
    }
  },
  mounted() {
    this.houseDetail(this.data.people)
  },
  methods: {
    houseDetail(data){
        if(data&&data.length){
            let houseDetail=[];
            let id = 0;
            Object.keys(data[0]).forEach((key) => {
                
               let obj={}
                obj.label=key
                // obj.id=id
                // obj.value=data[0][key]
                // houseDetail.push(obj)
                id++
        });
        console.log("==========key",houseDetail);
        }
   
    },
    async updateComponentData({ rowid }) {
      this.id = rowid;
      this.config.isShowModule = true;
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'AI_alarm',
        rowId: rowid
      };
      const result = await getRowDetail(data);
      this.eventDetail = result.data;
    }
  },
};
</script>

<style lang="scss" scoped>
.house {
  color: #ffffff;
  pointer-events: all;
  .title {
    width: 100%;
    // height: 44px;
    // font-size: 26px;
    //   background-image: url("../../assets/image/xiaokunshan/pop-title.png");
    // font-family: YouSheBiaoTiHei;
    padding: 0 20px;
    display: flex;
    align-items: center;
    > span:nth-child(1) {
      flex: 1;
    }
    > span:nth-child(2) {
      width: 24px;
      height: 24px;
      // background-image: url("../../assets/image/xiaokunshan/bg11.png");
    }
  }
  .box {
    height: calc(100% - 44px);
    width: 100%;
    padding: 20px;
    .box_title {
      width: 100%;
      //   height: 40px;
      //   background: url("../../assets/image/xiaokunshan/title2.png") no-repeat;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      justify-content: space-between;
      .name {
        // font-size: 20px;
        flex:1;
      }
      .tag {
        display: flex;
        font-size: 16px;
        > span {
          margin-left: 20px;
          text-indent: 24px;
        }
        //   > span:nth-child(1) {
        //     background: url("../../../assets/img/common/popup/dangyuan.png")
        //       no-repeat;
        //     background-position: 0 50%;
        //   }
        //   > span:nth-child(2) {
        //     background: url("../../../assets/img/common/popup/daren.png")
        //       no-repeat;
        //     background-position: 0 50%;
        //   }
        //   > span:nth-child(3) {
        //     background: url("../../../assets/img/common/popup/cunmin.png")
        //       no-repeat;
        //     background-position: 0 50%;
        //   }
      }
    }
    &_top {
      width: 100%;
      height: 196px;
      &_table {
        width: 100%;
        .row {
          width: 100%;
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          margin-bottom: 2px;
          > div {
            width: 372px;
            height: 34px;
            display: flex;
            justify-content: space-between;
            line-height: 34px;
            font-size: 16px;
            > span:nth-child(1) {
              width: 120px;
              background: rgba(48, 141, 255, 0.05);
              border: 1px solid rgba(48, 141, 255, 0.2);
              box-sizing: border-box;
              color: #64beff;
              text-indent: 10px;
            }
            > span:nth-child(2) {
              width: 250px;
              background: rgba(48, 141, 255, 0.15);
              border: 1px solid rgba(48, 141, 255, 0.3);
              box-sizing: border-box;
              padding: 0 10px;
            }
          }
        }
      }
    }
    &_bottom {
      .table {
        margin-top: 10px;
        // 穿透
        .table {
          img {
            width: 16px;
            height: 16px;
            align-self: center;
            margin-right: 10px;
          }

          .default {
            height: 26px;
            line-height: 26px;
            font-size: 14px;
            border-radius: 4px;
            padding: 0 6px;
            margin-right: 5px;
          }
          .old {
            background: rgba(255, 196, 108, 0.1);
            color: #ffc46c;
          }
          .move {
            color: #00dbcc;
            background: rgba(0, 219, 204, 0.1);
          }
          .military {
            color: #308dff;
            background: rgba(48, 141, 255, 0.1);
          }
        }
      }
    }
  }
}
</style>
