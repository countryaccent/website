exports.info = function* (ctx) {
  // const userId = ctx.params.id;
  // const user = yield ctx.service.user.find(userId);
  // ctx.body = user;
  const data=ctx.request.body
  // ctx.body=data
  const user = yield ctx.service.user.insert([data['name'],data['pass']]);
	ctx.redirect('/')
};