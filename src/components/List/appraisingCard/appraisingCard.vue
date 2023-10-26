<!--
 * @Descripttion: 说明
 * @version: V1.0
 * @Author: 卜倩倩
 * @Date: 2023-08-10 09:47:43
 * @LastEditors: 卜倩倩
 * @LastEditTime: 2023-08-10 10:01:06
-->
<template>
  <div class="apprasiongCard-wrapper">
    <component
      :is="config.box.direction === 'row'? 'Scroll1':'Scroll2'"
      :config="config"
    ></component>
  </div>
</template>

<script>
import Scroll1 from './scroll1.vue';
import Scroll2 from './scroll2.vue';
export default {
  components: {
    Scroll1,
    Scroll2
  },
  props: {
    config: {
      type: Object
    }
  },
  data() {
    return {};
  }
};
</script>