exports.signup = function* (ctx) {
	 const data=ctx.request.body
	
	 try{

		try{
			const userName = yield ctx.service.user.findName(data.name)
			const name = JSON.parse(JSON.stringify(userName)).userName.name

			if (name) {
				ctx.body = 'hasName'; 
			}

		}catch(e){

			const userPhone = yield ctx.service.user.findPhone(data.phone)
			const phone = JSON.parse(JSON.stringify(userPhone)).userPhone.phone

			if(phone){
				ctx.body = 'hasPhone';
			}
		}

	 }
	 catch(e){
		yield ctx.service.user.insert([data.name,data.pass,data.phone,data.qq]);
		ctx.body = 'success'
		this.cookies.set('user', data.name, { maxAge: 24 * 3600 * 1000 });

	 }
	
	// console.log(user)
	// ctx.body = 'success'
}
exports.yzm = function* (ctx) {
	const data=ctx.request.body
	 
	const SMSClient = require('@alicloud/sms-sdk')
	const accessKeyId = 'LTAIJZld9UwVfurN'
	const secretAccessKey = 'sm7eLeNryxu2Ja4TQg0J6FgR1NaObW'
	//初始化sms_client
	let smsClient = new SMSClient({accessKeyId, secretAccessKey})
	//发送短信
    var num = '';
    for (var i = 0; i < 6; i++) {
    	num+=Math.floor(Math.random()*10)
    }
    ctx.body = num
	smsClient.sendSMS({
	    PhoneNumbers: data.phone,
	    SignName: 'wclimb个人博客',
	    TemplateCode: 'SMS_100855018',
	    TemplateParam: '{"code":'+num+',"product":"云通信"}'
	}).then(function (res) {
	    let {Code}=res
	    if (Code === 'OK') {
	        //处理返回参数
	        console.log(res)
	    }
	}, function (err) {
	    console.log(err)
	})
}

exports.signin = function *(ctx){
	 const data=ctx.request.body
	console.log(data)
	 try{
		try{
			const userName = yield ctx.service.user.findName(data.name)
			const name = JSON.parse(JSON.stringify(userName)).userName.name
			const pass = JSON.parse(JSON.stringify(userName)).userName.pass;
			console.log(name,pass)
			ctx.body = 'success' 
			if (name && pass == data.pass) {
				ctx.body = 'success';
				this.cookies.set('user', name, { maxAge: 24 * 3600 * 1000 });

			}else{
				ctx.body = 'fail' 

			}
		}catch(e){

			const userPhone = yield ctx.service.user.findPhone(data.name)
			const phone = JSON.parse(JSON.stringify(userPhone)).userPhone.phone
			const pass = JSON.parse(JSON.stringify(userPhone)).userPhone.pass
			const name = JSON.parse(JSON.stringify(userPhone)).userPhone.name

			if(phone && pass == data.pass){
				ctx.body = 'success';
				this.cookies.set('user', name, { maxAge: 24 * 3600 * 1000 });

			}else{
				ctx.body = 'fail'
			}
		}

	 }
	 catch(e){
		ctx.body = 'fail'
	 }
   
}

exports.signout = function *(ctx){
	 ctx.cookies.set('user', null);
	 ctx.redirect('/')
}

exports.signinYzm = function *(ctx){
	const fs = require('fs')
    const captcha = require('trek-captcha')

    const { token, buffer } = yield captcha({ size: 4, style: 1 })

    console.log(token, buffer)
    fs.createWriteStream('app/public/images/yzm.jpg').on('finish',  (data) => {
       
    }).end(buffer)
   console.log(token)
   ctx.body = token
}




