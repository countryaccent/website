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
    * info() {
      yield this.ctx.render('home/info.html');
    }
    * count() {
      yield this.ctx.render('home/count.html');
    }
    * about() {
      yield this.ctx.render('home/about.html');
    }
    * contact() {
      yield this.ctx.render('home/contact.html');
    }
  }
  return HomeController;
};
