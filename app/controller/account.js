exports.changePassword = function *(ctx){
	console.log(ctx.request.body.old)
	const user = ctx.cookies.get('user');
	const newPass = ctx.request.body.new1;
	const userInfo = yield ctx.service.user.findName(user)
	const password = JSON.parse(JSON.stringify(userInfo)).userName.pass
	// console.log(password)
		if(ctx.request.body.old == password){
            yield ctx.service.user.changePassword([newPass,user])                         
			ctx.body = 'success'                                               
		}else{
			ctx.body = 'passError'
		}

}
// 获取地址
exports.getAddressRank = function *(ctx){
	console.log(ctx.request.body)
	const data = ctx.request.body
	const res = yield ctx.service.user.getAddressRank(data.userName)
	console.log(JSON.stringify(res))
	console.log('data',data)
	ctx.body = JSON.parse(JSON.stringify(res))
}
// 保存地址
exports.saveAddress = function *(ctx){
	console.log(ctx.request.body)
	const data = ctx.request.body
	const res = yield ctx.service.user.insertAddress(data)
	// console.log(JSON.stringify(res))
	// console.log(res.insertAddress.insertId)
	ctx.body = res.insertAddress.insertId
}
// 删除地址
exports.deleteAddress = function *(ctx){
	console.log(ctx.request.body)
	const data = ctx.request.body
	const res = yield ctx.service.user.deleteAddress(data.id)
	// console.log(JSON.stringify(res))
	ctx.body = 'deleteSuccess'
}
// 默认地址
exports.defaultAddress = function *(ctx){
	console.log(ctx.request.body)
	const data = ctx.request.body
	yield this.app.mysql.query('update address set isDefault = 0' )
	yield this.app.mysql.query('update address  set isDefault = 1 where id='+ data.id )
	// console.log(JSON.stringify(res))
	ctx.body = 'defaultSuccess'
}

