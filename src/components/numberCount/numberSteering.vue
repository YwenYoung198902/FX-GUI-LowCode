<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-21 10:21:09
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-19 10:18:22
-->
<template>
  <div
    class="numberSteering-wrapper"
    v-show="isShowModuleFunc(config)"
    :style="{
      width: config.width + 'px',
      height: config.height + 'px',
    }"
  >
    <el-carousel
      class="outside-carousel"
      indicator-position="none"
      :autoplay="config.box.autoplay"
      arrow="hover"
      :interval="config.box.interval"
    >
      <el-carousel-item v-for="(item, index) in newArr" :key="index">
        <div
          class="block"
          v-for="(el, ind) in item"
          :key="ind"
          :style="{
            width: config.box.width + 'px',
            height: config.box.height + 'px',
            marginRight: config.box.columnPadding + 'px',
            marginBottom: config.box.rowPadding + 'px',
          }"
        >
          <div
            :id="`steeringChart${el.id}`"
            class="steeringChart"
            :style="{
              width: config.echart.width + 'px',
              height: config.echart.height + 'px',
            }"
          ></div>
          <div
            class="background"
            :style="{
              'background-image': 'url(' + config.pic.url + ')',
              width: config.pic.width + 'px',
              height: config.pic.height + 'px',
            }"
          >
            <div
              :style="{
                display: config.number.display,
                fontFamily: config.number.fontFamily,
                fontStyle: config.number.fontStyle, //是否倾斜
                textAlign: config.number.textAlign,
                color: config.number.color,
                fontSize: config.number.fontSize + 'px',
                fontWeight: config.number.fontWeight,
                letterSpacing: config.number.letterSpacing + 'px',
                left: config.number.xPos + 'px',
                top: config.number.yPos + 'px',
              }"
            >
              {{ el.value }}/{{ el.total }}
            </div>
            <div
              :style="{
                display: config.title.display,
                fontFamily: config.title.fontFamily,
                fontStyle: config.title.fontStyle, //是否倾斜
                textAlign: config.title.textAlign,
                color: config.title.color,
                fontSize: config.title.fontSize + 'px',
                fontWeight: config.title.fontWeight,
                letterSpacing: config.title.letterSpacing + 'px',
                left: config.title.xPos + 'px',
                top: config.title.yPos + 'px',
              }"
            >
              {{ el.name }}
            </div>
            <div
              :style="{
                display: config.unit.display,
                fontFamily: config.unit.fontFamily,
                fontStyle: config.unit.fontStyle, //是否倾斜
                textAlign: config.unit.textAlign,
                color: config.unit.color,
                fontSize: config.unit.fontSize + 'px',
                fontWeight: config.unit.fontWeight,
                letterSpacing: config.unit.letterSpacing + 'px',
                left: config.unit.xPos + 'px',
                top: config.unit.yPos + 'px',
              }"
            >
              {{ (el.value / el.total) * 100 }}%
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
export default {
  data() {
    return {
      list: [],
      newArr: [],
    };
  },
  props: {
    config: {
      type: Object,
    },
  },
  computed: {},
  mounted() {
    this.setEchartsStyle();
    this.setList();
  },
  mixins: [resize],
  methods: {
    initEchart(i, index) {
      // console.log("重新渲染");
      let d = this.config.data[index];
      // console.log('initEchart===============', this.$refs['chart' + i]);
      var myChart = echarts.init(document.getElementById("steeringChart" + i));
      var colorList = [
        this.config.echartStyle[index].backgroundFront,
        this.config.echartStyle[index].backgroundBack,
        this.config.echartStyle[index].defaultBg,
      ];
      let per = (d.value / d.total) * 100;
      const option = this.getOption(per, colorList);
      myChart.setOption(option);
    },
    getOption(rate, colorList) {
      var value = rate;
      const option = {
        title: [],
        angleAxis: {
          show: false,
          // 后面的180表示圆环的跨越的角度， 如max设置为100*360/270,startAngle设置为-135
          max: (100 * 360) / 180,
          type: "value",
          startAngle: 180,
          splitLine: {
            show: false,
          },
        },
        // 修改环形的宽度
        barMaxWidth: this.config.echart.barWidth,
        radiusAxis: {
          show: false,
          type: "category",
        },
        polar: {
          // 设置环形的位置
          center: [
            this.config.echart.xPos + "%",
            this.config.echart.yPos + "%",
          ],
          // 设置环形大小
          radius: this.config.echart.size + "%",
        },
        series: [
          {
            type: "bar",
            data: [
              {
                value: value,
                itemStyle: {
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: colorList[1],
                    },
                    {
                      offset: 1,
                      color: colorList[0],
                    },
                  ]),
                },
              },
            ],
            barGap: "-100%",
            coordinateSystem: "polar",
            z: 3,
          },
          {
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: colorList[2],
                  // opacity: 0.3,
                },
              },
            ],
            barGap: "-100%",
            coordinateSystem: "polar",
            z: 1,
          },
          {
            name: "指针",
            type: "gauge",
            center: [
              this.config.echart.xPos + "%",
              this.config.echart.yPos + "%",
            ],
            startAngle: 180,
            endAngle: 0,
            radius: "80%", // 仪表大小
            // min: 0,
            // max: 100,
            axisLine: {
              show: false,
              // lineStyle: {
              //     width: 10,
              // },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: true,
              length: "85%",
              width: 3,
              // offsetCenter: ["-120%", "10%"],
            },
            title: {
              show: false,
            },
            detail: {
              valueAnimation: true,
              show: false,
              offsetCenter: [0, "100%"],
              textStyle: {
                fontSize: 20,
                color: "#fff",
              },
              // formatter: ["{value}"].join("\n"),
              formatter: "{value}%",
              rich: {
                name: {
                  fontSize: 20,
                  // lineHeight: 10,
                  color: "#ddd",
                  padding: [0, 0, 0, 0],
                },
              },
            },
            itemStyle: {
              normal: {
                color: "#FFFFFF",
              },
            },
            data: [
              {
                value: value,
              },
            ],
          },
        ],
      };
      return option;
    },
    getArr(arr, num) {
      let newArr = JSON.parse(JSON.stringify(arr));
      let list = [];
      for (let i = 0; i < newArr.length; ) {
        list.push(newArr.splice(i, num));
      }
      this.newArr = list;
      console.log(this.newArr, "===newArr");
    },
    setEchartsStyle() {
      this.config.echartStyle = [];
      this.config.data.forEach((item) => {
        this.config.echartStyle.push({
          backgroundBack: "#2EE5E3",
          backgroundFront: "#385BF7",
          defaultBg: "rgba(72, 148, 212, 0.3)",
        });
      });
    },
    setList() {
      this.list = this.config.data.map((item, index) => {
        return {
          ...item,
          id: Date.parse(new Date()) + index,
        };
      });
      this.getArr(this.list, this.config.box.arrangeNum);
      let l = this.list.length;
      this.$nextTick(() => {
        for (let i = 0; i < l; i++) {
          this.initEchart(this.list[i].id, i);
        }
      });
    },
    changeEchart() {
      let l = this.list.length;
      this.$nextTick(() => {
        for (let i = 0; i < l; i++) {
          this.initEchart(this.list[i].id, i);
        }
      });
    },
  },
  watch: {
    // config: {
    //   handler() {
    //     this.getArr(this.list, this.config.box.arrangeNum);
    //   },
    //   deep: true,
    //   immediate: true,
    // },
    "config.box.arrangeNum"() {
      this.setList();
      // this.getArr(this.list, this.config.box.arrangeNum);
    },
    "config.data": {
      handler() {
        this.setEchartsStyle();
        this.setList();
      },
      deep: true,
    },
    "config.echart": {
      handler() {
        this.changeEchart();
      },
      deep: true,
    },
    "config.echartStyle": {
      handler() {
        this.changeEchart();
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss">
.numberSteering-wrapper {
  display: flex;

  .steeringChart > div {
    width: 100% !important;
    height: 100% !important;

    canvas {
      width: 100% !important;
      height: 100% !important;
    }
  }

  .el-carousel {
    width: 100%;
    height: 100%;

    .el-carousel__container {
      height: 100%;
    }

    .el-carousel__item {
      display: flex;
    }
  }

  .block {
    display: flex;
    flex-direction: column;
    align-items: center;

    > div:nth-child(1) > div {
      width: 100% !important;
      height: 100% !important;
    }

    > div:nth-child(2),
    > div:nth-child(3),
    > div:nth-child(4) {
      width: 100%;
    }

    .background {
      background-size: 100% 100%;
      background-position: center center;
      background-repeat: no-repeat;
      position: relative;

      > div {
        position: absolute;
        width: 100%;
      }
    }
  }
}
</style>
