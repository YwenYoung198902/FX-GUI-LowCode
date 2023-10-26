import { JsonValue } from "./JsonValue";
export declare function getBase64UriData(url: string, responseType: 'document'): [Document, string];
export declare function getBase64UriData(url: string, responseType: 'blob'): [Blob, string];
export declare function getBase64UriData(url: string, responseType: 'arraybuffer'): [ArrayBuffer, string];
export declare function getBase64UriData(url: string, responseType: 'text'): [string, string];
export declare function getBase64UriData(url: string, responseType: 'json'): [JsonValue, string];
