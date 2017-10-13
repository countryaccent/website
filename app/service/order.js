module.exports = app => {
   return class Orders extends app.Service {
    * insert(userName,phone,orderTime,layer,pattern,width,height,pbStyle,pbWidth,pbHeight,border,borderStyle,borderStyleStatus,counts,thick,spray,cover,color,copper,lineweight,hole,bga,halfhole,impedance,test,delivery,urgent, bcFee,gcFee,urgentFee,thickExtra,copperFee,sprayFee,colorFee,testFee,totalFee) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const orders = yield app.mysql.insert('orders', {
          userName:userName,
          phone: phone,
          orderTime: orderTime,
          layer: layer,
          pattern: pattern,
          width: width,
          height: height,
          pbStyle: pbStyle,
          pbWidth: pbWidth,
          pbHeight: pbHeight,
          border: border,
          borderStyle: borderStyle,
          borderStyleStatus: borderStyleStatus,
          counts: counts,
          thick: thick,
          spray: spray,
          cover: cover,
          color: color,
          copper: copper,
          lineweight: lineweight,
          hole: hole,
          bga: bga,
          halfhole: halfhole,
          impedance: impedance,
          test: test,
          delivery: delivery,
          urgent: urgent, 
          bcFee: bcFee,
          gcFee: gcFee,
          urgentFee: urgentFee,
          thickExtra: thickExtra,
          copperFee: copperFee,
          sprayFee: sprayFee,
          colorFee: colorFee,
          testFee: testFee,
          totalFee: totalFee
      });
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
    * insertFinalData(id,address,express,invoice,pcbFile,orderPs){
      const orderList = yield app.mysql.update('orders',{
        id: id,
        address: address,
        express: express,
        invoice: invoice,
        pcbFile: pcbFile,
        orderPs: orderPs
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
    * doCheckOrder(id,checkStatus,productStatus,sendStatus,checkPs,gcFee,bcFee,urgentFee,thickExtra,copperFee,sprayFee,colorFee,testFee,totalFee){
      const orderList = yield app.mysql.update('orders',{
        id:id,
        checkStatus: checkStatus,
        productStatus: productStatus,
        sendStatus: sendStatus,
        checkPs: checkPs,
        gcFee:gcFee,
        bcFee: bcFee,
        urgentFee: urgentFee,
        thickExtra: thickExtra,
        copperFee: copperFee,
        sprayFee: sprayFee,
        colorFee: colorFee,
        testFee: testFee,
        totalFee: totalFee,
      })
      return {
        orderList
      }
    }
     * cancelOrder(id){
      const orderList = yield app.mysql.delete('orders',{
        id: id
      })
      return {
        orderList
      }
    }
  }
};