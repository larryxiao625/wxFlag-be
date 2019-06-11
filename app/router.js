module.exports = app => {
    const {router, controller} = app;
    router.post('login','/api/v1/users/login',controller.v1.users.login);
    router.post('register','/api/v1/users/register',controller.v1.users.register);
    router.post('getAll','/api/v1/flag/getAll',controller.v1.flag.getAll);
    router.post('createFlag','/api/v1/flag/createFlag',controller.v1.flag.create);
    router.post('join','/api/v1/flag/join',controller.v1.flag.join);
    router.post('getDynamic','/api/v1/flag/getDynamic',controller.v1.flag.getDynamic);
    router.post('getAllDynamic','/api/v1/flag/getAllDynamic',controller.v1.flag.getAllDynamic);
    router.post('sign','/api/v1/flag/sign',controller.v1.flag.sign);
    router.post('uploadAvatar','/api/v1/users/uploadAvatar',controller.v1.users.uploadAvatar);
    router.get('getAllRank','/api/v1/rank/getAllRank',controller.v1.rank.getAllRank);
}