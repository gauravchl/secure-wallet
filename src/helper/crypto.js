import { AES, enc } from 'crypto-js';
import { SHA256 } from 'crypto-js';

let secretkey;


let CryptoHelper = {
  encryptItems(items) {
    if (!secretkey || !items) return;
    let ciphertext = AES.encrypt(JSON.stringify(items), secretkey);
    return ciphertext.toString()
  },

  decryptItems(items) {
    if (!secretkey || !items) return;
    let bytes = AES.decrypt(items, secretkey);
    if (!bytes) return;
    let data = JSON.parse(bytes.toString(enc.Utf8));
    return data;
  },

  setSecretKey(key) {
    secretkey = SHA256(key).toString();
  },
}
export default CryptoHelper
