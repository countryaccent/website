'use strict';
const path = require('path');
module.exports = appInfo => {
  const config = {
    mysql: {
      // 单数据库信息配置
      client: {
      // host
      host: '39.108.156.85',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'egg',
    },
      // 是否加载到 app 上，默认开启
      app: true,
      // 是否加载到 agent 上，默认关闭
      agent: false,
    }
  };

  // should change to your own
  config.keys = appInfo.name + '_1494339549038_1922';


  // exports.static = {
  //   prefix: '/public/',
  //   dir: path.join(appInfo.baseDir, 'app/public'),
  //   // support lazy load
  //   dynamic: true,
  //   preload: false,
  //   buffer: false,
  //   maxFiles: 1000,
  // };

  
  config.view = {
    defaultViewEngine: 'nunjucks',     
    mapping: {
      '.html': 'nunjucks',
    },
  };
  config.multipart = {
    fileExtensions: [
      '.rar',
    ],
    
  }

  config.oss = {
        client: {
            accessKeyId: 'LTAIaAIeUp83JopT',
            accessKeySecret: 'bMGMQ81ZupdyUoOJrfJUq6uTGr6Mmq',
            bucket: 'rongxinpcb',
            endpoint: 'oss-cn-shenzhen.aliyuncs.com',
            timeout: '60s',
        }
    };
  return config;
};