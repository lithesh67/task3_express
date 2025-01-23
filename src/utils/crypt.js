const crypt=require('crypto-js');

module.exports.encrypt=(data)=>{
    const encrypted_data=crypt.AES.encrypt(JSON.stringify(data),process.env.encryption_key);
    return encrypted_data.toString();
}

module.exports.decrypt=(cipher)=>{
    const decrypted_bytes=crypt.AES.decrypt(cipher,process.env.encryption_key);
    const decrypted=decrypted_bytes.toString(crypt.enc.Utf8);
    return decrypted; 
}