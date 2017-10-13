const FormStream = require('formstream');
module.exports = function* multipart(ctx) {
  const form = new FormStream();
  // 设置普通的 key value
  form.field('foo', 'bar');
  // 上传当前文件本身用于测试
  form.file('file', __filename);
  const result = yield ctx.curl('https://httpbin.org/post', {
    // 必须指定 method，支持 POST，PUT
    method: 'POST',
    // 生成符合 multipart/form-data 要求的请求 headers
    headers: form.headers(),
    // 以 stream 模式提交
    stream: form,
    // 明确告诉 HttpClient 以 JSON 格式处理响应 body
    dataType: 'json',
  });
  ctx.body = result.data.files;
  // 响应最终会是类似以下的结果：
  // {
  //   "file": "'use strict';\n\nconst For...."
  // }
};