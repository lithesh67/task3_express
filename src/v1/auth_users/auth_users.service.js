const authDB=require('./auth_users.queries');
const bcrypt=require('bcryptjs');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');
const {signToken, signRefresh}=require('../../utils/signToken.utils');
const { encrypt, decrypt } = require('../../utils/crypt');

module.exports=class authService{
    
    static async userExists(email){
        try{
            const result=await authDB.userExists(email);
            if(result.length>0){
                return true;
            }
            return false;
        }
        catch(err){
            throw err; 
        }
    }

    static async login(user,password){
        try{
            const dbData=await authDB.login(user);
            if(dbData && await bcrypt.compare(password,dbData.password)){
                const token=signToken(dbData.id,dbData.username,dbData.role);
                const refresh=signRefresh(dbData.id,dbData.username,dbData.role);
                await authDB.storeRefresh(user,refresh);
                const username=dbData.username;
                const email=dbData.email;
                const id=dbData.id;
                const role=dbData.role;
                const enc_role=encrypt({role});
                return {token,refresh,username,email,id,enc_role};
            }
            else{
                return null;
            }
        }
        catch(err){
            throw err;
        }

    }

    static async register(firstName,lastName,email,password){
        try{
           const hashed_password=await bcrypt.hash(password,10);
           const obj={first_name:firstName,last_name:lastName,email:email,password:hashed_password};
           const username=await authDB.insertUser(obj);
           return username;

        }
        catch(err){
            throw err;
        }
    }

    static async getRefresh(userid){
        try{
            return await authDB.getRefresh(userid);
        }
        catch(err){
            throw err;
        }
    }

    static async sendEmail(email){
        try{  
           const payload=encrypt({email});
           const token=jwt.sign({'enc':payload},process.env.SECRET_KEY_TOKEN,{expiresIn:'10m'});
           await authDB.storeResetToken(token,email);
           const transporter=nodemailer.createTransport({
             host:'smtp.gmail.com',
             port:587,
             secure:false,
             auth:{
                user:process.env.EMAIL,
                pass:process.env.EMAIL_PASS
             },
           });
           transporter.verify((error, success) => {
            if (error) {
              console.error("Error connecting to SMTP server:", error);
            } else {
              console.log("SMTP server is ready to take messages:", success);
            }
          });
           const mailDetails={
             from:process.env.EMAIL,
             to:email,
             subject:'Reset Password',
             text:`<h1>Click on the link to reset pasword</h1>
                    <a href="${process.env.resetUrl}${token}">Reset Password</a>`
           }
           await transporter.sendMail(mailDetails);
        }
        catch(err){
            throw err;
        }
    }

    static async resetPassword(password,token){
        try{
           const decoded=jwt.verify(token,process.env.SECRET_KEY_TOKEN);
           const decrypted_obj=JSON.parse(decrypt(decoded.enc));
           const email=decrypted_obj.email;
           const exists=await authDB.checkResetToken(token);
           if(exists.length==0){
             throw new Error("Invalid, try generating a new reset link");
           }
           const hashed_password=await bcrypt.hash(password,10);
           await authDB.resetPassword(email,hashed_password);
        }
        catch(err){
            throw err;
        }
    }

}    