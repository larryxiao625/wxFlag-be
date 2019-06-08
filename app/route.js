module.exports = app => {
    const{router, controller} = app;
    router.resources('users', '/api/v1/users', controller.v1.users);
}