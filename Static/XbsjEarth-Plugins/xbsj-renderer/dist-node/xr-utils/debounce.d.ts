export declare function debounce<T extends (...args: any[]) => void>(fn: T, time: number): [T, () => void];
