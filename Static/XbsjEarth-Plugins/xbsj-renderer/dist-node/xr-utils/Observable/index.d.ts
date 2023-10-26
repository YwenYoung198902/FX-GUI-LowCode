/**
 * 坑：这个库，能监控对象下面所有的元素，本来只想监控数组，结果监控了数组下面的对象。监控对象也就算了，还把对象的函数给去掉了。。 vtxf 20201203
 * 
 * @example
 * 
 * //////////////////////////////////////////////////////////////////////////////////////
 * // object
 * 
 * const
 * 	order = { type: 'book', pid: 102, ammount: 5, remark: 'remove me' },
 *     observableOrder = Observable.from(order);
 * 
 * observableOrder.observe(changes => {
 *     changes.forEach(change => {
 *         console.log(change);
 *     });
 * });
 * 
 * 
 * observableOrder.ammount = 7;
 * //  { type: 'update', path: ['ammount'], value: 7, oldValue: 5, object: observableOrder }
 * 
 * 
 * observableOrder.address = {
 *     street: 'Str 75',
 *     apt: 29
 * };
 * //  { type: "insert", path: ['address'], value: { ... }, object: observableOrder }
 * 
 * 
 * observableOrder.address.apt = 30;
 * //  { type: "update", path: ['address','apt'], value: 30, oldValue: 29, object: observableOrder.address }
 * 
 * 
 * delete observableOrder.remark;
 * //  { type: "delete", path: ['remark'], oldValue: 'remove me', object: observableOrder }
 * 
 * Object.assign(observableOrder, { amount: 1, remark: 'less is more' }, { async: true });
 * //	- by default the changes below would be delivered in a separate callback
 * //	- due to async use, they are delivered as a batch in a single callback
 * //  { type: 'update', path: ['ammount'], value: 1, oldValue: 7, object: observableOrder }
 * //  { type: 'insert', path: ['remark'], value: 'less is more', object: observableOrder }
 * 
 * 
let a = [ 1, 2, 3, 4, 5 ],
    observableA = Observable.from(a);

observableA.observe(changes => {
    changes.forEach(change => {
        console.log(change);
    });
});

 * //////////////////////////////////////////////////////////////////////////////////////
 * // array
 * 
 * //  observableA = [ 1, 2, 3, 4, 5 ]
 * observableA.pop();
 * //  { type: 'delete', path: [4], oldValue: 5, object: observableA }
 * 
 * 
 * //  now observableA = [ 1, 2, 3, 4 ]
 * //  following operation will cause a single callback to the observer with an array of 2 changes in it)
 * observableA.push('a', 'b');
 * //  { type: 'insert', path: [4], value: 'a', object: observableA }
 * //  { type: 'insert', path: [5], value: 'b', object: observableA }
 * 
 * 
 * //  now observableA = [1, 2, 3, 4, 'a', 'b']
 * observableA.shift();
 * //  { type: 'delete', path: [0], oldValue: 1, object: observableA }
 * 
 * 
 * //  now observableA = [ 2, 3, 4, 'a', 'b' ]
 * //  following operation will cause a single callback to the observer with an array of 2 changes in it)
 * observableA.unshift('x', 'y');
 * //  { type: 'insert', path: [0], value: 'x', object: observableA }
 * //  { type: 'insert', path: [1], value: 'y', object: observableA }
 * 
 * 
 * //  now observableA = [ 2, 3, 4, 'a', 'b' ]
 * observableA.reverse();
 * //  { type: 'reverse', path: [], object: observableA } (see below and exampe of this event for nested array)
 * 
 * 
 * //  now observableA = [ 'b', 'a', 4, 3, 2 ]
 * observableA.sort();
 * //  { type: 'shuffle', path: [], object: observableA } (see below and exampe of this event for nested array)
 * 
 * 
 * //  observableA = [ 2, 3, 4, 'a', 'b' ]
 * observableA.fill(0, 0, 1);
 * //  { type: 'update', path: [0], value: 0, oldValue: 2, object: observableA }
 * 
 * 
 * //  observableA = [ 0, 3, 4, 'a', 'b' ]
 * //  the following operation will cause a single callback to the observer with an array of 2 changes in it)
 * observableA.splice(0, 1, 'x', 'y');
 * //  { type: 'update', path: [0], value: 'x', oldValue: 0, object: observableA }
 * //  { type: 'insert', path: [1], value: 'y', object: observableA }
 * 
 * 
 * let customer = { orders: [ ... ] },
 *     oCustomer = Observable.from(customer);
 * 
 * //  sorting the orders array, pay attention to the path in the event
 * oCustomer.orders.sort();
 * //  { type: 'shuffle', path: ['orders'], object: oCustomer.orders }
 * 
 * 
 * oCustomer.orders.reverse();
 * //  { type: 'reverse', path: ['orders'], object: oCustomer.orders }
 * 
 */
export declare class Observable {
    constructor();
    // TODO 这里写成了数组形式，其实这个库也可以监控对象，只是目前只用到了数组，所以就先这么写了 vtxf 20201203
    static from<T>(target: T[], options?: any): ObservableType<T[], T>;
    static isObservable(input: Object): boolean;
}

export type ObservableChangeType<T> = {
    type: 'insert' | 'update' | 'delete' | 'reverse' | 'shuffle';
    path: string | number[];
    value?: T;
    oldValue?: T;
    object: ObservableType<T[], T>;
};

export type ObservableType<T extends U[], U> = T & {
    /**
     * @param callback is a function, which will be added to the list of observers subscribed for a changes of this observable; changes delivered always as a never-null-nor-empty array of Change objects; each change is a defined, non-null object, see Change definition below
     * @param options is an object, optional
     */
    observe(
        callback: (changes: ObservableChangeType<U>[]) => void,
        options?: any
    ): void;

    /**
     * receives a function/s which previously was/were registered as an observer/s and removes it/them. If no arguments passed, all observers will be removed.
     * @example
     * observablePerson.unobserve(personUIObserver);
     * observablePerson.unobserve();
     */
    unobserve(func?: (changes: ObservableChangeType<U>[]) => void): void;
}