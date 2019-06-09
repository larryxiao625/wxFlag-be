module.exports = app => {
    const {router, controller} = app;
    router.post('login','/api/v1/users/login',controller.v1.users.login);
}