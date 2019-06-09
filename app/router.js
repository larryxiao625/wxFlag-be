module.exports = app => {
    const {router, controller} = app;
    router.post('login','/api/v1/users/login',controller.v1.users.login);
    router.post('register','/api/v1/users/register',controller.v1.users.register);
}