exports.info = function* (ctx) {
  // const userId = ctx.params.id;
  // const user = yield ctx.service.user.find(userId);
  // ctx.body = user;
  // const data=ctx.request.body
  // ctx.body=data
  // const user = yield ctx.service.user.insert([data['name'],data['pass']]);
	// ctx.redirect('/')
	// console.log(data)
  // const user = yield ctx.service.user.find();
  
	// ctx.body = user


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
	    PhoneNumbers: '18779120357',
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
};