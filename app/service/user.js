module.exports = app => {
  return class User extends app.Service {
    * find(uid) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const user = yield app.mysql.get('users', {
          id: uid,
      });
      return {
        user,
      };
    }
    * insert(data) {
      // 假如 我们拿到用户 id 从数据库获取用户详细信息
      const user = yield app.mysql.insert('users', {
          name: data[0],
          pass: data[1]
      });
      return {
        
      };
    }
  }
};