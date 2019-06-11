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

    async getAll(openid){
        const {ctx,service,app} = this;
        let result;
        await app.mysql.query('SELECT * FROM `flag` left outer join `join` on UID=joinUID').then(res=>{
            result=res;
        }).catch(res=>{
        })
        return result;
    }

    async getDynamic(selectUID){
        const {ctx,app}=this;
        let dynamicResult;
        await app.mysql.query('SELECT * FROM `dynamic` left outer join `user` on user.openid=dynamic.openid where `UID` = '+selectUID.UID + ' ORDER BY `time` DESC').then(res=>{
            dynamicResult={
                errcode: 0,
                errmsg: res,
            }
        }).catch(res=>{
            console.log(res)
            dynamicResult={
                errcode: 1,
                errmsg: "暂无数据"
            }
        })
        return dynamicResult;
    };
    async getAllDynamic(selectUID){
        const {ctx,app}=this;
        let dynamicResult;
        await app.mysql.query('SELECT * FROM `dynamic` left outer join `user` on user.openid=dynamic.openid ORDER BY `time` DESC').then(res=>{
            dynamicResult={
                errcode: 0,
                errmsg: res,
            }
        }).catch(res=>{
            console.log(res)
            dynamicResult={
                errcode: 1,
                errmsg: "暂无数据"
            }
        })
        return dynamicResult;
    };
    async sign(openid,UID,pic,comments){
        const {app,ctx}=this;
        let result;
        const temp=await app.mysql.select('join',{
            where: {openid: openid,joinUID: UID},
            columns: ['signDay']
        });
        var signDay=temp[0].signDay+1;
        const row={
            isSignToday: "done",
            signDay: signDay
        }
        const options={
            where: {
                openid: openid,
                joinUID: UID
            }
        }
        await app.mysql.update('join',row,options).then(res=>{

        }).catch(res=>{
            result=res;
        })
        await app.mysql.insert('dynamic',{
            UID:UID,
            openid:openid,
            comment:comments,
            images: pic,
            time: app.mysql.literals.now
        })
        return result;
    };
    async join(openid,UID){
        const {app,ctx}=this;
        let result;
        await app.mysql.insert('join',{
            joinUID: UID,
            openid: openid
        }).then(res=>{
            result=res
        }).catch(res=>{
            result=res;
        })
        return result;
    }


}
module.exports=FlagService;