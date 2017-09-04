'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/yewu', 'home.yewu');
  app.get('/lianxi', 'home.lianxi');
  app.get('/count', 'home.count');
  app.get('/about', 'home.about');
  app.get('/contact', 'home.contact');
  app.get('/user', 'home.info');
  app.post('/user', 'user.info');
};
