// 将 logger 目录放到代码目录下
const path = require('path');
module.exports = appInfo => {
  return {
    logger: {
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
    }
  };
};