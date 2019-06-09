module.exports = app => {
    const {router, controller} = app;
    router.post('login','/api/v1/users/login',controller.v1.users.login);
    router.post('register','/api/v1/users/register',controller.v1.users.register);
    router.get('getAll','/api/v1/flag/getAll',controller.v1.flag.getAll);
    router.post('createFlag','/api/v1/flag/createFlag',controller.v1.flag.create);
    router.post('getDynamic','/api/v1/flag/getDynamic',controller.v1.flag.getDynamic);
    router.post('sign','/api/v1/flag/sign',controller.v1.flag.sign);
}