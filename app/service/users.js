const Service = require('egg').Service;

class UserService extends Service{
   async login(openid,userName){
        const ctx= this.ctx;
        var selUser;
        await this.app.mysql.get('user',{openid: openid}).then(res=>{
            selUser=res;
        }).catch(res=>{

        })
        this.app.logger.info(selUser);
        if(selUser==null){
            const result=await this.app.mysql.insert('user',{
                openid: openid,
                userName: userName
            })
        }
        return 0;
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
   async updateAvatar(openid,avatarPath){
       const row={
           avatar: avatarPath,
       }
       const options = {
        where: {
          openid: openid
        }
      };
       let result=await this.app.mysql.update('user',row,options);
       return result;
   }
}
module.exports=UserService;