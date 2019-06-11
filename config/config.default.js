// 将 logger 目录放到代码目录下
const path = require('path');
module.exports = appInfo => {
  return {
    keys: '123456789',
    logger: {
      consoleLevel: 'DEBUG',
      dir: path.join(appInfo.baseDir, 'logs'),
    },
    mysql:{
        client:{
            host: 'localhost',
            port: '3306',
            user: 'root',
            password: 'XZhqq159357',
            database: 'wxflag'
        }
    },
    bodyParser:{
      formLimit: '1000mb', // 设置文件大小限制为 100M
      jsonLimit: '100mb',
    },
    multipart: {
      mode: 'stream',
      fileSize: '1000mb',
    },
    static: {
      // maxAge: 31536000,
      prefix: "/public/",
      dir: path.join(appInfo.baseDir, 'app/public'),
    },
    security: {
      csrf: {
        enable: false,
      },
    },
  };
};