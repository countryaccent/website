module.exports = app => {
  return class HomeData extends app.Service {
    * find() {
      const products = yield app.mysql.select('products');
      return {
        products
      };
    }
    * findById(id) {
      const products = yield app.mysql.get('products',{
        id: id
      });
      return {
        products
      };
    }
     * findByType(type) {
      const results = yield app.mysql.query('SELECT * FROM products where type="'+ type +'"' )
      return {
        results
      };
    }
    * insert(data) {
      const product = yield app.mysql.insert('products', {
          img: data[0],
          title: data[1],
          type: data[2]
      });
      return {
        
      };
    }
    * update(img,title) {
      const product = yield app.mysql.query('update products set img=?,title=? where id = ?',[ img, title])
      return {
        
      };
    }
    * delete(id) {
      const product = yield app.mysql.query('delete from products where id = '+ id)
      return {
        
      };
    }
    * uploadWord(data) {
      const word = yield app.mysql.insert('word',{
        'home-server': data[0],
        'foot-phone': data[1],
        'foot-location': data[2],
        'about-company': data[3],
        'about-rxpcb': data[4],
        'contact': data[5],
      })
      return {
        word
      };
    }
    * findWordById() {
      const words = yield app.mysql.get('word',{
        id: '1'
      });
      return {
        words
      };
    }
     * editWord(data) {
      const word = yield app.mysql.update('word',data)
      return {
        
      };
    }
    * editPrice(data) {
      const price = yield app.mysql.update('price',data)
      return {
      };
    }
     * findPrice() {
      const price = yield app.mysql.select('price')
      return {
        price
      };
    }
  }
};