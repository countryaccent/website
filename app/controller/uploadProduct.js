'use strict';

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

// 上传
exports.upload = function* (ctx) {
  // const stream = yield this.getFileStream();
  // let filepath = path.join(this.app.config.baseDir, `app/public/images/${stream.filename}`);
  // if (stream.fields.title === 'mock-error') {
  //   filepath = path.join(this.app.config.baseDir, `app/public/images/not-exists/dir/${stream.filename}`);
  // } else if (stream.fields.title === 'mock-read-error') {
  //   filepath = path.join(this.app.config.baseDir, `app/public/images/read-error-${stream.filename}`);
  // }
  // this.logger.warn('Saving %s to %s', stream.filename, filepath);
  // try {
  //   yield saveStream(stream, filepath);
  // } catch (err) {
  //   yield sendToWormhole(stream);
  //   throw err;
  // }

  // const data = ctx.response.body
  // console.log(stream.fields.title)
  // const img = yield ctx.service.product.insert([stream.filename,stream.fields.title,stream.fields.type]);

  // console.log(stream.filename)
  // ctx.redirect('/admin/home')

  const parts = this.multipart();
  const arr = []
  let object;
  let part;
  part = yield parts;
  while (part) {
    if (part.length) {
      // arrays are busboy fields
      console.log('part',part)
      console.log('field: ' + part[0]);
      console.log('value: ' + part[1]);
      console.log('valueTruncated: ' + part[2]);
      console.log('fieldnameTruncated: ' + part[3]);
      arr.push(part[1])
    } else {
      // otherwise, it's a stream
      console.log('field: ' + part.fieldname);
      console.log('filename: ' + part.filename);
      console.log('encoding: ' + part.encoding);
      console.log('mime: ' + part.mime);
      // file handle
      object = yield this.oss.put('egg-oss-demo-' + part.filename, part);
    }
    part = yield parts;
  }
  console.log('arr',arr)
  console.log('and we are done parsing the form!');
  if (object) {
    console.log('get oss object: %j', object);
    this.unsafeRedirect(object.url);
    yield ctx.service.product.insert([object.url,arr[0],arr[1]]);
    ctx.redirect('/admin/home')
  } else {
    this.body = 'please select a file to upload！';
  }
};

// 编辑
exports.edit = function* (ctx) {
  // const stream = yield this.getFileStream();
  // let filepath = path.join(this.app.config.baseDir, `app/public/images/${stream.filename}`);
  // if (stream.fields.title === 'mock-error') {
  //   filepath = path.join(this.app.config.baseDir, `app/public/images/not-exists/dir/${stream.filename}`);
  // } else if (stream.fields.title === 'mock-read-error') {
  //   filepath = path.join(this.app.config.baseDir, `app/public/images/read-error-${stream.filename}`);
  // }
  // this.logger.warn('Saving %s to %s', stream.filename, filepath);
  // try {
  //   yield saveStream(stream, filepath);
  // } catch (err) {
  //   yield sendToWormhole(stream);
  //   throw err;
  // }

 
  // const data = stream
  // console.log('data',data)
  // const productId = ctx.params.id;

  // const img = yield this.app.mysql.query('update products set img=?, title=?, type=? where id = ?',
  //                                         [ stream.filename, 
  //                                           stream.fields.title,
  //                                           stream.fields.type,
  //                                           productId
  //                                         ])

  // console.log(stream.filename)

  
  const parts = this.multipart();
  const productId = ctx.params.id;
  const arr = []
  let object;
  let part;
  part = yield parts;
  while (part) {
    if (part.length) {
      // arrays are busboy fields
      console.log('part',part)
      console.log('field: ' + part[0]);
      console.log('value: ' + part[1]);
      console.log('valueTruncated: ' + part[2]);
      console.log('fieldnameTruncated: ' + part[3]);
      arr.push(part[1])
    } else {
      // otherwise, it's a stream
      console.log('field: ' + part.fieldname);
      console.log('filename: ' + part.filename);
      console.log('encoding: ' + part.encoding);
      console.log('mime: ' + part.mime);
      // file handle
      object = yield this.oss.put('egg-oss-demo-' + part.filename, part);
    }
    part = yield parts;
  }
  console.log('arr',arr)
  console.log('and we are done parsing the form!');
  if (object) {
    console.log('get oss object: %j', object);
    this.unsafeRedirect(object.url);
    yield this.app.mysql.query('update products set img=?, title=?, type=? where id = ?',[object.url,arr[0],arr[1],productId]);
    ctx.redirect('/admin/home')                         
  } else {
    this.body = 'please select a file to upload！';
  }
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
  console.log(res);
  res.id = 1
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


// 后台登录
exports.adminLogin = function *(ctx){
  const data = ctx.request.body
  console.log(data)
  const userData = yield this.app.mysql.query('select * from admin') ;
  const user = JSON.parse(JSON.stringify(userData))[0]
  if (data.userName == user.userName && data.password == user.password) {
    ctx.body = 'success';
    this.cookies.set('admin', data.userName, { maxAge: 24 * 3600 * 1000 });
  }else {
    ctx.body = 'fail'
  }
  console.log(user)
}

exports.signout = function *(ctx){
   ctx.cookies.set('admin', null);
   ctx.redirect('/admin')
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
