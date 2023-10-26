<template>
  <el-scrollbar class="right-setting scrollbar-wrapper">
    <el-form
      label-width="90px"
      size="small"
      class="border-box"
      style="padding: 8px 16px"
    >
      <el-form-item label="名称：">
        <div class="componentName" style="display: flex; align-items: center">
          <el-input
            v-model="config.name"
            size="mini"
            placeholder=""
            @change="(val) => $emit('changeSize', 'name', val)"
          ></el-input>
          <span
            :class="config.isLock ? 'active' : ''"
            @click="(val) => $emit('changeSize', 'isLock', !config.isLock)"
          ></span>
          <span
            :class="config.isShow ? 'active' : ''"
            @click="(val) => $emit('changeSize', 'isShow', !config.isShow)"
          ></span>
        </div>
      </el-form-item>
      <el-form-item label="组件宽度：">
        <el-input
          v-model="config.width"
          size="mini"
          @change="(val) => $emit('changeSize', 'width', val)"
          placeholder="请输入组件宽度"
        ></el-input>
      </el-form-item>
      <el-form-item label="组件高度：">
        <el-input
          v-model="config.height"
          size="mini"
          @change="(val) => $emit('changeSize', 'height', val)"
          placeholder="请输入组件高度"
        ></el-input>
      </el-form-item>
      <el-form-item label="X距离：">
        <el-input
          v-model="config.left"
          size="mini"
          @change="(val) => $emit('changeSize', 'left', val)"
        ></el-input>
      </el-form-item>
      <el-form-item label="Y距离：">
        <el-input
          v-model="config.top"
          size="mini"
          @change="(val) => $emit('changeSize', 'top', val)"
        ></el-input>
      </el-form-item>

      <el-form-item label="默认展示隐藏：" label-width="110px">
        <el-switch
          style="margin-top: 7px"
          v-model="config.isShowModule"
          @change="(val) => $emit('changeSize', 'isShowModule', val)"
        ></el-switch>
      </el-form-item>

      <el-collapse>
        <el-collapse-item title="标题" name="title">
          <el-form-item label="显示标题：">
            <el-switch v-model="config.title.show"></el-switch>
          </el-form-item>
          <el-form-item label="标题内容：" v-if="config.title.show">
            <el-input v-model="config.title.text" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="字体：" v-if="config.title.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.title.textStyle.color"
                show-alpha
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.title.textStyle.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="X位置：" v-if="config.title.show">
            <el-input v-model="config.title.left" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="Y位置：" v-if="config.title.show">
            <el-input v-model="config.title.top" size="mini"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="网格" name="grid">
          <el-form-item label="距离左侧：">
            <el-input v-model="config.grid.left" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="距离上侧：">
            <el-input v-model="config.grid.top" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="距离右侧：">
            <el-input v-model="config.grid.right" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="距离下侧：">
            <el-input v-model="config.grid.bottom" size="mini"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="图例" name="legend">
          <el-form-item label="显示图例：">
            <el-switch v-model="config.legend.show"></el-switch>
          </el-form-item>

          <el-form-item label="字体：" v-if="config.legend.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.legend.textStyle.color"
                size="mini"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.legend.textStyle.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="图标：" v-if="config.legend.show">
            <el-select v-model="config.legend.icon">
              <el-option
                v-for="item in iconOption"
                :key="item.icon"
                :label="item.label"
                :value="item.icon"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="布局方式：" v-if="config.legend.show">
            <el-select v-model="config.legend.orient">
              <el-option
                v-for="item in orientOption"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="X位置：" v-if="config.legend.show">
            <el-input v-model="config.legend.left" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="Y位置：" v-if="config.legend.show">
            <el-input v-model="config.legend.top" size="mini"></el-input>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="X轴" name="xAxis">
          <el-form-item label="显示轴线：">
            <el-switch v-model="config.xAxis.axisLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="轴线样式：" v-if="config.xAxis.axisLine.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.xAxis.axisLine.lineStyle.color"
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.axisLine.lineStyle.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示刻度：">
            <el-switch v-model="config.xAxis.axisTick.show"></el-switch>
          </el-form-item>
          <el-form-item label="刻度样式：" v-if="config.xAxis.axisTick.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.xAxis.axisTick.lineStyle.color"
                size="mini"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.axisTick.lineStyle.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示标签：">
            <el-switch v-model="config.xAxis.axisLabel.show"></el-switch>
          </el-form-item>
          <el-form-item label="标签样式：" v-if="config.xAxis.axisLabel.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.xAxis.axisLabel.color"
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.axisLabel.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="强制显示：">
            <el-switch v-model="config.xAxis.axisLabel.interval"></el-switch>
          </el-form-item>
          <el-form-item label="旋转角度：">
            <el-input
              v-model="config.xAxis.axisLabel.rotate"
              size="mini"
            ></el-input>
          </el-form-item>
          <el-form-item label="分割线：">
            <el-switch v-model="config.xAxis.splitLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="分割样式：" v-if="config.xAxis.splitLine.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.xAxis.splitLine.lineStyle.color"
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.xAxis.splitLine.lineStyle.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="分割类型：" v-if="config.xAxis.splitLine.show">
            <div class="flex align-center">
              <el-select v-model="config.xAxis.splitLine.lineStyle.type">
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="Y轴" name="yAxis">
          <el-form-item label="轴名称：">
            <el-input v-model="config.yAxis.name" size="mini"></el-input>
          </el-form-item>
          <el-form-item label="名称样式：" v-if="config.yAxis.name">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.yAxis.nameTextStyle.color"
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.nameTextStyle.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示轴线：">
            <el-switch v-model="config.yAxis.axisLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="轴线样式：" v-if="config.yAxis.axisLine.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.yAxis.axisLine.lineStyle.color"
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.axisLine.lineStyle.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示刻度：">
            <el-switch v-model="config.yAxis.axisTick.show"></el-switch>
          </el-form-item>
          <el-form-item label="刻度样式：" v-if="config.yAxis.axisTick.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.yAxis.axisTick.lineStyle.color"
                size="mini"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.axisTick.lineStyle.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input>
            </div>
          </el-form-item>
          <el-form-item label="显示标签：">
            <el-switch v-model="config.yAxis.axisLabel.show"></el-switch>
          </el-form-item>
          <el-form-item label="标签样式：" v-if="config.yAxis.axisLabel.show">
            <div class="flex align-center">
              <el-color-picker
                show-alpha
                v-model="config.yAxis.axisLabel.color"
                size="mini"
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.axisLabel.fontSize"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="分割线：">
            <el-switch v-model="config.yAxis.splitLine.show"></el-switch>
          </el-form-item>
          <el-form-item label="分割样式：" v-if="config.yAxis.splitLine.show">
            <div class="flex align-center">
              <el-color-picker
                v-model="config.yAxis.splitLine.lineStyle.color"
                size="mini"
                show-alpha
              ></el-color-picker>
              <el-input
                v-model="config.yAxis.splitLine.lineStyle.width"
                size="mini"
                style="margin: 0 8px 0 12px"
              ></el-input
              >px
            </div>
          </el-form-item>
          <el-form-item label="分割类型：" v-if="config.yAxis.splitLine.show">
            <div class="flex align-center">
              <el-select v-model="config.yAxis.splitLine.lineStyle.type">
                <el-option
                  v-for="item in lineTypeList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </el-form-item>
        </el-collapse-item>

        <el-collapse-item title="配置项" name="series">
          <el-form-item label="方向：">
            <el-select
              v-model="config.orientation"
              @change="(val) => $emit('changeSize', 'orientation', val)"
            >
              <el-option
                v-for="(item, index) in directionOption"
                :key="index"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>

          <el-tabs
            v-model="activeName"
            editable
            @tab-click="handleClick"
            @edit="handleTabsEdit"
          >
            <el-tab-pane
              :label="`系列${index + 1}`"
              :name="`系列${index + 1}`"
              v-for="(item, index) in config.series"
              :key="`${index}_serie`"
            >
              <div v-if="item.type === 'line'">
                <el-form-item label="系列名称：">
                  <el-input
                    v-model="config.series[index].name"
                    size="mini"
                  ></el-input>
                </el-form-item>
                <el-form-item label="线条宽度：">
                  <el-input
                    v-model="config.series[index].lineStyle.lineWidth"
                    size="mini"
                  ></el-input>
                </el-form-item>
                <el-form-item label="渐变颜色：">
                  <el-switch
                    v-model="config.series[index].lineStyle.show"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="颜色：">
                  <div
                    class="flex align-center"
                    v-if="config.series[index].lineStyle.show"
                  >
                    <el-color-picker
                      v-model="config.series[index].lineStyle.gradualColor[0]"
                      size="mini"
                      show-alpha
                    ></el-color-picker>
                    <span style="margin: 0 5px">-</span>
                    <el-color-picker
                      show-alpha
                      v-model="config.series[index].lineStyle.gradualColor[1]"
                      size="mini"
                    ></el-color-picker>
                  </div>
                  <el-color-picker
                    v-else
                    show-alpha
                    v-model="config.series[index].lineStyle.color"
                    size="mini"
                  ></el-color-picker>
                </el-form-item>
                <el-form-item label="显示填充：">
                  <el-switch
                    v-model="config.series[index].areaStyle.show"
                  ></el-switch>
                </el-form-item>

                <el-form-item
                  label="填充样式："
                  v-if="config.series[index].areaStyle.show"
                >
                  <div class="flex align-center">
                    <el-color-picker
                      v-model="config.series[index].areaStyle.gradualColor[0]"
                      size="mini"
                      show-alpha
                    ></el-color-picker>
                    <span style="margin: 0 5px">-</span>
                    <el-color-picker
                      v-model="config.series[index].areaStyle.gradualColor[1]"
                      size="mini"
                      show-alpha
                    ></el-color-picker>
                  </div>
                </el-form-item>

                <el-form-item label="显示label：">
                  <el-switch
                    v-model="config.series[index].label.show"
                  ></el-switch>
                </el-form-item>

                <el-form-item
                  label="label样式："
                  v-if="config.series[index].label.show"
                >
                  <div class="flex align-center">
                    <el-color-picker
                      show-alpha
                      v-model="config.series[index].label.color"
                      size="mini"
                    ></el-color-picker>
                    <el-input
                      v-model="config.series[index].label.fontSize"
                      size="mini"
                      style="margin: 0 8px 0 12px"
                    ></el-input
                    >px
                  </div>
                </el-form-item>

                <el-form-item
                  label="label位置："
                  v-if="config.series[index].label.show"
                >
                  <div class="flex align-center">
                    <el-select
                      v-model="config.series[index].label.position"
                      placeholder="请选择label位置"
                    >
                      <el-option
                        v-for="(item, i) in positionOption"
                        :label="item.label"
                        :key="i"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>

                <el-form-item label="平滑显示：">
                  <el-switch v-model="config.series[index].smooth"></el-switch>
                </el-form-item>

                <el-form-item label="显示图标：">
                  <el-switch
                    v-model="config.series[index].showSymbol"
                  ></el-switch>
                </el-form-item>

                <el-form-item
                  label="图标大小："
                  v-if="config.series[index].showSymbol"
                >
                  <el-input
                    v-model="config.series[index].symbolSize"
                    size="mini"
                  ></el-input>
                </el-form-item>

                <el-form-item
                  label="图标颜色："
                  v-if="config.series[index].showSymbol"
                >
                  <el-color-picker
                    v-model="config.series[index].itemStyle.color"
                    size="mini"
                    show-alpha
                  ></el-color-picker>
                </el-form-item>

                <el-form-item
                  label="边框颜色："
                  v-if="config.series[index].showSymbol"
                >
                  <el-color-picker
                    show-alpha
                    v-model="config.series[index].itemStyle.borderColor"
                    size="mini"
                  ></el-color-picker>
                </el-form-item>
              </div>
              <div v-if="item.type === 'bar'">
                <el-form-item label="系列名称：">
                  <el-input
                    v-model="config.series[index].name"
                    size="mini"
                  ></el-input>
                </el-form-item>
                <el-form-item label="柱子宽度：">
                  <el-input
                    v-model="config.series[index].itemStyle.barWidth"
                    size="mini"
                  ></el-input>
                </el-form-item>

                <el-form-item label="柱子圆角：">
                  <el-input
                    v-model="config.series[index].itemStyle.barBorderRadius"
                    size="mini"
                  ></el-input>
                </el-form-item>
                <el-form-item label="渐变颜色：">
                  <el-switch
                    v-model="config.series[index].itemStyle.show"
                  ></el-switch>
                </el-form-item>
                <el-form-item label="颜色：">
                  <div
                    class="flex align-center"
                    v-if="config.series[index].itemStyle.show"
                  >
                    <el-color-picker
                      v-model="config.series[index].itemStyle.gradualColor[0]"
                      size="mini"
                      show-alpha
                    ></el-color-picker>
                    <span style="margin: 0 5px">-</span>
                    <el-color-picker
                      show-alpha
                      v-model="config.series[index].itemStyle.gradualColor[1]"
                      size="mini"
                    ></el-color-picker>
                  </div>
                  <el-color-picker
                    v-else
                    show-alpha
                    v-model="config.series[index].itemStyle.color"
                    size="mini"
                  ></el-color-picker>
                </el-form-item>

                <el-form-item label="显示label：">
                  <el-switch
                    v-model="config.series[index].label.show"
                  ></el-switch>
                </el-form-item>

                <el-form-item
                  label="label样式："
                  v-if="config.series[index].label.show"
                >
                  <div class="flex align-center">
                    <el-color-picker
                      show-alpha
                      v-model="config.series[index].label.color"
                      size="mini"
                    ></el-color-picker>
                    <el-input
                      v-model="config.series[index].label.fontSize"
                      size="mini"
                      style="margin: 0 8px 0 12px"
                    ></el-input
                    >px
                  </div>
                </el-form-item>

                <el-form-item
                  label="label位置："
                  v-if="config.series[index].label.show"
                >
                  <div class="flex align-center">
                    <el-select
                      v-model="config.series[index].label.position"
                      placeholder="请选择label位置"
                    >
                      <el-option
                        v-for="(item, i) in positionOption"
                        :label="item.label"
                        :key="i"
                        :value="item.value"
                      ></el-option>
                    </el-select>
                  </div>
                </el-form-item>
              </div>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
    </el-form>
  </el-scrollbar>
</template>
  
  <script>
import commonSetTitle from "../../componments/commonSetTitle";
export default {
  name: "mixedLineandBar",
  components: { commonSetTitle },
  data() {
    return {
      activeName: "系列1",
      lineTypeList: [
        {
          value: "solid",
          label: "实线",
        },
        {
          value: "dashed",
          label: "虚线",
        },
        {
          value: "dotted",
          label: "点线",
        },
      ],
      directionOption: [
        {
          label: "纵向",
          value: "vertical",
        },
        {
          label: "横向",
          value: "horizontal",
        },
      ],
      iconOption: [
        {
          label: "圆形",
          icon: "circle",
        },
        {
          label: "矩形",
          icon: "rect",
        },
        {
          label: "圆矩形",
          icon: "roundRect",
        },
        {
          label: "三角形",
          icon: "triangle",
        },
        {
          label: "菱形",
          icon: "diamond",
        },
        {
          label: "椭圆形",
          icon: "pin",
        },
      ],
      orientOption: [
        {
          label: "水平",
          value: "horizontal",
        },
        {
          label: "垂直",
          value: "vertical",
        },
      ],
      positionOption: [
        {
          label: "内部",
          value: "inside",
        },
        {
          label: "外部",
          value: "outside",
        },
      ],
    };
  },
  props: {
    config: {
      type: Object,
      default: () => {
        return {};
      },
    },
    changeSize: {
      type: Function,
    },
  },
  mounted() {
    this.activeName = "系列1";
  },
  methods: {
    handleClick(e) {
      console.log("e::::::::::::::::::", e);
    },
    changeBar(data) {
      this.currectBar = data.key;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    handleTabsEdit(targetName, action) {
      let series = this.config.series;

      if (action === "add") {
        const tabIndex = this.activeName.substring(2) - 1;
        const type = this.config.series[tabIndex].type;
        series = series.concat(
          type === "bar"
            ? {
                name: "",
                type: "bar",
                orient: "vertical",
                smooth: true, //是否平滑显示
                showSymbol: true, //是否显示图标
                symbolSize: 6, //图标大小
                label: {
                  show: false,
                  color: "#f1f1f1",
                  fontSize: 12,
                  position: "outside",
                },
                itemStyle: {
                  color: "#5171fd",
                  gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
                  borderColor: "#fff",
                  barWidth: 15,
                  show: false,
                  barBorderRadius: 0,
                },
                areaStyle: {
                  show: false,
                  gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
                },
              }
            : {
                name: "",
                type: "line",
                lineStyle: {
                  show: false,
                  gradualColor: ["#5171fd", "#c97afd"], //渐变颜色
                  color: "#5171fd", //非渐变色颜色
                  lineWidth: 2,
                },
                orient: "vertical",
                smooth: true, //是否平滑显示
                showSymbol: true, //是否显示图标
                symbolSize: 6, //图标大小
                label: {
                  show: false,
                  color: "#f1f1f1",
                  fontSize: 12,
                  position: "outside",
                },
                itemStyle: {
                  color: "#000000",
                  borderColor: "#fff",
                },
                areaStyle: {
                  show: false,
                  gradualColor: ["#5171fd", "rgba(127,153,255,0.1)"],
                },
              }
        );
      }
      if (action === "remove") {
        const tabIndex = targetName.substring(2) - 1;
        series = series.filter((item, index) => {
          return index !== tabIndex;
        });
        this.activeName = "系列1";
        console.log("tabIndex::::::::::::", tabIndex);
      }
      this.$emit("changeSize", "series", series);
    },
  },
};
</script>
  
  <style lang="scss">
.right-setting {
  .el-form-item__label {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    letter-spacing: 0em;
    color: #ffffff;
  }

  .el-input__inner {
    background-color: #191a1a;
    color: #ffffff;
    border: none;
  }

  .el-collapse {
    border: none;

    .el-collapse-item__header {
      background-color: #25262a;
      color: #ffffff;
      border: none;
    }

    .el-collapse-item__content {
      padding-bottom: 0;
    }

    .el-collapse-item__wrap {
      background: #1c1c1f;
      border: none;
      padding: 10px;
      box-sizing: border-box;

      .el-tabs__item {
        color: #e2e2e2;
      }

      .el-input__inner {
        background-color: #25262a;
        color: #ffffff;
        border: none;
      }
    }
  }
}
</style>
  