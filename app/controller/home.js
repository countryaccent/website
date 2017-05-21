'use strict';

module.exports = app => {
  class HomeController extends app.Controller {
    * index() {
      yield this.ctx.render('home/index.html');
    }
    * yewu() {
      yield this.ctx.render('home/yewu.html');
    }
    * lianxi() {
      yield this.ctx.render('home/lianxi.html');
    }
  }
  return HomeController;
};
