module.exports = app => {
  return class User extends app.Service {
    * findName(name) {
      const userName = yield app.mysql.get('users',{
        name: name
      });
      return {
        userName
      };
    }
    * findPhone(phone) {
      const userPhone = yield app.mysql.get('users',{
        phone: phone
      });
      return {
        userPhone
      };
    }
    * insert(data) {
      const user = yield app.mysql.insert('users', {
          name: data[0],
          pass: data[1],
          phone: data[2],
          qq: data[3]
      });
      return {
        
      };
    }
    * findUsers() {
      const users = yield app.mysql.select('users');
      return {
        users
      };
    }
    * changePassword(pass) {
      const users = yield app.mysql.query('update users set pass=? where name = ?',pass)
      return {
      
      };
    }
    // * getAddress(userName) {
       
    //   const getAddress = yield app.mysql.select('address',{
    //     where:{userName: userName}
    //   })
    //    // const getAddress = yield app.mysql.query(`select * from address where userName="${userName}" order by isDefault desc;`)
    //   return {
    //     getAddress
    //   };
    // }
    * getAddressRank(userName) {
       const getAddress = yield app.mysql.query(`select * from address where userName="${userName}" order by isDefault desc;`)
      return {
        getAddress
      };
    }
    * insertAddress(data) {
      const insertAddress = yield app.mysql.insert('address',data)
      return {
        insertAddress
      };
    }
    * deleteAddress(id) {
      const deleteAddress = yield app.mysql.delete('address',{
        id: id
      })
      return {
        deleteAddress
      };
    }

  }
};