'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/home/yewu', 'home.yewu');
  app.get('/home/lianxi', 'home.lianxi');
};
