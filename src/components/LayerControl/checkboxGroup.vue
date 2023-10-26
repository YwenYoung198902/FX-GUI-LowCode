<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-25 16:40:17
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-01 11:14:10
-->
<template>
  <div
    class="checkboxGroup-wrapper"
    v-show="isShowModuleFunc(config)"
    :style="{ width: config.width + 'px', height: config.height + 'px' }"
  >
    <div class="top">
      <el-checkbox
        :style="{ width: config.icon.width + 'px' }"
        :indeterminate="isIndeterminate"
        v-model="checkAll"
        @change="handleCheckAllChange"
      ></el-checkbox>
      <span
        :style="{
          width: config.label.width + 'px',
          color: config.label.color,
          fontSize: config.label.fontSize + 'px',
          fontFamily: config.label.fontFamily,
          fontStyle: config.label.fontStyle,
          textAlign: config.label.textAlign,
          fontWeight: config.label.fontWeight,
          letterSpacing: config.label.letterSpacing + 'px',
        }"
        >{{ checkAll ? "取消全选" : "全选" }}</span
      >
    </div>
    <div class="bottom">
      <div class="rows" v-for="(splitArr, index) in list" :key="index">
        <div
          class="block"
          :style="{
            width: config.box.width + 'px',
            height: config.box.height + 'px',
          }"
          v-for="item in splitArr"
          :key="item.rowid"
        >
          <el-checkbox
            :key="item.rowid"
            label=""
            :true-label="1"
            :false-label="0"
            v-model="item.is_selected"
            @change="handleCheckSingleChange(item)"
          ></el-checkbox>
          <img
            :style="{
              width: config.icon.width + 'px',
              height: config.icon.height + 'px',
            }"
            :src="item.default_icon"
            alt=""
          />
          <span
            :style="{
              width: config.label.width + 'px',
              color: config.label.color,
              fontSize: config.label.fontSize + 'px',
              fontFamily: config.label.fontFamily,
              fontStyle: config.label.fontStyle,
              textAlign: config.label.textAlign,
              fontWeight: config.label.fontWeight,
              letterSpacing: config.label.letterSpacing + 'px',
              marginRight: config.label.marginRight,
            }"
            >{{ item.name }}</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
    },
    callBack: {
      type: Function,
      default: () => {
        return () => {

        }
      }
    }
  },
  data() {
    return {
      list: [],
      checkAll: false,
      checkedItems: [],
      isIndeterminate: false,
      IMG_URL:
        window.location.host.includes("localhost") ||
        window.location.host.includes("192.168") ||
        window.location.host.includes("127.0.0.1")
          ? "https://www.sjxks.com"
          : window.location.protocol + "//" + window.location.host,
    };
  },
  watch: {
    config: {
      handler(nl) {
        if (nl.data.length && nl.label.columns) {
          this.splitArray(this.config.data, nl.label.columns);
        }
        this.checkedItems = nl.data.filter((item) => item.is_selected );
        if (this.checkedItems.length === nl.data.length) {
          this.isIndeterminate = false;
          this.checkAll = true;
        } else if (!this.checkedItems.length) {
          this.isIndeterminate = false;
          this.checkAll = false;
        } else {
          this.isIndeterminate = true;
          this.checkAll = false;
        }
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    this.splitArray(this.config.data, this.config.label.columns);
    // this.callBack && this.callBack(this.checkedItems)
  },
  methods: {
    splitArray(data, length) {
      let list = [];
      const arr = data.map((item) => {
        return {
          ...item,
        };
      });
      for (let i = 0; i < arr.length; ) {
        list.push(arr.splice(i, length));
      }
      this.list = list;
    },
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.config.data : [];
      this.callBack && this.callBack(val)
      let data = this.config.data;
      this.isIndeterminate = false;
      this.list.forEach((item) => {
        item.forEach((el) => {
          el.is_selected = val;

          data.forEach((v) => {
            if (v.rowid === el.rowid) {
              v.is_selected = val;
            }
          });
        });
      });
      this.$emit("changeSize", "data", data);
    },
    handleCheckSingleChange(item) {
      let data = this.config.data;
      console.log("item:::::::::::::", item)
      this.callBack && this.callBack(item)
      data.forEach((v) => {
        if (v.rowid === item.rowid) {
          v.is_selected = item.is_selected;
        }
      });
      this.$emit("changeSize", "data", data);
      // this.callBack && this.callBack(item)
      let arr = [].concat.apply([], this.list);
      if (
        arr.filter((item) => item.is_selected).length &&
        arr.filter((item) => item.is_selected).length < arr.length
      ) {
        this.isIndeterminate = true;
      } else if (arr.filter((item) => item.is_selected).length === arr.length) {
        this.isIndeterminate = false;
        this.checkAll = true;
      } else {
        this.isIndeterminate = false;
        this.checkAll = false;
      }
    },
  },
};
</script>

<style lang="scss">
.checkboxGroup-wrapper {
  padding: 20px;
  pointer-events: none;

  .el-checkbox__label {
    width: 100px;
    font-weight: var(--fontWeight);
    font-style: italic;
    text-align: left;
  }

  .el-checkbox__input.is-checked .el-checkbox__inner {
    width: 15px;
    height: 15px;
    background-color: #1b7ef2 !important;
    border-color: #1b7ef2 !important;

    &::after {
      border-color: #143452;
    }
  }

  .el-checkbox__input.is-indeterminate .el-checkbox__inner {
    background-color: #1b7ef2;
    &::before {
      background-color: #143452;
    }
  }

  .top {
    margin-bottom: 20px;
    display: flex;
    align-items: center;

    .el-checkbox {
      display: flex;
      justify-content: center;
      pointer-events: all;
    }

    > span {
      margin-left: 15px;
    }
  }

  .bottom {
    .rows {
      width: 100%;
      display: flex;

      .el-checkbox {
        flex: 1;
        display: flex;
        align-items: center;
        margin-right: 20px;
        pointer-events: all;

        .el-checkbox__label {
          flex: 1;
        }
      }
    }
    .block {
      display: flex;
      align-items: center;
      flex-shrink: 0;
      margin-right: 30px;

      > span {
        margin: 0 15px;
      }
    }
  }
}
</style>