$(function(){
	$('.addAddress button').click(function(){
		$('.address_show').show()
	})
	$('.save span:eq(1)').click(function(){
		$('.address_show').hide()
	})
	var isFirst = 0
	$('.save span:eq(0)').click(function(){
		var acceptName = $('input[name=name]').val();
		var phone = $('input[name=phone]').val();
		var detailAddress = $('input[name=detailAddress]').val()
		var sel1 = $('select').eq(0).val()
		var sel2 = $('select').eq(1).val()
		var sel3 = $('select').eq(2).val()
		if (this.name === '' || 
			phone === '' || 
			sel1 === '' ||
			sel2 === '' ||
			sel3 === '' ||
			detailAddress === '') {
			alert('请填写完整的信息')
			return
		}else if (!(/^1[3|4|5|8][0-9]\d{8}$/g).test(phone) && !(/^0\d{2,3}-?\d{7,8}$/g).test(phone)) {
			alert('请输入正确的手机号或座机')
			return
		}
		var data = {
			acceptName: acceptName,
			phone: phone,
			address: sel1 + sel2 + sel3,
			detailAddress: detailAddress,
			userName: userName,
			isDefault:0
		};
		isFirst++
		$.post('/account/saveAddress?_csrf='+csrf,data,function(res){
			if (res) {
				console.log(res)
				if (isFirst == 1) 
					$('.accept ul').append('<li class="isDefault selected"><div class="address"><span>'+sel1 + sel2 + sel3+' </span>（<span>'+ acceptName +'收</span>）</div><div class="detailAddress">'+detailAddress+'</div><div class="phone">'+phone+'</div></li>')
				else
					$('.accept ul').append('<li><div class="address"><span>'+sel1 + sel2 + sel3+' </span>（<span>'+ acceptName +'收</span>）</div><div class="detailAddress">'+detailAddress+'</div><div class="phone">'+phone+'</div></li>')
				$('.address_show').hide()
				$('.accept ul li').click(function(){
					$(this).addClass('selected').siblings('li').removeClass('selected');
				})
			}
		})
	})
	$('.accept ul li').click(function(){
		$(this).addClass('selected').siblings('li').removeClass('selected');
		console.log($('.selected').html())
	})

	function radio(data){
		$(data).click(function(){
			$(data).parents('span').removeClass('ivu-radio-checked')
			$(data +":checked").parents('span').addClass('ivu-radio-checked')
		})
	}
	radio('input[name=express]')
	radio('input[name=invoice]')
	$(window).scroll(function(){
		// console.log($(window).scrollTop())
		if ($(window).scrollTop() > 200 ) {
			$('.wrap-right').css({
				'position': 'relative',
				'top': $(window).scrollTop()-200
			})
		}else if($(window).scrollTop() < 200 ){
			$('.wrap-right').css({
				'position': 'static',
			})
		}
	})

	$('.submit').click(function(){
		var reg = new RegExp("(^|&)" + 'orderId' + "=([^&]*)(&|$)", "i")
		var orderId = unescape(decodeURI(location.search.substr(1).match(reg)[2]));
		if (!isZip) {alert('请上传格式为(.rar/.zip)的压缩文件'); return}
		var data = {
			acceptName: $('.address span:eq(1)').html(),
			acceptPhone:  $('.selected .phone').html(),
			detailAddress:$('.selected .address span').eq(0).html()+ ' ' +$('.selected .detailAddress').html(),
 			express: $("input[name=express]:checked").val(),
			invoice: $("input[name=invoice]:checked").val(),
			id: orderId,
			orderPs: $('textarea').val() 
		}
		var formData = new FormData();
		  	formData.append('acceptName', data.acceptName);
		  	formData.append('acceptPhone', data.acceptPhone);
		  	formData.append('detailAddress', data.detailAddress);
		  	formData.append('express', data.express);
		  	formData.append('invoice', data.invoice);
		  	formData.append('orderPs', data.orderPs);
		  	formData.append('id', data.id);
		  	// Attach file
		  	formData.append('image', $('input[type=file]')[0].files[0]);

			console.log($('input[type=file]')[0].files[0])
		if ($('.selected').size() == 0){
			alert('请选择收获地址')
		}else if ($("input[name=express]:checked").val() == undefined) {
			alert('请选择快递信息')
		}else if($("input[name=invoice]:checked").val() == undefined){
			alert('请选择发票信息')
		}else if($('input[type=file]')[0].files[0] == undefined){
			alert('请上传PCB文件')
		}else{
			// alert('请上传PCB文件')
	   		$.ajax({
			    url: '/count/finalSubmit?_csrf='+ csrf,
			    data: formData,
			    type: 'POST',
			    contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
			    processData: false, // NEEDED, DON'T OMIT THIS
			    success: function(result) {
			    	if (result) {
			    		console.log(result)
			    		alert('提交成功')
			    		window.location.href = "/orderDetail?orderId=" + orderId
			    	}
			      // alert('upload success: ' + JSON.stringify(result));
			    },
			    error: function(responseStr) {
			    	alert('提交失败')
			      console.log("error", responseStr);
			    }
			});
		}
		
	})
	$('.pay').click(function(){
		console.log(1)
	})
})