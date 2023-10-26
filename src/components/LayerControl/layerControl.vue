<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-25 16:40:17
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-09-01 11:18:37
-->
<template>
  <div
    class="layerControl-wrapper"
    :style="{width: config.width + 'px', height: config.height + 'px'}"
    v-show="isShowModuleFunc(config)"
  >
    <div
      class="top"
      v-show="config.search.show"
      :style="{
        width: config.search.width + 'px',
        height: config.search.height + 'px'
      }"
      @click="handleClick"
    >
      <el-input
        id="layerInput"
        v-model="searchInput"
        size="mini"
        :placeholder="config.search.placeholder"
        @pointerdown.stop.native
        @keyup.enter.native="search"
        @input="search"
        :style="{
          ...cssVars,
          height: config.search.height + 'px'
        }"
      ></el-input>
    </div>
    <div class="middle">
      <div class="check">
        <el-checkbox
          :style="{width: config.icon.width + 'px'}"
          :indeterminate="isIndeterminate"
          v-model="checkAll"
          @change="handleCheckAllChange"
        ></el-checkbox>
        <span :style="{
          width: config.label.width + 'px',
          color: config.label.color,
          fontSize: config.label.fontSize + 'px',
          fontFamily: config.label.fontFamily,
          fontStyle: config.label.fontStyle,
          textAlign: config.label.textAlign,
          fontWeight: config.label.fontWeight,
          letterSpacing: config.label.letterSpacing + 'px'
          }">{{checkAll ? '取消全选': '全选'}}</span>
      </div>
      <span class="search-button">查看画面</span>
    </div>
    <div class="bottom">
      <div
        class="rows"
        v-for="(splitArr,index) in list"
        :key="index"
      >
        <div
          class="block"
          :style="{
            width: config.box.width + 'px',
            height: config.box.height + 'px'
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
             height: config.icon.height + 'px'
            }"
            :src="IMG_URL + item.default_icon"
            alt=""
          >
          <span :style="{
           width: config.label.width + 'px',
           color: config.label.color,
           fontSize: config.label.fontSize + 'px',
           fontFamily: config.label.fontFamily,
           fontStyle: config.label.fontStyle,
           textAlign: config.label.textAlign,
           fontWeight: config.label.fontWeight,
           letterSpacing: config.label.letterSpacing + 'px',
           marginRight: config.label.marginRight
          }">{{item.name}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {
      searchInput: '',
      list: [],
      checkAll: false,
      checkedItems: [],
      isIndeterminate: false,
      IMG_URL:
        window.location.host.includes('localhost') ||
        window.location.host.includes('192.168') ||
        window.location.host.includes('127.0.0.1')
          ? 'https://www.sjxks.com'
          : window.location.protocol + '//' + window.location.host
    };
  },
  computed: {
    cssVars() {
      return {
        '--backgroundColor': this.config.search.backgroundColor,
        '--height': this.config.search.height + 'px',
        '--fontColor': this.config.search.fontColor,
        '--fontSize': this.config.search.fontSize + 'px',
        '--borderColor':
          this.config.search.backgroundColor.slice(
            0,
            this.config.search.backgroundColor.lastIndexOf(',')
          ) + ', 1)'
      };
    }
  },
  watch: {
    config: {
      handler(nl) {
        if (nl.data.length && nl.label.columns) {
          this.splitArray(this.config.data, nl.label.columns);
        }
        this.checkedItems = nl.data.filter((item) => item.is_selected);
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
      immediate: true
    }
  },
  mounted() {
    this.splitArray(this.config.data, this.config.label.columns);
  },
  methods: {
    splitArray(data, length) {
      let list = [];
      const arr = data.map((item) => {
        return {
          ...item
        };
      });
      for (let i = 0; i < arr.length; ) {
        list.push(arr.splice(i, length));
      }
      this.list = list;
    },
    handleCheckAllChange(val) {
      this.checkedItems = val ? this.config.data : [];
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

      this.$emit('changeSize', 'data', data);
    },
    handleCheckSingleChange(item) {
      let data = this.config.data;
      data.forEach((v) => {
        if (v.rowid === item.rowid) {
          v.is_selected = item.is_selected;
        }
      });
      this.$emit('changeSize', 'data', data);

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
    handleClick() {
      document.getElementById('layerInput').focus();
    },
    search() {
      let filterData = this.config.data.filter((item) =>
        item.name.includes(this.searchInput)
      );
      this.splitArray(filterData, this.config.label.columns);
    }
  }
};
</script>

<style lang="scss">
.layerControl-wrapper {
  pointer-events: all;
  position: relative;
  .el-checkbox {
    pointer-events: all;
  }
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
    pointer-events: all;

    .el-input__inner {
      background-color: var(--backgroundColor);
      border-color: var(--borderColor);
      height: var(--height);
      color: var(--fontColor);
      font-size: var(--fontSize);
      position: absolute;
      left: 0;
      top: 0;
    }
  }

  .middle {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .check {
      display: flex;
      align-items: center;
    }

    .el-checkbox {
      display: flex;
      justify-content: center;
    }

    > span {
      margin-left: 15px;
    }

    .search-button {
      border-radius: 3px;
      background-color: #1b7ef2;
      color: #fff;
      font-size: 14px;
      padding: 5px;
    }
  }

  .bottom {
    .rows {
      width: 100%;
      display: flex;

      .el-checkbox {
        // flex: 1;
        margin-right: 20px;
        display: flex;
        align-items: center;
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