<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-08-16 11:35:41
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-25 09:55:14
-->
<template>
  <el-select
    popper-class="setting-select"
    v-model="selectedImg[type]"
    placeholder="请选择图片"
    @change="changeSelectImg"
    clearable
  >
    <el-option
      v-for="(item, i) in imgList[type]"
      :key="i"
      :label="item"
      :value="item"
    >
      <div class="img-box">
        <img :src="item" />
      </div>
    </el-option>
  </el-select>
</template>

<script>
import { getFilterRows } from "@/utils/api";
import { appKey, sign } from "@/utils/const.js";
export default {
  props: {
    config: {
      type: Object,
    },
    backgroundData: {
      type: Object,
    },
    type: {
      type: String,
      default: "beijingtu",
    },
    datatype1: {
      type: String,
    },
    imgType: {
      type: String,
      default: "background",
    },
    index: {
      type: Number,
    },
  },
  data() {
    return {
      imgList: {},
      selectedImg: {},
      cockpitNavbar: "",
    };
  },
  watch: {
    datatype1() {
      this.getImg();
    },
    backgroundData: {
      handler() {
        this.init();
      },
      deep: true,
    },
  },
  mounted() {
    // this.init();
  },
  methods: {
    init() {
      this.$set(this.imgList, this.type, []);
      this.getImg();
    },
    getImg() {
      console.log(this.backgroundData, "===data");
      if (this.datatype1) {
        //数组格式
        if (this.index || this.index == 0) {
          this.$set(
            this.selectedImg,
            this.type,
            this.config[this.datatype1][this.index][this.imgType]
          );
        } else {
          this.$set(
            this.selectedImg,
            this.type,
            this.config[this.datatype1][this.imgType]
          );
        }
      } else {
        this.$set(this.selectedImg, this.type, this.config[this.imgType]);
      }
      let data = [];
      this.backgroundData.rows.forEach((item) => {
        if (item.sfqy === "启用") {
          let d = item[this.type] ? JSON.parse(item[this.type]) : [];
          if (d.length > 0) {
            d.forEach((v) => {
              data.push(v.DownloadUrl);
            });
          }
        }
      });
      this.$set(this.imgList, this.type, data);
    },
    changeSelectImg(val) {
      this.$set(this.selectedImg, this.type, val);
      if (this.datatype1) {
        if (this.index || this.index == 0) {
          this.config[this.datatype1][this.index][this.imgType] = val;
        } else {
          this.config[this.datatype1][this.imgType] = val;
        }
      } else {
        this.$emit("changeSize", [this.imgType], val);
      }
    },
  },
};
</script>
