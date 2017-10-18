'use strict';

const data = {name:'egg'}

module.exports = app => {

  class HomeController extends app.Controller {
    // 首页
    * index() {
      const product = yield this.ctx.service.product.findByType('产品');
      const factory = yield this.ctx.service.product.findByType('工厂实拍');
      const server = yield this.ctx.service.product.findByType('客服团队');
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      const orderData = yield this.ctx.service.order.findAllOrder();
      const orderLists = JSON.parse(JSON.stringify(orderData)).orderList;
    
      console.log(JSON.parse(JSON.stringify(ewm.results)))
      console.log( this.app.locals.ewm)
      yield this.ctx.render('home/index.html',{
        products:product.results.slice(0,3),
        factorys: factory.results.slice(0,6),
        servers: server.results.slice(0,2),
        words: word.words,
        user: this.ctx.cookies.get('user'),
        ewms: ewm.results,
        orderLists: orderLists
      });
    }
    * signin() {
      const user = this.ctx.cookies.get('user');
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      if (user) {this.ctx.redirect('/')}
      console.log('user',this.ctx.cookies.get('user'))
      yield this.ctx.render('home/signin.html',{
        words: word.words,
        ewms: ewm.results
      });
    }
    * signup() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      const user = this.ctx.cookies.get('user')
      if (user) {this.ctx.redirect('/')}
      yield this.ctx.render('home/signup.html',{
        words: word.words,
        ewms: ewm.results
      });
    }
    // * yewu() {
    //   yield this.ctx.render('home/yewu.html');
    // }
    // * lianxi() {
    //   yield this.ctx.render('home/lianxi.html');
    // }
    // * info() {
    //   yield this.ctx.render('home/info.html');
    // }
    // 产品展示
    * products() {
      const product = yield this.ctx.service.product.findByType('产品');
       const ewm = yield this.ctx.service.product.findByType('微信公众号');
       const word = yield this.ctx.service.product.findWordById();
        
      yield this.ctx.render('home/products.html',{
        products:product.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
        ewms: ewm.results
      });
    }
    // 在线计价
    * count() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      const priceData = yield this.ctx.service.product.findPrice()
      const price = JSON.parse(JSON.stringify(priceData)).price[0]
      console.log(price)
      yield this.ctx.render('home/count.html',{
        words: word.words,
        user: this.ctx.cookies.get('user'),
        ewms: ewm.results,
        price: price
      });
    }
    // 提交订单页面
    * order() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      const orderId = this.ctx.query.orderId; 
      const user = this.ctx.cookies.get('user')
      console.log(orderId);
      const orderData = yield this.ctx.service.order.findById(orderId)
      console.log(orderData.orderList.length)
      const orderList = JSON.parse(JSON.stringify(orderData)).orderList[0];
      const addressData = yield this.ctx.service.user.getAddressRank(user)
      const addressLists = JSON.parse(JSON.stringify(addressData)).getAddress;
      const isSelfOrder = yield this.ctx.service.order.findSelfOrder(orderId,user)
      
      if (!user || orderId == undefined || orderData.orderList.length == 0 || isSelfOrder.orderList.length == 0 || orderList.checkStatus !== 0)  {}
      let  isUser = true,
           hasOrder = true,
           selfOrder = true,
           checkOrder = true;
      if (!user) {
        isUser = false
      }else if(orderData.orderList.length == 0){
        hasOrder = false
      }else if(isSelfOrder.orderList.length == 0){
        selfOrder = false
      }else if(orderList.checkStatus != 0){
        checkOrder = false
      }
      // console.log('checkStatus',isSelfOrder.orderList)
      // console.log('length',orderList.checkStatus)
      yield this.ctx.render('home/order.html',{
        words: word.words,
        user: user,
        ewms: ewm.results,
        orderList: orderList,
        addressLists: addressLists,
        isUser: isUser,
        hasOrder: hasOrder,
        selfOrder: selfOrder,
        checkOrder: checkOrder,
      });
    }
    // 订单详情页面
    * orderDetail() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      const orderId = this.ctx.query.orderId; 
      console.log(orderId);
      const orderData = yield this.ctx.service.order.findById(orderId);
      const orderList = JSON.parse(JSON.stringify(orderData)).orderList[0];
      console.log(orderList)
      // const addressData = yield this.ctx.service.user.getAddress(this.ctx.cookies.get('user'))
      // const addressLists = JSON.parse(JSON.stringify(addressData)).getAddress;
      const isSelfOrder = yield this.ctx.service.order.findSelfOrder(orderId,this.ctx.cookies.get('user'))
      // console.log('isSelfOrder',isSelfOrder)
      if (!this.ctx.cookies.get('user') || orderId == undefined || orderData.orderList.length == 0 || isSelfOrder.orderList.length == 0) this.ctx.redirect('/account')
      yield this.ctx.render('home/orderDetail.html',{
        words: word.words,
        user: this.ctx.cookies.get('user'),
        ewms: ewm.results,
        orderList: orderList,
        // addressLists: addressLists
      });
    }
    // 关于我们
    * about() {
      const word = yield this.ctx.service.product.findWordById();
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const server = yield this.ctx.service.product.findByType('客服团队')
      console.log(server.results.slice(0,1))
      yield this.ctx.render('home/about.html',{
        words: word.words,
        servers: server.results.slice(0,1),
        user: this.ctx.cookies.get('user'),
        ewms: ewm.results
      });
    }
    // 联系我们
    * contact() {
      const word = yield this.ctx.service.product.findWordById();

      const ewm = yield this.ctx.service.product.findByType('微信公众号');
       
      yield this.ctx.render('home/contact.html',{
        words: word.words,
        user: this.ctx.cookies.get('user'),
        ewms: ewm.results
      });
    }
    // * upload() {
    //   yield this.ctx.render('home/upload.html');
    // }

    * account() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      const orderData = yield this.ctx.service.order.findOrderByUserName(this.ctx.cookies.get('user'))
      const orderLists = JSON.parse(JSON.stringify(orderData)).orderList
      console.log(orderLists)
      yield this.ctx.render('home/account/account.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
        orderLists: orderLists
      });
    }
    * refund() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/refund.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }
    * comment() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/comment.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }
    * balance() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/balance.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }
    * recharge() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/recharge.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }

    * profile() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/profile.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }
    * address() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/address.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }
    * password() {
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/account/password.html',{
        ewms:ewm.results,
        words: word.words,
        user: this.ctx.cookies.get('user'),
      });
    }

    // *********************************//
    // 后台首页
    * admin() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) {this.ctx.redirect('/admin/adminLogin')}
      yield this.ctx.render('home/admin/index.html');
    }
    * adminLogin() {
      const admin = this.ctx.cookies.get('admin');
      if (admin) {this.ctx.redirect('/admin')}
      yield this.ctx.render('home/admin/adminLogin.html');
    }
    * home() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const product = yield this.ctx.service.product.findByType('产品');
      const factory = yield this.ctx.service.product.findByType('工厂实拍');
      const server = yield this.ctx.service.product.findByType('客服团队');
      const ewm = yield this.ctx.service.product.findByType('微信公众号');
      const word = yield this.ctx.service.product.findWordById();
      console.log(ewm.results)
      yield this.ctx.render('home/admin/home.html',{
        products: product.results,
        factorys: factory.results,
        servers: server.results,
        ewms:ewm.results,
        words: word.words
      });
    }
    // 上传产品
    * uploadProduct() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      yield this.ctx.render('home/admin/uploadProduct.html');
    }
    // 更改产品
    * editProduct() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const productId = this.ctx.params.id;
      const data = yield this.ctx.service.product.findById(productId);
      console.log(JSON.parse(JSON.stringify(data)).products)

      yield this.ctx.render('home/admin/editProduct.html',{
        product:JSON.parse(JSON.stringify(data)).products
      });
    }
    // 上传文字信息
    * uploadWord() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/admin/uploadWord.html',{
        words: word.words
      });
    }
    // 编辑文字信息
     * editWord() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const word = yield this.ctx.service.product.findWordById();
      yield this.ctx.render('home/admin/editWord.html',{
        words: word.words
      });
    }
    // 编辑文字信息
     * users() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const users = yield this.ctx.service.user.findUsers();
      yield this.ctx.render('home/admin/users.html',{
        users: users.users
      });
    }
    // 管理价格
    * price() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const priceData = yield this.ctx.service.product.findPrice()
      const price = JSON.parse(JSON.stringify(priceData)).price[0]
      yield this.ctx.render('home/admin/price.html',{
        price: price
      });
    }
     * priceChange() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const priceData = yield this.ctx.service.product.findPrice()
      const price = JSON.parse(JSON.stringify(priceData)).price[0]
      console.log(price)
      yield this.ctx.render('home/admin/priceChange.html',{
        price: price
      });
    }
    // 后台订单
    * checkOrder() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const orderData = yield this.ctx.service.order.findAllOrder();
      console.log(orderData)
      const orderLists = JSON.parse(JSON.stringify(orderData)).orderList;
      yield this.ctx.render('home/admin/checkOrder.html',{
        orderLists:orderLists
      });
    }
    // 后台订单详情
    * adminOrderDetail() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const orderId = this.ctx.query.orderId; 
      console.log(orderId);
      const orderData = yield this.ctx.service.order.findById(orderId);
      const orderList = JSON.parse(JSON.stringify(orderData)).orderList[0];
      console.log(orderList)

      yield this.ctx.render('home/admin/orderDetail.html',{
        orderList:orderList
      });
    }
    // 审核订单
    * doCheckOrder() {
      const admin = this.ctx.cookies.get('admin');
      if (!admin) this.ctx.redirect('/admin/adminLogin')
      const orderId = this.ctx.query.orderId; 
      console.log(orderId);
      const orderData = yield this.ctx.service.order.findById(orderId);
      const orderList = JSON.parse(JSON.stringify(orderData)).orderList[0];
      console.log(orderList)

      yield this.ctx.render('home/admin/doCheckOrder.html',{
        orderList:orderList
      });
    }
  }
  return HomeController;
};
