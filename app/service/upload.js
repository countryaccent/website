module.exports = app => {
   return class Upload extends app.Service {
    * insert(data) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const img = yield app.mysql.insert('img', {
          img: data
      });
      return {
        
      };
    }
     * find (data) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const img = yield app.mysql.get('img', {
          
      });
      return {
        img
      };
    }
  }
};