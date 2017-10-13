$(function(){
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
			address: '地址：'+ $('.selected .address span').eq(0).html() + ' '+ $('.selected .detailAddress').html()
						+'<br />'+ ' 收件人：' +  $('.selected .address span').eq(1).html() +'<br />'+' 联系方式：' +  $('.selected .phone').html(),
 			express: $("input[name=express]:checked").val(),
			invoice: $("input[name=invoice]:checked").val(),
			id: orderId,
			orderPs: $('textarea').val() 
		}
		var formData = new FormData();
		  	formData.append('address', data.address);
		  	formData.append('express', data.express);
		  	formData.append('invoice', data.invoice);
		  	formData.append('orderPs', data.orderPs);
		  	formData.append('id', data.id);
		  	// Attach file
		  	formData.append('image', $('input[type=file]')[0].files[0]);

			console.log($('input[type=file]')[0].files[0])
		if ($("input[name=express]:checked").val() == undefined) {
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