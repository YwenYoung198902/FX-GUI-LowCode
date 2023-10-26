<!--
 * @Descripttion: 
 * @version: 
 * @Author: ydl
 * @Date: 2023-10-13 10:03:16
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-13 11:06:20
-->
<template>
  <div class="head-weather" :style="sassStyle">
    <img class="weather-pic" :src="weatherUrl" alt />
    <span
      class="temperature"
      :style="{
        fontSize: config.box.fontSize1 + 'px',
        fontWeight: config.box.fontWeight1,
      }"
      >{{ temperature }}℃</span
    >
    <div class="line" v-if="config.box.isShowLine">|</div>
    <span
      v-if="config.box.isShowWeather"
      class="weather"
      :style="{
        fontSize: config.box.fontSize2 + 'px',
        fontWeight: config.box.fontWeight2,
      }"
      >{{ weather }}</span
    >
  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
    },
  },
  data() {
    return {
      weather: "",
      temperature: null,
      weatherUrl: "",
      week: "",
      iconWeatherMap: {
        风: [
          "有风",
          "平静",
          "微风",
          "和风",
          "清风",
          "强风/劲风",
          "疾风",
          "大风",
          "烈风",
          "风暴",
          "狂爆风",
          "飓风",
          "热带风暴",
          "龙卷风",
        ],
        多云: ["少云", "晴间多云", "多云"],
        雪: [
          "雪",
          "阵雪",
          "小雪",
          "中雪",
          "大雪",
          "暴雪",
          "小雪-中雪",
          "中雪-大雪",
          "大雪-暴雪",
          "冷",
        ],
        雾: [
          "浮尘",
          "扬沙",
          "沙尘暴",
          "强沙尘暴",
          "雾",
          "浓雾",
          "强浓雾",
          "轻雾",
          "大雾",
          "特强浓雾",
        ],
        晴: ["晴", "热"],
        雨夹雪: ["雨雪天气", "雨夹雪", "阵雨夹雪"],
        雨: [
          "阵雨",
          "雷阵雨",
          "雷阵雨并伴有冰雹",
          "小雨",
          "中雨",
          "大雨",
          "暴雨",
          "大暴雨",
          "特大暴雨",
          "强阵雨",
          "强雷阵雨",
          "极端降雨",
          "毛毛雨/细雨",
          "雨",
          "小雨-中雨",
          "中雨-大雨",
          "大雨-暴雨",
          "暴雨-大暴雨",
          "大暴雨-特大暴雨",
          "冻雨",
        ],
        阴: ["阴"],
        霾: ["霾", "中度霾", "重度霾", "严重霾"],
        未知: ["未知"],
      },
    };
  },
  computed: {
    sassStyle() {
      let c = this.config.box.color.slice(
        0,
        this.config.box.color.lastIndexOf(",")
      );
      let b = this.config.box;
      return {
        "--color1": c + ",.3)",
        "--lineh": b.lineHeight + "px",
        background: b.background,
        color: b.color,
      };
    },
  },
  mounted() {
    this.getWeatherData();
    this.timer = setInterval(() => {
      this.getWeatherData();
    }, 1000 * 60 * 60 * 2);
  },
  methods: {
    getWeatherData() {
      fetch(
        `https://restapi.amap.com/v3/weather/weatherInfo?platform=JS&s=rsv3&logversion=2.0&key=9aedaf173cec6f03d4b9ce7c8a9159c5&sdkversion=2.0.5.16&appname=http%253A%252F%252F192.168.6.185%252Fdashboard%252F%2523%252Fhome&csid=EE76055D-45B4-417C-A1FC-430E7ADF9E20&city=${
          this.config.data
        }&output=json&s=rsv3&callback=jsonp_651439_1682414126004`,
        {
          method: "get",
        }
      )
        .then((data) => {
          return data.text();
        })
        .then((data) => {
          const d = JSON.parse(data.split("(")[1].split(")")[0]).lives[0];
          this.temperature = d.temperature;
          this.weather = d.weather;
          this.getIcon(this.weather);
        });
    },
    getIcon(weather) {
      for (const weatherKey in this.iconWeatherMap) {
        if (Object.hasOwnProperty.call(this.iconWeatherMap, weatherKey)) {
          const weatherNames = this.iconWeatherMap[weatherKey];
          const findWeatherItem = weatherNames.find((name) => weather === name);
          if (findWeatherItem) {
            this.weatherUrl = require(`@/assets/image/weather/${weatherKey}.png`);
          }
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.head-weather {
  display: flex;
  align-items: center;
  .temperature {
    margin: 0 20px 0 10px;
  }
  .line {
    width: 1px;
    height: var(--lineh);
    color: var(--color1);
    margin-right: 20px;
  }
}
</style>
