const moment = require('moment')
exports.compute = function *(ctx){
	const data = ctx.request.body
	data.width = '10';
	data.layer = 4
	console.log(data)
	ctx.body = data
}
exports.submit = function *(ctx){
	const data = ctx.request.body;
	const price = data.price;
	const userName = ctx.cookies.get('user');
	const phoneData = yield ctx.service.user.findName(userName)
	const phone = JSON.parse(JSON.stringify(phoneData)).userName.phone
	console.log(phone)
	const orderTime = moment().format('YYYY-MM-DD HH:mm');
	data.userName = userName;
	data.phone = phone;
	data.orderTime = orderTime;
	const order = yield ctx.service.order.insert(data)
		
	ctx.body = order.orders.insertId
	// console.log(order)
}

const fs = require('fs');
const path = require('path');
const sendToWormhole = require('stream-wormhole');

exports.finalSubmit = function *(ctx){
	const stream = yield this.getFileStream();
	  let filepath = path.join(this.app.config.baseDir, `app/public/images/pcbFile/${stream.filename}`);
	  if (stream.fields.title === 'mock-error') {
	    filepath = path.join(this.app.config.baseDir, `app/public/images/pcbFile/not-exists/dir/${stream.filename}`);
	  } else if (stream.fields.title === 'mock-read-error') {
	    filepath = path.join(this.app.config.baseDir, `app/public/images/pcbFile/read-error-${stream.filename}`);
	  }
	  this.logger.warn('Saving %s to %s', stream.filename, filepath);
	  try {
	    yield saveStream(stream, filepath);
	  } catch (err) {
	    yield sendToWormhole(stream);
	    throw err;
	  }
 	console.log(stream)
	  const data = {
	    file: stream.filename,
	    fields: stream.fields,
	  };

	const finalData = yield ctx.service.order.insertFinalData(data.fields.id,
																data.fields.address,
																data.fields.express,
																data.fields.invoice,
																data.file,
																data.fields.orderPs)
	// ctx.body = order.orders.insertId
	this.body = 'success'
	console.log(finalData)	
}



exports.doCheckOrder = function *(ctx){
	var data = ctx.request.body
	console.log(data);
	var updateOrder = yield ctx.service.order.doCheckOrder(data)
	ctx.body = 'success'
	console.log(updateOrder)
}


exports.cancelOrder = function *(ctx){
	var data = ctx.request.body
	console.log(data);
	var updateOrder = yield ctx.service.order.cancelOrder(data.id)
	ctx.body = 'success'
	console.log(updateOrder)
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