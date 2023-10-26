<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-15 10:54:41
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-01 14:38:54
-->
<template>
  <div
    ref="powerBarChart"
    class="chart-wrap"
    v-show="isShowModuleFunc(config)"
  ></div>
</template>

<script>
import resize from '@/mixins/resize';
import echarts from 'echarts';
import defaultSetting from '@/components/Charts/common';
export default {
  name: 'radarChart',
  props: {
    config: {
      type: Object
    }
  },
  mixins: [resize],
  data() {
    return {
      changeIndexTimer: null
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.initEchart();
    });
  },
  methods: {
    initEchart() {
      const { title, grid } = defaultSetting(this.config);
      this.changeIndexTimer && clearInterval(this.changeIndexTimer);
      let endValue = this.config.scrollNum - 1;
      let yData = this.config.data.map((item) => {
        return JSON.stringify(item);
      });
      this.myChart = echarts.init(this.$refs.powerBarChart);
      let option = {
        title,
        grid,
        xAxis: {
          splitLine: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          axisTick: {
            show: false
          }
        },
        yAxis: [
          {
            axisLine: {
              show: false
            },
            inverse: true,
            axisTick: {
              show: false
            },
            axisLabel: {
              show: true,
              color: this.config.yAxis.axisLabel.color,
              fontSize: this.config.yAxis.axisLabel.fontSize
            },
            position: 'left',
            data: this.config.data.map((item) => item.name)
          },
          {
            type: 'category',
            inverse: true,
            axisTick: 'none',
            axisLine: 'none',
            show: this.config.series.label.show,
            axisLabel: {
              textStyle: {
                color: this.config.series.label.color,
                fontSize: this.config.series.label.fontSize
              },
              formatter: function (data) {
                const d = JSON.parse(data);
                return d.satisfied + '/' + d.total;
              }
            },
            data: yData
          }
        ],
        dataZoom: [
          {
            type: 'slider',
            show: false,
            yAxisIndex: [0, 1],
            startValue: 0,
            endValue: endValue
          }
        ],
        tooltip: {
          show: false
        },
        series: [
          {
            name: '',
            type: 'pictorialBar',
            zlevel: 1,
            itemStyle: {
              normal: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: '#ACF6FF' // 0% 处的颜色
                    },
                    {
                      offset: 0.5,
                      color: '#67DDFE' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: '#68A5FF' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
              }
            },
            symbol: 'rich', // 图形类型，带圆角的矩形
            symbolMargin: '1', // 图形垂直间隔
            symbolRepeat: true, // 图形是否重复
            symbolSize: [5, this.config.series.barWidth], // 图形元素的尺寸
            barWidth: this.config.series.barWidth,
            data: this.config.data.map((item) => item.satisfied)
          },
          {
            name: '',
            type: 'bar',
            barWidth: this.config.series.barWidth,
            barGap: '-100%',
            data: this.config.data.map((item) => item.total),
            itemStyle: {
              normal: {
                color: 'rgba(172, 206, 255, 0.1)',
                barBorderRadius: 0
              }
            }
          }
        ]
      };
      this.myChart.setOption(option, true);
      this.changeIndexTimer = setInterval(() => {
        // 每次向后滚动一个，最后一个从头开始。
        if (option.dataZoom[0].endValue == this.config.data.length - 1) {
          option.dataZoom[0].endValue = endValue;
          option.dataZoom[0].startValue = 0;
        } else {
          option.dataZoom[0].endValue = option.dataZoom[0].endValue + 1;
          option.dataZoom[0].startValue = option.dataZoom[0].startValue + 1;
        }
        this.myChart.setOption(option);
      }, 2000);
    }
  },
  watch: {
    config: {
      handler() {
        this.initEchart();
      },
      deep: true
    }
  }
};
</script>
