import CryptoJS from 'crypto-js'
export function aesEncrypt(word){
  let key = CryptoJS.enc.Utf8.parse("BGxdEUOZkXka4HSj");
  let srcs = CryptoJS.enc.Utf8.parse(word);
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return encrypted.toString();
}
export function aesDecrypt(word){
  let key = CryptoJS.enc.Utf8.parse("BGxdEUOZkXka4HSj");
  let decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
