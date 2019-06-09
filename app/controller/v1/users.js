const Controller = require('egg').Controller;

class UserController extends Controller{
    async login(){
        const {ctx, service} = this;
        const userName=ctx.request.body.userName;
        const pwd=ctx.request.body.pwd;
        const res=await ctx.service.users.login(userName,pwd);
        if(res===0){
            ctx.status=200;
            ctx.body={
                errcode: 0,
                errmsg: "scuess"
            }
        }else{
            ctx.status=200;
            ctx.body={
                errcode: 1,
                errmsg: "msg"
            }
        }
    }
    
}
module.exports=UserController;