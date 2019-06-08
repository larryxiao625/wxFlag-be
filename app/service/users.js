const Service = require('egg').Service;

class UserService extends Service{
   async login(userName,pwd){
       const ctx= this.ctx;
       const selUser= await this.app.mysql.get('user',{username: userName})
       console.log(selUser);
       if(selUser.pwd===pwd){
           return 0;
       }else{
           return 1;
       }
   } 
}
module.exports=UserService;