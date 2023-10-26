interface ArrayBufferConstructor {
    /**
     * 静态ArrayBuffer.transfer() 方法返回一个新的ArrayBuffer，
     * 其内容取自oldBuffer的数据，并且根据 newByteLength 的大小来对数据进行截取或者以0扩展。
     * 如果 newByteLength 未定义，则使用 oldBuffer 的byteLength。这个操作使得 oldBuffer 处于被移除的状态。
     * @param oldBuffer 
     * @param newByteLength 
     */
    // 
    // isView(arg: any): arg is ArrayBufferView;
    transfer(oldBuffer: ArrayBuffer, newByteLength?: number): ArrayBuffer;
}