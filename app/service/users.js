const Service = require('egg').Service;

class UserService extends Service{
   async login(userName,pwd){
        const ctx= this.ctx;
        const selUser= await this.app.mysql.get('user',{username: userName})
        this.app.logger.info(selUser);
        if(selUser.pwd===pwd){
            return 0;
        }else{
            return 1;
        }
   }
   async register(userName,pwd,stuId,phone,openid){
    //    const users=await this.app.mysql.query('select * from user where username = ? or phone = ? or openid = ?', [userName,phone,openid]);
    //    this.app.logger.info(users);
    //    this.app.logger.info(users.length);
        let result;
        await this.app.mysql.insert('user',{username: userName, stuId:stuId, pwd:pwd, phone: phone}).then(res=>{
            result=res;   
        }).catch(res=>{
            result=res;
        });
        return result;
   }
}
module.exports=UserService;