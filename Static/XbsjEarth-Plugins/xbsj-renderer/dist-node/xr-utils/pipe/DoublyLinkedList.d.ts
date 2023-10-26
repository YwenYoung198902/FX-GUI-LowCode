export interface DoublyLinkedListNode<T> {
    item: T;
    previous?: DoublyLinkedListNode<T>;
    next?: DoublyLinkedListNode<T>;
}
interface DoublyLinkedListOptions {
    needLength?: boolean;
}
export declare class DoublyLinkedList<T> {
    head?: DoublyLinkedListNode<T>;
    tail?: DoublyLinkedListNode<T>;
    _length?: number;
    constructor(options?: DoublyLinkedListOptions);
    _incrementLength(): void;
    _decrementLength(): void;
    _setLength(length: number): void;
    /**
     * 链表长度，如果创建链表时，needLength设置为false，这里的length将使用为undefined！
     */
    get length(): number | undefined;
    /**
     * 链表是否为空
     */
    get empty(): boolean;
    /**
     * 遍历
     */
    [Symbol.iterator](): Generator<DoublyLinkedListNode<T>, void, unknown>;
    /**
     * 删除某个节点
     * @param node 要删除的节点
     */
    remove(node: DoublyLinkedListNode<T>): void;
    /**
     * 根据item搜索node，注意不同的node可能拿着同一个item
     * @param item 内容
     */
    getNode(item: T): DoublyLinkedListNode<T> | undefined;
    /**
     * Moves nextNode after node
     * @param node 位置标记
     * @param nextNode 要移动的节点
     */
    moveAfter(node: DoublyLinkedListNode<T>, nextNode: DoublyLinkedListNode<T>): void;
    /**
     * Moves nextNode before node
     * @param node 位置标记
     * @param prevNode 要移动的节点
     */
    moveBefore(node: DoublyLinkedListNode<T>, prevNode: DoublyLinkedListNode<T>): void;
    /**
     * 在某个node之前插入数据，未验证
     * @param node 位置标记
     * @param item 要插入的item
     */
    insertBefore(node: DoublyLinkedListNode<T>, item: T): DoublyLinkedListNode<T>;
    /**
     * 在某个node之后插入数据，未验证
     * @param node 位置标记
     * @param item 要插入的item
     */
    insertAfter(node: DoublyLinkedListNode<T>, item: T): DoublyLinkedListNode<T>;
    _setFirstNode(item: T): DoublyLinkedListNode<T>;
    /**
     * 在链表末端增加一个节点
     * @param item 内容
     */
    push(item: T): DoublyLinkedListNode<T>;
    /**
     * 在链表末端删除一个元素，返回删除的元素的内容
     */
    pop(): T;
    /**
     * 在链表首端删除一个元素，返回删除的元素的内容
     */
    shift(): T;
    /**
     * 在链表首端增加一个元素
     * @param item 内容
     */
    unshift(item: T): DoublyLinkedListNode<T>;
    /**
     * 删除所有数据
     */
    removeAll(): void;
}
export {};
