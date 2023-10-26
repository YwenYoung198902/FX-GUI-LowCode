<template>
  <div class="event-management_wrap">
    <div class="add-event_btn">
      <el-button type="primary" size="mini" @click="addEvent"
        >新增交互</el-button
      >
    </div>
    <div class="event-list">
      <!-- 组件内部添加事件 -->
      <el-collapse accordion>
        <el-collapse-item v-for="(ele, index) in eventList" :key="index">
          <template slot="title">
            <el-select
              size="mini"
              v-model="ele.eventType"
              placeholder="请选择"
              @change="(val) => changeEventType(val, index)"
            >
              <el-option
                v-for="item in eventOptions"
                :key="item.type"
                :label="item.title"
                :value="item.type"
              >
              </el-option>
            </el-select>
            <el-button
              icon="el-icon-plus"
              type="primary"
              circle
              size="mini"
              @click="(e) => addMovement(e, ele.eventType, index)"
            ></el-button>
          </template>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane
              v-for="(item, i) in getEventDom(ele.eventType)"
              :label="item.name + i"
              :key="item.name + i"
              :name="item.name + i"
            >
              <el-collapse>
                <el-collapse-item
                  :name="inx + 'movement'"
                  v-for="(movementItem, inx) in getEventDom(ele.eventType)[i]
                    .movementList"
                  :key="inx + 'movement'"
                >
                  <template slot="title">
                    <div class="event-item">
                      交互效果：<el-select
                        size="mini"
                        v-model="
                          getEventDom(ele.eventType)[i].movementList[inx]
                            .movement
                        "
                        @change="
                          (e) => changeMovement(e, ele.eventType, inx, i)
                        "
                        placeholder="请选择"
                      >
                        <el-option
                          v-for="val in movementOptions"
                          :key="val.type"
                          :label="val.title"
                          :value="val.type"
                        >
                        </el-option>
                      </el-select>
                    </div>
                  </template>

                  <div
                    class="event-item"
                    v-show="movementItem.movement === 'flyTo'"
                  >
                    关联字段：<el-input
                      size="mini"
                      v-model="movementItem.flyToField"
                      @change="
                        (e) =>
                          changeFlyToField(e, movementItem.eventType, inx, i)
                      "
                      placeholder="请填写跳转"
                    >
                    </el-input>
                  </div>
                  <div
                    class="event-item"
                    v-show="movementItem.movement === 'jumpLink'"
                  >
                    外部链接：<el-input
                      size="mini"
                      v-model="movementItem.jumpLink"
                      @change="(e) => changeJumpLink(e, ele.eventType, inx, i)"
                      placeholder="请填写跳转"
                    >
                    </el-input>
                  </div>

                  <div
                    class="event-item"
                    v-show="
                      [
                        'showAndHidden',
                        'parameterPassing',
                        'show',
                        'hidden',
                        'dynamicParameterPassing',
                        'componentParameterPassing',
                      ].includes(movementItem.movement)
                    "
                  >
                    <!-- <el-cascader
                      v-model="movementItem.eventAssociatedComponentIds"
                      :options="getEventAssociatedComponentIds()"
                      @change="handleChange"
                      :props="{
                        value: 'id',
                        label: 'name',
                        children: 'drawingList',
                      }"
                    ></el-cascader> -->
                    组件选择：
                    <el-select
                      size="mini"
                      popper-class="eventTypeSelector"
                      v-model="movementItem.eventAssociatedComponentIds"
                      @change="
                        (e) =>
                          changeEventAssociatedComponentIds(
                            e,
                            ele.eventType,
                            inx,
                            i
                          )
                      "
                      multiple
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in getEventAssociatedComponentIds()"
                        :key="item.id"
                        :label="item.config.name"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>
                  <div
                    class="event-item"
                    v-show="movementItem.movement === 'switchPage'"
                  >
                    选择页面：<el-select
                      v-model="movementItem.switchPageId"
                      size="small"
                      @change="
                        (e) => changeSwitchPageId(e, ele.eventType, inx, i)
                      "
                      popper-class="eventTypeSelector"
                      placeholder="请选择"
                    >
                      <el-option
                        v-for="item in switchPage"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                      >
                      </el-option>
                    </el-select>
                  </div>

                  <!-- 时间选择器特殊处理 start -->
                  <div
                    v-if="
                      movementItem.movement === 'dynamicParameterPassing' &&
                      currentConfig.component === 'dateTimePicker'
                    "
                  >
                    <div class="event-item">
                      开始时间key：<el-input
                        size="mini"
                        v-model="movementItem.startTimePicker"
                        @change="
                          (e) =>
                            changeStartTimePickerField(
                              e,
                              movementItem.eventType,
                              inx,
                              i
                            )
                        "
                        placeholder="请填写开始时间key"
                      >
                      </el-input>
                    </div>
                    <div class="event-item">
                      结束时间key：<el-input
                        size="mini"
                        v-model="movementItem.endTimePicker"
                        @change="
                          (e) =>
                            changeEndTimePickerField(
                              e,
                              movementItem.eventType,
                              inx,
                              i
                            )
                        "
                        placeholder="请填写结束时间key"
                      >
                      </el-input>
                    </div>
                  </div>
                  <!-- 时间选择器特殊处理 end -->

                  <!-- 下拉框和输入框特殊处理 start -->
                  <div
                    v-if="
                      movementItem.movement === 'dynamicParameterPassing' &&
                      ['searchBox', 'selectBox'].includes(
                        currentConfig.component
                      )
                    "
                  >
                    <div class="event-item">
                      自定义key：<el-input
                        type="text"
                        size="mini"
                        v-model="movementItem.selectBoxValue"
                        @change="
                          (e) =>
                            changeSelectBoxValueField(
                              e,
                              movementItem.eventType,
                              inx,
                              i
                            )
                        "
                        placeholder="请填写自定义key"
                      >
                      </el-input>
                    </div>
                  </div>
                  <!-- 下拉框和输入框特殊处理 end -->

                  <div
                    class="event-item"
                    v-show="
                      !(formFiledList || []).includes(currentConfig.component)
                    "
                  >
                    参数传递：
                    <CodeEdit
                      v-model="movementItem.componentParams"
                      @change="
                        (e) => changeComponentParams(e, ele.eventType, inx, i)
                      "
                    />
                  </div>
                </el-collapse-item>
              </el-collapse>
            </el-tab-pane>
          </el-tabs>
        </el-collapse-item>
      </el-collapse>
      <el-button type="primary" size="mini" @click="saveEvent">确定</el-button>
    </div>
  </div>
</template>
<!-- #333740 -->

<script>
import CodeEdit from "@/components/codeEditor";
import { multieventComList, formFiled } from "@/utils/const.js";
export default {
  name: "EventManagement",
  components: { CodeEdit },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    changeValue: {
      type: Function,
      default: () => {
        return [];
      },
    },
    switchPage: {
      type: Array,
      default: () => {
        return [];
      },
    },
    // drawingList: {
    //   type: Array,
    //   default: () => {
    //     return [];
    //   },
    // },
  },
  data() {
    return {
      code: "",
      checkboxGroup1: [],
      visibleContextmenu: false,
      currSelectedIndex: -1,
      keyword: "",
      eventOptions: [
        {
          type: "click",
          title: "元素点击",
        },
        {
          type: "lineClick",
          title: "点击行时",
        },
        {
          type: "changeFiled",
          title: "表单组件监听",
        },
      ],
      movementOptions: [
        {
          type: "show",
          title: "显示",
        },
        {
          type: "hidden",
          title: "隐藏",
        },
        {
          type: "showAndHidden",
          title: "切换显示和隐藏",
        },
        {
          type: "parameterPassing",
          title: "自定义接口参数传递",
        },
        {
          type: "dynamicParameterPassing",
          title: "接口动态参数传递",
        },
        {
          type: "jumpLink",
          title: "跳转外部链接",
        },
        {
          type: "flyTo",
          title: "飞到地图点位",
        },
        {
          type: "switchPage",
          title: "切换页面",
        },
        {
          type: "componentParameterPassing",
          title: "组件传参",
        },
        {
          type: "layerControl",
          title: "控制图层显隐",
        },
        // {
        //   type: 'jumpTo',
        //   title: '点击跳转'
        // },
      ],
      // multieventComList: ["numberCount"],
      activeName: "",
      eventDomList: [],
      eventList: [
        {
          eventType: "click",
        },
      ],
      clickEventList: [],
      lineClickEventList: [],
      changeFiledEventList: [],
      eventMenu: {
        click: this.clickEventList,
        lineClick: this.lineClickEventList,
        changeFiled: this.changeFiledEventList,
      },
      currectId: "",
      formFiledList: [],
    };
  },
  methods: {
    handleChange(val) {
      console.log("val:::::::::::::4444", val);
    },
    getEventList(type) {
      let eventList = [];
      switch (type) {
        case "click":
          eventList = this.clickEventList;
          break;
        case "lineClick":
          eventList = this.lineClickEventList;
          break;
        case "changeFiled":
          eventList = this.changeFiledEventList;
          break;
        default:
          break;
      }
      return eventList;
    },
    // 添加事件效果
    addMovement(e, ele, index) {
      e.stopPropagation();
      const tabList = this.getEventDom(ele);
      console.log("tabList:::::::::::::::", tabList);
      const tabIndex = tabList.findIndex(
        (item, index) => item.name + index === this.activeName
      );

      this.getEventList(ele)[tabIndex].movementList.push({
        eventAssociatedComponentIds: [],
        movement: "",
        componentParams: "",
        flyToField: "",
        jumpLink: "",
      });
    },
    getEventDom(type) {
      // this.eventMenu[]
      if (type === "click") {
        return this.clickEventList;
      }
      if (type === "lineClick") {
        return this.lineClickEventList;
      }

      if (type === "changeFiled") {
        return this.changeFiledEventList;
      }
    },
    getEventAssociatedComponentIds() {
      const { parentId } = this.currentConfig;
      const selectOptions = [];
      this.drawingList.forEach((item) => {
        if (item.config.drawingList && item.config.drawingList.length > 0) {
          selectOptions.push(
            ...item.config.drawingList
            // ...item.config.drawingList.map((ele) => {
            //   const childrenConfig = ele;
            //   childrenConfig.config.name = `${item.config.name}-${childrenConfig.config.name}`;
            //   return childrenConfig;
            // })
          );
          selectOptions.push(item);
        } else {
          selectOptions.push(item);
        }
      });
      if (parentId) {
        const parentIndex = this.drawingList.findIndex(
          (item) => item.id === parentId
        );
        return this.drawingList[parentIndex].config.drawingList.concat(
          this.drawingList[parentIndex]
        );
      }
      console.log("this.drawingList:::::::::::::::22", this.drawingList);
      return selectOptions;
    },
    saveEvent() {
      try {
        console.log(
          "changeFiledEventList::::::::::::::::",
          this.changeFiledEventList
        );
        this.$emit("changeSize", "clickEventList", this.clickEventList);
        this.$emit("changeSize", "lineClickEventList", this.lineClickEventList);
        this.$emit(
          "changeSize",
          "changeFiledEventList",
          this.changeFiledEventList
        );
        this.$message({
          message: "保存成功",
          type: "success",
        });
      } catch (error) {
        this.$message({
          message: "保存失败",
          type: "success",
        });
      }
      // return;
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // 新增交互事件
    addEvent() {
      this.eventList.push({
        eventType: "lineClick",
      });
    },
    changeEventAssociatedComponentIds(val, type, index, i) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].eventAssociatedComponentIds =
          val;
      }

      if (type === "lineClick") {
        this.lineClickEventList[i].movementList[
          index
        ].eventAssociatedComponentIds = val;
      }

      if (type === "changeFiled") {
        this.changeFiledEventList[i].movementList[
          index
        ].eventAssociatedComponentIds = val;
      }
      // this.$emit("changeSize", "eventAssociatedComponentIds", e);
    },
    changeMovement(val, type, index, i) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].movement = val;
      }

      if (type === "changeFiled") {
        this.changeFiledEventList[i].movementList[index].movement = val;
      }

      if (type === "lineClick") {
        this.lineClickEventList[i].movementList[index].movement = val;
      }

      // this.$emit("changeSize", "movement", e);
    },

    changeFlyToField(val, type, index) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].flyToField = val;
      }
      if (type === "lineClick") {
        this.lineClickEventList[i].movementList[index].flyToField = val;
      }
      // this.$emit("changeSize", "movement", e);
    },
    changeJumpLink(val, type, index, i) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].jumpLink = val;
      }

      if (type === "lineClick") {
        this.lineClickEventList[i].movementList[index].jumpLink = val;
      }
      // this.$emit("changeSize", "movement", e);
    },
    changeDynamicParameterPassing(val, type, index, i) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].dynamicParameterPassing =
          val;
      }

      if (type === "lineClick") {
        this.lineClickEventList[i].movementList[index].dynamicParameterPassing =
          val;
      }
      // this.$emit("changeSize", "movement", e);
    },
    changeComponentParams(val, type, index, i) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].componentParams = val;
      }

      if (type === "lineClick") {
        this.lineClickEventList[i].movementList[index].componentParams = val;
      }
      // this.$emit("changeSize", "movement", e);
    },
    changeSelectBoxValueField(val, type, index, i) {
      this.changeFiledEventList[i].movementList[index].selectBoxValue = val;

      // this.$emit("changeSize", "movement", e);
    },
    changeSwitchPageId(val, type, index, i) {
      if (type === "click") {
        this.clickEventList[i].movementList[index].switchPageId = val;
      }

      if (type === "lineClick") {
        this.changeFiledEventList[i].movementList[index].switchPageId = val;
      }
      // this.$emit("changeSize", "movement", e);
    },
    changeStartTimePickerField(val, type, index, i) {
      this.changeFiledEventList[i].movementList[index].startTimePicker = val;

      // this.$emit("changeSize", "movement", e);
    },
    changeEndTimePickerField(val, type, index, i) {
      this.changeFiledEventList[i].movementList[index].endTimePicker = val;
      // this.$emit("changeSize", "movement", e);
    },

    changeEventType(e, index) {
      this.eventList[index].eventType = e;
      // this.$emit("changeSize", "eventType", e);
    },
    getComponentsTab(type) {
      const componentsTabMenu = {
        eventList: "event_name",
      };
      return componentsTabMenu[type] || "name";
    },
    setEventOptions() {
      this.formFiledList = formFiled;
      if (formFiled.includes(this.currentConfig.component)) {
        this.eventOptions = [
          {
            type: "changeFiled",
            title: "表单组件监听",
          },
        ];
      } else {
        this.eventOptions = [
          {
            type: "click",
            title: "元素点击",
          },
          {
            type: "lineClick",
            title: "点击行时",
          },
        ];
      }
    },
    init() {
      const {
        clickEventList = [],
        data,
        eventList = [],
        lineClickEventList = [],
        changeFiledEventList = [],
        component,
      } = this.currentConfig;

      const name = this.currentConfig[this.getComponentsTab(component)];
      console.log("component:::::", component, name)
      if (multieventComList.includes(component)) {
        eventList.forEach((element) => {
          if (element.eventType === "click") {
            this.clickEventList = (
              clickEventList.length === 0 ? data : clickEventList
            ).map((item, index) => {
              return {
                name: data[index][this.getComponentsTab(component)],
                movementList: [
                  {
                    eventAssociatedComponentIds: [],
                    movement: "",
                    componentParams: "",
                    flyToField: "",
                    jumpLink: "",
                  },
                ],
                ...item,
              };
            });
          }

          // if (element.eventType === "lineClick") {
          this.lineClickEventList = (
            lineClickEventList.length === 0 ? data : lineClickEventList
          ).map((item, index) => {
            return {
              name: data[index][this.getComponentsTab(component)],
              movementList: [
                {
                  eventAssociatedComponentIds: [],
                  movement: "",
                  componentParams: "",
                  flyToField: "",
                  jumpLink: "",
                },
              ],
              ...item,
            };
          });
          // if (element.eventType === "lineClick") {

          // }
          this.$nextTick(() => {
            this.activeName =
              (clickEventList.length === 0 ? data : clickEventList)[0][
                this.getComponentsTab(component)
              ] + 0;
          });
        });
      } else {
        console.log(
          "eventList:::::::::::::::",
          eventList,
          lineClickEventList,
          changeFiledEventList
        );
        let tabName = name;
        // 多屏组件特殊处理
        if (component === 'splitCameraScreen') {
          tabName = '退出全屏'
        }

        if (component === 'eventList') {
          tabName = '事件列表'
        }
        eventList.forEach((element) => {
          if (element.eventType === "click") {
            this.clickEventList = (
              clickEventList.length === 0 ? [{ name: tabName }] : clickEventList
            ).map((item, index) => {
              return {
                name,
                movementList: [
                  {
                    eventAssociatedComponentIds: [],
                    movement: "",
                    componentParams: "",
                    flyToField: "",
                    jumpLink: "",
                  },
                ],
                ...item,
              };
            });
          }

          this.lineClickEventList = (
            lineClickEventList.length === 0 ? [{ name: tabName }] : lineClickEventList
          ).map((item, index) => {
            return {
              name,
              movementList: [
                {
                  eventAssociatedComponentIds: [],
                  movement: "",
                  componentParams: "",
                  flyToField: "",
                  jumpLink: "",
                },
              ],
              ...item,
            };
          });
          this.changeFiledEventList = (
            changeFiledEventList.length === 0
              ? [{ name }]
              : changeFiledEventList
          ).map((item, index) => {
            return {
              name,
              movementList: [
                {
                  eventAssociatedComponentIds: [],
                  movement: "",
                  componentParams: "",
                  flyToField: "",
                  jumpLink: "",
                },
              ],
              ...item,
            };
          });
        });
        
        this.$nextTick(() => {
          this.activeName = tabName + '0';
        });
      }

      this.eventList = eventList;
    },
  },
  computed: {
    drawingList: {
      get() {
        return this.$store.state.drawingList;
      },
      set(newvalue) {
        this.$store.commit("SET_DRAWING_LIST", newvalue);
      },
    },
    // currectId(value){
    //   return value
    // },
    currentConfig: {
      get() {
        return this.$store.state.currentConfig;
      },
      set(newvalue) {
        this.$store.commit("SET_CURRENT_CONFIG", newvalue);
      },
    },
  },
  watch: {
    "currentConfig.id"(value) {
      this.setEventOptions();
      console.log("value:::::::::::::::::", value);
      this.init();
    },
  },
  mounted() {
    this.init();
  },
};
</script>

<style lang="scss">
.el-select-dropdown.is-multiple.eventTypeSelector {
  .el-select-dropdown__item.selected {
    background-color: rgba($color: #000000, $alpha: 0);
  }
}
.event-management_wrap {
  padding: 10px;
  box-sizing: border-box;

  .collapse-item_title {
    display: inline-block;
  }

  .el-tabs__nav {
    .el-tabs__item {
      color: #fff;
    }
  }

  .event-item {
    color: #eee;

    & + .event-item {
      margin-top: 10px;
    }
  }
}
</style>