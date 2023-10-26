/*
 * @Descripttion: 
 * @version: 
 * @Author: qianlishi
 * @Date: 2021-12-11 14:48:27
 * @LastEditors: qianlishi
 * @LastEditTime: 2021-12-13 10:16:48
 */
/**
 * 函数节流
 */
export function _throttle(fn,delay){
    let timer
    let delay = delay || 1000;   //一秒内触发一次
    return function(...args){
        const context = this
        let canExecute = !timer
        if(canExecute){
            fn.apply(context,args)
        }else{
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            timer = null
        }, delay);
    }
} 