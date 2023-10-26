<template>
  <div
    ref="customLegendPie"
    class="chart-wrap"
    v-show="isShowModuleFunc(config)"
  ></div>
</template>

<script>
import resize from "@/mixins/resize";
import echarts from "echarts";
import defaultSetting from "@/components/Charts/common";

const colorList = [
  "#4FD8FF",
  "#C15FFF",
  "#FF5F55",
  "#FFC935",
  "#767BFB",
  "rgb(248,70,102)",
];
export default {
  name: "pieChart",
  props: {
    config: {
      type: Object,
    },
    component: {
      type: String
    }
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
      const { title, legend, series } = defaultSetting({...this.config, component: this.component});
      this.myChart = echarts.init(this.$refs.customLegendPie);
      this.myChart.setOption(
        {
          color: this.config.color,
          tooltip: {
            trigger: "item",
            formatter: (params) => {
              console.log("params::::::::::::::::::::", params)
              return (
                params.seriesName + "</br>" + 
                params.marker +
                " " +
                params.name +
                "：" +
                params.value +
                " (" +
                params.percent +
                "%)"
              );
            },
          },
          title,
          legend,
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
