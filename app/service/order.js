module.exports = app => {
   return class Orders extends app.Service {
    * insert(data) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const orders = yield app.mysql.insert('orders', data)
      return {
        orders
      };
    }
    * findById(id){
      const orderList = yield app.mysql.select('orders',{
        where:{id:id}
      })
      return {
        orderList
      }
    }
    * insertFinalData(id,acceptName,acceptPhone,detailAddress,express,invoice,pcbFile,orderPs){
      const orderList = yield app.mysql.update('orders',{
        id: id,
        acceptName: acceptName,
        acceptPhone: acceptPhone,
        detailAddress: detailAddress,
        express: express,
        invoice: invoice,
        pcbFile: pcbFile,
        orderPs: orderPs,
        orderStatus:1,
      })
      return {
        orderList
      }
    }
    * findSelfOrder(id,userName){
      const orderList = yield app.mysql.query(`select * from orders where id="${id}" and userName="${userName}"`)
      return {
        orderList
      }
    }
    * findOrderByUserName(userName){
      const orderList = yield app.mysql.query(`select * from orders where userName="${userName}"`)
      return {
        orderList
      }
    }
    * findAllOrder(){
      const orderList = yield app.mysql.select('orders')
      return {
        orderList
      }
    }
    * doCheckOrder(data){
      const orderList = yield app.mysql.update('orders',data)
      return {
        orderList
      }
    }
     * cancelOrder(data){
    //   const orderList = yield app.mysql.delete('orders',{
    //     id: id
    //   })
    //   return {
    //     orderList
    //   }
    // }
     const orderList = yield app.mysql.update('orders',data)
      return {
        orderList
      }
    }
  }
};