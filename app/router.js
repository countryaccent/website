'use strict';

module.exports = app => {
  app.get('/', 'home.index');
  app.get('/count', 'home.count');
  app.get('/about', 'home.about');
  app.get('/contact', 'home.contact');
  app.get('/products', 'home.products');
  app.get('/order', 'home.order');
  app.get('/orderDetail', 'home.orderDetail');
  app.post('/count/compute', 'compute.compute');
  app.post('/count/submit', 'compute.submit');
  app.post('/count/finalSubmit', 'compute.finalSubmit');

  // 个人中心
  app.get('/account', 'home.account');
  app.get('/account/order', 'home.account');
  app.get('/account/refund', 'home.refund');
  app.get('/account/comment', 'home.comment');
  app.get('/account/finance/balance', 'home.balance');
  app.get('/account/finance/recharge', 'home.recharge');
  app.get('/account/setting/profile', 'home.profile');
  app.get('/account/setting/address', 'home.address');
  app.get('/account/setting/password', 'home.password');
  app.post('/account/changePassword','account.changePassword')
  app.post('/account/cancelOrder','compute.cancelOrder')
  // 地址
  app.post('/account/getAddressRank','account.getAddressRank')
  app.post('/account/saveAddress','account.saveAddress')
  app.post('/account/deleteAddress','account.deleteAddress')
  app.post('/account/defaultAddress','account.defaultAddress')
  // app.get('/user', 'home.info');
  // app.post('/user', 'user.info');
  // 登录注册
  app.get('/signin','home.signin')
  app.post('/signin','login.signin')
  app.get('/signin/yzm', 'login.signinYzm');
  app.get('/signup','home.signup')
  app.get('/signout','login.signout')
  app.post('/signup','login.signup')
  app.post('/signup/yzm', 'login.yzm');

  // 后台
  app.get('/admin', 'home.admin');
  app.get('/admin/home', 'home.home');
  // app.get('/home', 'home.uploadProduct');
  app.get('/admin/uploadProduct', 'home.uploadProduct');
  app.post('/admin/uploadProduct', 'uploadProduct.upload');
  app.get('/admin/editProduct/:id', 'home.editProduct');
  app.post('/admin/editProduct/:id', 'uploadProduct.edit');
  app.post('/admin/deleteProduct/:id', 'uploadProduct.delete');
  app.get('/admin/uploadWord', 'home.uploadWord')
  app.get('/admin/editWord', 'home.editWord')
  app.post('/admin/uploadWord', 'uploadProduct.uploadWord');
  app.post('/admin/editWord', 'uploadProduct.editWord');
  app.get('/admin/users', 'home.users')
  app.get('/admin/price', 'home.price')
  app.get('/admin/priceChange', 'home.priceChange')
  app.post('/admin/priceChange', 'uploadProduct.editPrice')
  app.get('/admin/checkOrder', 'home.checkOrder')
  app.get('/admin/orderDetail', 'home.adminOrderDetail')
  app.get('/admin/doCheckOrder', 'home.doCheckOrder')
  app.post('/admin/doCheckOrder', 'compute.doCheckOrder')

};
