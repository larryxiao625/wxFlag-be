const Service = require('egg').Service;

class FlagService extends Service {
    async create(UID, day, time, name){
        const {ctx,service,app} = this;
        let result;
        await app.mysql.insert('flag', {UID:UID, day: day,startTime:time,name:name}).then(res=>{
            result=res;
        }).catch(res=>{
            result=res;
        })
        return result;
    }

    async getAll(){
        const {ctx,service,app} = this;
        let result;
        await app.mysql.select('flag').then(res=>{
            result=res;
        }).catch(res=>{
            result=res;
        })
        console.log(result);
        return result;
    }

    async getDynamic(stuId){
        const {ctx,app}=this;
        let result;
        await app.mysql.select('join',{
            where: {stuId:stuId},
            columns: ['UID'],
        }).then(res=>{
            result=res;
        }).catch(res=>{
            result=res;
        })
        var output=result.map(result => result.UID);
        let dynamicResult;
        await app.mysql.select('dynamic',{
            where: {UID: output},
            orders: ['time','desc'],
        }).then(res=>{
            dynamicResult={
                errcode: 0,
                errmsg: res,
            }
        }).catch(res=>{
            dynamicResult={
                errcode: 1,
                errmsg: "暂无数据"
            }
        })
        return dynamicResult;
    };

    async sign(stuId,UID){
        const {app,ctx}=this;
        let result;
        const row={
            isSignToday: 1
        }
        const options={
            where: {
                stuId: stuId,
                UID: UID
            }
        }
        await app.mysql.update('join',row,options).then(res=>{
            result=res;
        }).catch(res=>{
            result=res;
        })
        return result;
    }
}
module.exports=FlagService;