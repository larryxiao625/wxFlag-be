const Controller = require('egg').Controller;
class FlagController extends Controller{
    async create(){
        const {ctx,service,app} = this;
        const {UID,day,time,name}=ctx.request.body;
        const result = service.flag.create(UID,day,time,name);
        if(result.affectedRows===1){
            ctx.response.status=200;
            ctx.response.body={
                errcode: 0,
                errmsg: "写入成功"
            }
        }else{
            ctx.response.status=200;
            ctx.response.body={
                errcode: 1,
                errmsg: "已经存在相同Flag"
            }
        }
    };

    async getAll(){
        const {ctx,service,app} = this;
        const result=await service.flag.getAll;
        console.log(result);
        if(result.length===0){
            ctx.response.status=200;
            ctx.response.body={
                errcode: 1,
                errmsg: "暂无数据"
            }
        }else{
            ctx.response.status=200;
            ctx.response.body={
                errcode: 0,
                errmsg: result
            }
        }
    };
    async getDynamic(){
        const {ctx,service,app} = this;
        const stuId=ctx.request.body;
        const result=await service.flag.getDynamic(stuId);
        ctx.response.status=200;
        app.logger.info(result);
        if(result.errcode===0){
            ctx.response.body={
                errcode: 0,
                errmsg: result.errmsg
            }
        }else if(result.errcode===1){
            ctx.response.body={
                errcode: 1,
                errmsg: result.errmsg
            }
        }
    };
    async sign(){
        const {ctx,service,app} = this;
        const {stuId,UID,pic,comment}=ctx.request.body;
        const result=await service.flag.sign(stuId,UID,pic,comment);
        ctx.response.status=200;
        ctx.response.body={
            errcode: 0,
            errmsg: "签到成功"
        }
    }
}
module.exports=FlagController