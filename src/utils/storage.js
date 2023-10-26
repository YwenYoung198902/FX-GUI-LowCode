/*
 * @Descripttion: 
 * @version: 
 * @Author: qianlishi
 * @Date: 2021-12-11 14:48:27
 * @LastEditors: qianlishi
 * @LastEditTime: 2021-12-13 10:16:49
 */
import Cookies from 'js-cookie'
export function setCookie(k, v) {
  if(typeof(v) == "undefined" || v == null){
    return;
  }

  let val = v;
  if(typeof(v) == "object"){
    val = JSON.stringify(v);
  }
  Cookies.set(k, val)
  Cookies.get(k, val)
}

export function getCookie(k) {
  let val = Cookies.get(k);
  try{
    //如果是number boolean jsonstring是不会报错的
    return JSON.parse(val);
  }catch(e){
    return val;
  }
}
export function delCookie(k) {
  Cookies.remove(k);
}



export function setStorageItem(k, v) {
  if(typeof(v) == "undefined" || v == null){
    return;
  }

  let val = v;
  if(typeof(v) == "object"){
    val = JSON.stringify(v);
  }
  localStorage.setItem(k, val)
}

export function getStorageItem(k) {
  let val = localStorage.getItem(k);
  try{
    //如果是number boolean jsonstring是不会报错的
    return JSON.parse(val);
  }catch(e){
    return val;
  }
}
export function delStorageItem(k) {
  localStorage.removeItem(k);
}