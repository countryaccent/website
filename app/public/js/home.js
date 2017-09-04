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
        _this = $(this)
        key = _this.parent().data('key');
        type = _this.parent().data('type');
        val = _this.attr('data')
        console.log(key, val)
            // _this.parents('.items-btn').find('.btn-txt').html(val);
        vm[key] = val;

        // 出货形式 焊盘喷镀
        if (key == 'pattern' || key == 'spray' || key == 'cover' 
        	|| key == "test" || key == "delivery" || key == "urgent") {
            vm[key] = _this.html().trim()
        }
})
               