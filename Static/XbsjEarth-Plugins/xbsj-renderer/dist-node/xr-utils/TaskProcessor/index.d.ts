export declare class TaskProcessor {
    constructor(workerName: string, maximumActiveTasks: number);
    scheduleTask(parameters: any, transferableObjects: any[]): Promise<any>;
    static workerBaseAbsoluteUri: string;
}

// export = TaskProcessor;