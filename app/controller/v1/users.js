const Controller = require('egg').Controller;
const fs = require('fs');
const path = require('path');

const awaitWriteStream = require('await-stream-ready').write;
const sendToWormhole = require('stream-wormhole');

class UserController extends Controller{

    async login(){
        const {ctx, service} = this;
        const {openid,userName}=ctx.request.body;
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
    async uploadAvatar(){
        const { ctx } = this;
        const stream = await ctx.getFileStream();
        const openid=stream.fields.openid
        const fileName= openid+path.extname(stream.filename);
        const target = path.join(this.config.baseDir, 'app/public/img', fileName);
        const writeStream = fs.createWriteStream(target);
        try {
            // 异步把文件流 写入
            await awaitWriteStream(stream.pipe(writeStream));
            await this.ctx.service.users.updateAvatar(openid,'public/img/'+fileName)
        } catch (err) {
            // 如果出现错误，关闭管道
            await sendToWormhole(stream);
            throw err;
        }
        this.ctx.body = {
          code: 0,
          data: fileName,
          msg: ''
        };

    }
    
}
module.exports=UserController;