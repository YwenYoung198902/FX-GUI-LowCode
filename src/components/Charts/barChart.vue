<template>
  <div
    ref="barChart"
    class="chart-wrap"
    v-show="isShowModuleFunc(config)"
  ></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import defaultSetting from "@/components/Charts/common";
export default {
  name: "barChart",
  props: {
    config: {
      type: Object,
    },
  },
  mixins: [resize],
  data() {
    return {};
  },
  mounted() {
    console.log("this.config::::::::::::::::", this.config);
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      const { title, legend, grid, xAxis, yAxis, dataZoom, series } =
        defaultSetting(this.config);
      this.myChart = echarts.init(this.$refs.barChart);
      console.log(
        "series::::::::::::::::",
        title,
        legend,
        grid,
        xAxis,
        yAxis,
        dataZoom,
        series
      );
      this.myChart.setOption(
        {
          title,
          grid,
          legend,
          tooltip: {
            trigger: "axis",
            axisPointer: {
              type: "shadow",
            },
            // padding: [5, 10],
          },
          xAxis,
          yAxis,
          dataZoom,
          series,
        },
        true
      );
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
