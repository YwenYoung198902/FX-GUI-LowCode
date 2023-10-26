/**
 * Calculates MD5 value for a given string.
 * If a key is provided, calculates the HMAC-MD5 value.
 * Returns a Hex encoded string unless the raw argument is given.
 *
 * @param {string} string Input string
 * @param {string} [key] HMAC key
 * @param {boolean} [raw] Raw output switch
 * @returns {string} MD5 output
 * @example
 * // Calculate the (hex-encoded) MD5 hash of a given string value:
 * var hash = md5('value') // "2063c1608d6e0baf80249c42e2be5804"
 * 
 * // Calculate the (hex-encoded) HMAC-MD5 hash of a given string value and key:
 * var hash = md5('value', 'key') // "01433efd5f16327ea4b31144572c67f6"
 * 
 * // Calculate the raw MD5 hash of a given string value:
 * var hash = md5('value', null, true)
 * 
 * // Calculate the raw HMAC-MD5 hash of a given string value and key:
 * var hash = md5('value', 'key', true)
 * 
 */
export function md5(string: string, key?: string, raw?: boolean): string;