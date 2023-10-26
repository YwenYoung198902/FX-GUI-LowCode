export declare function when(promise: Promise<any> | any, resolve: (value: any) => any): Promise<any>;
export declare namespace when {
    var defer: () => {
        resolve: (value: any) => any;
        reject: (err: string) => void;
        promise: Promise<any>;
    };
    var resolve: (v: any) => Promise<any>;
}
