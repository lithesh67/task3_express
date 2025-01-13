const authDB=require('./auth_users.queries');
const bcrypt=require('bcryptjs');
const {signToken, signRefresh}=require('../../utils/signToken.utils');

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
                const token=signToken(dbData.id,dbData.username);
                const refresh=signRefresh(dbData.id,dbData.username);
                const username=dbData.username;
                const email=dbData.email;
                const id=dbData.id;
                return {token,refresh,username,email,id};
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

}    