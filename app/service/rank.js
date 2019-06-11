const Service = require('egg').Service;

class RankService extends Service{
    async getAllRank(){
        let result;
        const {ctx,app}=this
        await this.app.mysql.query('SELECT `UID`, count(UID) AS nums from `dynamic` group by `openid`').then(res=>{
            result=res;
        }).catch(res=>{
            app.logger.error(res);
        })
        return result;
    }
}
module.exports=RankService;