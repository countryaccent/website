'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

// 上传
exports.upload = function* (ctx) {
  const stream = yield this.getFileStream();
  let filepath = path.join(this.app.config.baseDir, `app/public/images/${stream.filename}`);
  if (stream.fields.title === 'mock-error') {
    filepath = path.join(this.app.config.baseDir, `app/public/images/not-exists/dir/${stream.filename}`);
  } else if (stream.fields.title === 'mock-read-error') {
    filepath = path.join(this.app.config.baseDir, `app/public/images/read-error-${stream.filename}`);
  }
  this.logger.warn('Saving %s to %s', stream.filename, filepath);
  try {
    yield saveStream(stream, filepath);
  } catch (err) {
    yield sendToWormhole(stream);
    throw err;
  }

  // this.body = {
  //   file: stream.filename,
  //   fields: stream.fields,
  // };
  const data = ctx.response.body
  console.log(stream.fields.title)
  const img = yield ctx.service.product.insert([stream.filename,stream.fields.title,stream.fields.type]);

  console.log(stream.filename)
  ctx.redirect('/admin/home')
};

// 编辑
exports.edit = function* (ctx) {
  const stream = yield this.getFileStream();
  let filepath = path.join(this.app.config.baseDir, `app/public/images/${stream.filename}`);
  if (stream.fields.title === 'mock-error') {
    filepath = path.join(this.app.config.baseDir, `app/public/images/not-exists/dir/${stream.filename}`);
  } else if (stream.fields.title === 'mock-read-error') {
    filepath = path.join(this.app.config.baseDir, `app/public/images/read-error-${stream.filename}`);
  }
  this.logger.warn('Saving %s to %s', stream.filename, filepath);
  try {
    yield saveStream(stream, filepath);
  } catch (err) {
    yield sendToWormhole(stream);
    throw err;
  }

 
  const data = stream
  console.log('data',data)
  const productId = ctx.params.id;

  const img = yield this.app.mysql.query('update products set img=?, title=?, type=? where id = ?',
                                          [ stream.filename, 
                                            stream.fields.title,
                                            stream.fields.type,
                                            productId
                                          ])

  console.log(stream.filename)

  ctx.redirect('/admin/home')
  
};

// 删除

exports.delete = function* (ctx){
  const productId = ctx.params.id;
  const img = yield this.app.mysql.query('delete from products where id = '+ productId)

  ctx.redirect('/admin/home')
}

exports.uploadWord = function* (ctx){

  const res = ctx.request.body ;
  console.log(ctx.request.body )
  const img = yield ctx.service.product.uploadWord([res['home-server'],res['foot-phone'],res['foot-location'],res['about-company'],res['about-rxpcb'],res['contact']]);

  ctx.redirect('/admin/home')
}

exports.editWord = function* (ctx){

  const res = ctx.request.body ;
  console.log(res)
  const img = yield ctx.service.product.editWord({
          id:1,
          'home-server':res['home-server'],
          'foot-phone': res['foot-phone'],
         'foot-location': res['foot-location'],
         'about-company': res['about-company'],
         'about-rxpcb': res['about-rxpcb'],
        'contact': res['contact']
    });

  ctx.redirect('/admin/home')
}

exports.editPrice = function* (ctx){

  const data = ctx.request.body;
  data['id'] = 1
  const price = yield ctx.service.product.editPrice(data)
  console.log(data)
  ctx.body = 'success'
}

function saveStream(stream, filepath) {
  return new Promise((resolve, reject) => {
    if (filepath.indexOf('/read-error-') > 0) {
      stream.once('readable', () => {
        const buf = stream.read(10240);
        console.log('read %d bytes', buf.length);
        setTimeout(() => {
          reject(new Error('mock read error'));
        }, 1000);
      });
    } else {
      const ws = fs.createWriteStream(filepath);
      stream.pipe(ws);
      ws.on('error', reject);
      ws.on('finish', resolve);
    }
  });
}
