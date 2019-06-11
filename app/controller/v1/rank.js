const Controller = require('egg').Controller;

class RankController extends Controller{
    async getAllRank(){
        const{ctx,app,service}=this;
        const result=await service.rank.getAllRank();
        ctx.response.status=200;
        ctx.response.body={
            errcode: 0,
            errmsg: result
        }
    }
}
module.exports=RankController;