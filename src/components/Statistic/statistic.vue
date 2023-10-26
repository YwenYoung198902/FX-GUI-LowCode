<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-07-24 16:06:05
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-31 14:39:30
-->
<template>
  <div
    v-show="isShowModuleFunc(config)"
    class="statistic-wrapper"
    :style="{
     width: config.width + 'px',
     height: config.height + 'px'
    }"
  >
    <component
      :is="config.box.direction === 'row'? 'Scroll1':'Scroll2'"
      :config="config"
      :icon1="icon1"
      :icon2="icon2"
    ></component>
  </div>
</template>

<script>
import Scroll1 from './scroll1.vue';
import Scroll2 from './scroll2.vue';
import { getFilterRows } from '@/utils/api';
import { appKey, sign } from '@/utils/const.js';
export default {
  components: {
    Scroll1,
    Scroll2
  },
  data() {
    return {
      icon1: '',
      icon2: ''
    };
  },
  props: {
    config: {
      type: Object
    }
  },
  mounted() {
    this.getPicData();
  },
  methods: {
    async getPicData() {
      // try {
      const data = {
        appKey: appKey,
        sign: sign,
        worksheetId: 'tjslzj',
        rowId: sessionStorage.getItem('rowid'),
        pageIndex: 1,
        pageSize: 100
      };
      const result = await getFilterRows(data);
      let titlePiclist = result.data.rows.map(
        (item) => JSON.parse(item.titleIcon)[0].DownloadUrl
      );
      let numPiclist = result.data.rows.map(
        (item) => JSON.parse(item.numIcon)[0].DownloadUrl
      );
      this.icon1 = titlePiclist[0];
      this.icon2 = numPiclist[0];
      // if (result.success) {
      //   this.$message.success('获取成功');
      // } else {
      //   this.$message.error('获取失败');
      // }
      // } catch (error) {
      //   this.$message.error('获取失败');
      // }
    }
  }
};
</script>

<style lang="scss" scoped>
.statistic-wrapper {
  color: #fff;
  display: flex;
  // pointer-events: all;

  li {
    list-style: none;
  }

  .top {
    display: flex;
    align-items: center;

    .icon {
      font-size: 0;
    }

    .text {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .bottom {
    display: flex;
    align-items: center;

    .icon {
      font-size: 0;
    }
  }
}
</style>