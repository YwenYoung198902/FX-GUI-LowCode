/*
 * @Descripttion:
 * @version:
 * @Author: ydl
 * @Date: 2023-10-10 09:50:43
 * @LastEditors: ydl
 * @LastEditTime: 2023-10-10 10:22:08
 */
/**
 * Created by Lzy on 2021/5/19.
 */

/**
 * 获取年月日
 * @param {date} date
 */
export function getDate(temp) {
  const date = temp ? temp : new Date();
  return (
    date.getFullYear() +
    "-" +
    addZero(date.getMonth() + 1) +
    "-" +
    addZero(date.getDate())
  );
}

/**
 * 获取时分秒
 */
export function getTime() {
  const date = new Date();
  return (
    addZero(date.getHours()) +
    ":" +
    addZero(date.getMinutes()) +
    ":" +
    addZero(date.getSeconds())
  );
}

/**
 * 获取周几
 * @param {date} date
 */
export function getWeek(temp) {
  const date = temp ? temp : new Date();
  var weekArray = new Array(
    "周日",
    "周一",
    "周二",
    "周三",
    "周四",
    "周五",
    "周六"
  );
  var week = weekArray[date.getDay()]; //判断今天周几
  return week;
}
/**
 * 获取日期前后n天
 */
export function getAroundDay(num) {
  const date = new Date();
  date.setDate(date.getDate() + num);
  return getDate(date);
}

/**
 * 日期格式化
 * @param {string} str
 */
function addZero(str) {
  return str < 10 ? `0${str}` : str;
}

export function dateFormat(date, format) {
  date = new Date(date);
  date.setHours(date.getHours());
  const o = {
    "M+": date.getMonth() + 1, // month
    "d+": date.getDate(), // day
    "H+": date.getHours(), // hour
    "m+": date.getMinutes(), // minute
    "s+": date.getSeconds(), // second
    "q+": Math.floor((date.getMonth() + 3) / 3), // quarter
    S: date.getMilliseconds(), // millisecond
  };

  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );

  for (const k in o) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return format;
}
