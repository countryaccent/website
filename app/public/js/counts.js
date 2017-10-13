$(function() {
    // 按钮切换
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

        // 工艺边框
        $('#borderStyle').removeAttr("readonly");
        if (vm.border == '无') {
            $('#borderStyle').attr("readonly", "readonly");
            vm.borderStyle = 0;
            vm.borderStyleStatus = 0
            $('.draw-table').css({
                'border': 'none',
            })
        } else if (vm.border == '左右') {
            vm.borderStyle = 5;
            vm.borderStyleStatus = 1;
            $('.draw-table').css({
                'border-left': '5px solid #f60',
                'border-right': '5px solid #f60',
                'border-top': 'none',
                'border-bottom': 'none',
            })

        } else if (vm.border == '上下') {
            vm.borderStyle = 10;
            vm.borderStyleStatus = 2
            $('.draw-table').css({
                'border-left': 'none',
                'border-right': 'none',
                'border-top': '5px solid #f60',
                'border-bottom': '5px solid #f60',
            })
        } else if (vm.border == '四边') {
            vm.borderStyle = 15;
            vm.borderStyleStatus = 3
            $('.draw-table').css({
                'border': '5px solid #f60',
            })
        }

        // 拼版规则
        if (vm.pattern != '文件内是单片，需拼版') {
            vm.pbWidth = '';
            vm.pbLength = '';
        }

        // 连片单双
        if (vm.pattern != '单片出货') {
            vm.lianP = false
        } else {
            vm.lianP = true
        }

        if (vm.pattern == '按文件内已拼版资料出货') {
            vm.pbStyleShow = true
        } else {
            vm.pbStyleShow = false
        }

        // 连片单双
        if (vm.pattern != '单片出货') {
            vm.lianP = false
        } else {
            vm.lianP = true
        }
        // 单片数量
        $('#counts-btn').click(function() {
            
            if ($('#inputCounts').val().trim() === '' || $('#inputCounts').val() == '0') {
                alert('请输入数量')
            } else {
                vm.counts = $('#inputCounts').val();
                $(".choose-menu").hide();
            }

        })
            // 阻焊颜色
        $('ul.color').on('click', 'li', function() {
            var cls = $(this).attr('class')
            var btnCls = $('.btn-txt.color').attr('class').split(' ')[2]
            $('.btn-txt.color').removeClass(btnCls).addClass(cls)
        })


        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////
        ///////////////////////////////////////////////////////


        // 不同材料的计算费用

        if (vm.area >= 2) {
            vm.mass()
        }else{
            //不同板厚多加50
            if (vm.thick == 0.4 ) {
                vm.thickExtra = price['price1'];
            }else if(vm.thick > 2.0){
                vm.thickExtra = price['price2'];
            }else if(vm.thick == 2.5){
                vm.thickExtra = price['price3'];
            }else if(vm.thick == 3.0){
                vm.thickExtra = price['price4'];
            }else{
                vm.thickExtra = 0;
            }
            if (vm.spray == '沉金') {
                vm.price.sprayFee = price['price12']
            }
            if(vm.copper == 2){
                vm.price.copperFee = price['price13']
            }
        }
        console.log('thickExtra' ,vm.thickExtra)
        // 加急费
        if (key == 'urgent' && val == 0) {
            vm.urgentFee = 0
        }
        if(key == 'urgent' && val == 1 && vm.area <= 0.3){
            vm.urgentFee =  price['price14']
        }
        if(key == 'urgent' && val == 1 && vm.area <= 0.3 && vm.thick > 1.6){
            vm.urgentFee =  price['price15']
        }
        if(key == 'urgent' && val == 2 && vm.area <= 0.5){
            vm.urgentFee =  price['price16']
        }

        console.log('加急费',vm.urgentFee)
        console.log(vm.area);

        var computed = {
            layer: vm.layer,
            pattern: vm.pattern,
            width: vm.width,
            height: vm.height,
            pbStyle: vm.pbStyle,
            pbWidth: vm.pbWidth,
            pbHeight: vm.pbHeight,
            border: vm.border,
            borderStyle: vm.borderStyle,
            borderStyleStatus: vm.borderStyleStatus,
            counts: vm.counts,
            thick: vm.thick,
            spray: vm.spray,
            cover: vm.cover,
            color: vm.color,
            copper: vm.copper,
            lineweight: vm.lineweight,
            hole: vm.hole,
            bga: vm.bga,
            halfhole: vm.halfhole,
            impedance: vm.impedance,
            test: vm.test,
            delivery: vm.delivery,
            urgent: vm.urgent,   
        }
        // $.post('/count/compute?_csrf='+ csrf , computed, function(data) {                      
       
        //     console.log(data)
        // },'json');


    })
})