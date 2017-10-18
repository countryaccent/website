var vm = new Vue({
    el:'.P-home',
    delimiters: ['${', '}'],
    data:{
        width:'',
        height:'',
        layer:2,
        thick:1.6,
        counts:10,
        url:'/count'
    }
})
$('.items-btn-wrap').click(function() {
    var _this = $(this);
    var $menu = _this.siblings(".choose-menu");
    $(".choose-menu").not($menu).hide();
    $menu.toggle();
})
$(document).on('click', function() {
    $(".choose-menu").hide();
}).on('click', '.items-list', function(event) {
    event.stopPropagation();
})
$(".choose-menu").find("li").on('click', function() {
    $(".choose-menu").hide();
})

$('.choose-menu').on('click', 'li', function() {
        var _this = $(this)
        var key = _this.parent().data('key');
        var type = _this.parent().data('type');
        var val = _this.attr('data')
        console.log(key, val)
            // _this.parents('.items-btn').find('.btn-txt').html(val);
        vm[key] = val;

        // 出货形式 焊盘喷镀
        if (key == 'pattern' || key == 'spray' || key == 'cover' 
        	|| key == "test" || key == "delivery" || key == "urgent") {
            vm[key] = _this.html().trim()
        }
})

var $body = $('.ivu-table-tbody')
var trHeight = $body.find("tr").height(); 
console.log(trHeight)
setInterval(function(){
    
   $('.ivu-table-body').animate({ marginTop : trHeight },600,function(){ 
        $body.find("tr:last").prependTo($body);
        $body.find("tr:first").hide(); 
        $('.ivu-table-body').css({marginTop:0}); 
        $body.find("tr:first").fadeIn(1000); 
    }); 
   
},4000)
var acceptNameSize = $('.acceptName span').size()
var detailAddressSize = $('.detailAddress span').size()
for (var i = 0; i < acceptNameSize; i++) {
    $('.acceptName').eq(i).find('span').html( $('.acceptName').eq(i).find('span').html().charAt(0)+'**')
}
for (var i = 0; i < detailAddressSize; i++) {
    var _html = $('.detailAddress').eq(i).find('span').html().split(' ')[0]
    $('.detailAddress').eq(i).find('span').html(_html)
}
               