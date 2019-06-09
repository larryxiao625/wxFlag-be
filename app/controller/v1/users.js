const Controller = require('egg').Controller;
class UserController extends Controller{

    async login(){
        const {ctx, service} = this;
        const {openid,userName}=ctx.request.body;
        this.app.logger.info(ctx.request.body);
        const res=await ctx.service.users.login(openid,userName);
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
    async register(){
        const {ctx, service} = this;
        const {userName,stuId,pwd,phone,openid}=ctx.request.body;
        const res=await ctx.service.users.register(userName,pwd,stuId,phone.stuId);
        this.app.logger.info(res);
        if(res.affectedRows===1){
            ctx.response.status=200;
            ctx.body={
                "errcode": 0,
                "errmsg": "scuess"
            }
        }else{
            if(res.errno===1062){
                ctx.response.status=200;
                ctx.body={
                    "errcode": 1,
                    "errmsg": "用户名已经注册"
                }
            }else{
                ctx.response.status=200;
                ctx.body={
                    "errcode": 2,
                    "errmsg": "错误"
                }
            }
        }
    }
    
}
module.exports=UserController;