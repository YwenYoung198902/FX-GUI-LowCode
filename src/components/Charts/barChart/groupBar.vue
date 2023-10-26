<template>
  <div
    ref="groupBar"
    class="chart-wrap"
    v-show="isShowModuleFunc(config)"
  ></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import defaultSetting from "@/components/Charts/commonNew";
export default {
  name: "groupBar",
  props: {
    config: {
      type: Object,
    },
    component: {
      type: String,
    },
  },
  mixins: [resize],
  data() {
    return {};
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      // const { title, legend, grid, xAxis, yAxis, dataZoom, series } =
      const configData = defaultSetting({ ...this.config, component: this.component });

      this.myChart = echarts.init(this.$refs.groupBar);
      // console.log("series::::::::::", series);
      this.myChart.setOption(
        {
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
          },
          ...configData
        },
        true
      );
      // this.myChart.setOption({
      //   xAxis: {
      //     type: "category",
      //     data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      //   },
      //   yAxis: {
      //     type: "value",
      //   },
      //   tooltip: {
      //     trigger: "axis",
      //   },
      //   legend: {
      //     data: ["Email", "Union Ads", "Video Ads", "Direct", "Search Engine"],
      //   },
      //   grid: {
      //     left: "3%",
      //     right: "4%",
      //     bottom: "3%",
      //     containLabel: true,
      //   },
      //   series: [
      //     {
      //       name: "Email",
      //       type: "line",
      //       data: [150, 230, 224, 218, 135, 147, 260],
      //       type: "line",
      //     },
      //     {
      //       name: "Union Ads",
      //       type: "line",
      //       stack: "Total",
      //       data: [220, 182, 191, 234, 290, 330, 310],
      //     },
      //   ],
      // });
    },
  },
  watch: {
    config: {
      handler() {
        this.initEchart();
      },
      deep: true,
    },
  },
};
</script>
