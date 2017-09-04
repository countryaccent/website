var vm = new Vue({
    el: '.P-count',
    delimiters: ['${', '}'],
    data: {
        // 板子层数
        layer: 2,
        // 出货形式
        pattern: '单片出货',
        // 宽高
        width: '',
        height: '',
        // 拼版款式
        pbStyle: '1',
        // 拼版款式显示
        pbStyleShow: false,
        // 拼版宽高
        pbWidth: '',
        pbHeight: '',
        // 工艺边框
        border: '无',
        borderStyle: '0',
        borderStyleStatus: 0,
        // 单片数量
        counts: 10,
        // 板子厚度
        thick: 1.6,
        // 焊盘喷镀
        spray: '有铅喷锡',
        // 阻焊覆盖
        cover: '过孔盖油',
        // 阻焊颜色
        color: '绿色',
        // 外层铜厚
        copper: '1',
        // 最小线宽
        lineweight: '6.0',
        // 最小过孔
        hole: '0.3',
        bga: '0',
        halfhole: '0',
        // 阻抗
        impedance: '0',
        test: '样品免费测试',
        delivery: '正常3-4天',
        // 单片连片
        lianP: true,
        // table-y
        // 加急
        urgent:'不加急',	

        price: {
            gcFee: 0,
            bcFee: this.width * this.height * this.counts * 0.05,
            specialFee: 0,
            feilinFee: 0,
            pinFee: 0,
            copperFee: 0,
            sprayFee: 0,
            colorFee: 0,
            bgaFee: 0,
            holeFee: 0,
            impedanceFee: 0,
            halfholeFee: 0,
            testFee: 0,

            urgentFee:0
        },

        // 计算不同样式价格
        // 四层
        fourLayer:0,
        urgentFee:0
    },
    computed: {
        tableY: function() {
            return this.pbHeight
        },
        tableX: function() {
            return this.pbWidth
        },
        borderWidthResult: function() {
            return this.borderStyleStatus == 1 || this.borderStyleStatus == 3 ? this.borderStyle / 10 * 2 : 0
        },
        borderHeightResult: function() {
            return this.borderStyleStatus == 2 || this.borderStyleStatus == 3 ? this.borderStyle / 10 * 2 : 0
        },
        // 板材费 长宽相同价格不变 0.38 0.05 
        bcFee:function(){
        	if (this.layer == 1) {
        		return this.width * this.height * this.counts * 0.038
        	}else if(this.layer == 2){
	        	return this.width * this.height * this.counts * 0.05
        	}else if(this.layer == 4){
        		return this.width * this.height * this.counts * 0.08
        	}
        },
        // 工程费 分50 200
        gcFee:function(){
        	if (this.layer == 1 || this.layer == 2) {
        		return 50
        	}else if(this.layer == 4){
        		return 200
        	}
        },
        // 四层算菲林费
        feilinFee:function(){
        	if (this.layer == 4) {
        		return this.width * this.height * 0.1
        	}else{
        		return 0
        	}
        },
        // 总价
        totalFee:function(){
        	return this.bcFee + this.gcFee + this.feilinFee + this.urgentFee
        }
    }

})

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



             // 计算价格// 计算价格// 计算价格// 计算价格// 计算价格
             // 单面板
            if (vm.layer == 1 && vm.thick == 1.6 && vm.spray == '有铅喷锡') {
             	vm.fourLayer = 320
             }
            if (vm.layer == 1 && vm.thick == 1.6 && vm.spray == '无铅喷锡') {
             	vm.fourLayer = 370
             }
            if (vm.layer == 1 && vm.thick == 2.0 && vm.spray == '无铅喷锡') {
             	vm.fourLayer = 400
            }
            if (vm.layer == 1 && vm.thick == 1.6 && vm.spray == '沉金') {
             	vm.fourLayer = 450
            }
            if (vm.layer == 1 && vm.thick == 2.0 && vm.spray == '无铅喷锡') {
             	vm.fourLayer = 450
            }
            if (vm.layer == 1 && vm.thick == 1.6 && vm.spray == '有铅喷锡' && vm.copper == 2) {
		    	vm.fourLayer = 500
		    }
		    if (vm.layer == 1 && vm.thick == 1.6 && vm.spray == '沉金' && vm.copper == 2) {
		    	vm.fourLayer = 600
		    }
		    if (vm.layer == 1 && vm.thick == 2.0 && vm.spray == '沉金' && vm.copper == 2) {
		    	vm.fourLayer = 700
		    }

		    // 双面板
		    if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '有铅喷锡') {
             	vm.fourLayer = 380
            }
            if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '无铅喷锡') {
             	vm.fourLayer = 430
            }
            if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '沉金') {
             	vm.fourLayer = 520
            }
            if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '有铅喷锡' && vm.copper == 2) {
             	vm.fourLayer = 550
            }
            if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '沉金' && vm.copper == 2) {
             	vm.fourLayer = 600
            }
            if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '无铅喷锡' && vm.copper == 2) {
             	vm.fourLayer = 550
            }
            if (vm.layer == 2 && vm.thick == 2.0 && vm.spray == '有铅喷锡') {
             	vm.fourLayer = 480
            }
            if (vm.layer == 2 && vm.thick == 2.0 && vm.spray == '无铅喷锡') {
             	vm.fourLayer = 530
            }
            if (vm.layer == 2 && vm.thick == 2.0 && vm.spray == '有铅喷锡' && vm.copper == 2) {
             	vm.fourLayer = 700
            }
            if (vm.layer == 2 && vm.thick == 2.0 && vm.spray == '无铅喷锡' && vm.copper == 2) {
             	vm.fourLayer = 730
            }
            if (vm.layer == 2 && vm.thick == 2.0 && vm.spray == '沉金') {
             	vm.fourLayer = 600
            }
            if (vm.layer == 2 && vm.thick == 2.0 && vm.spray == '沉金' && vm.copper == 2) {
             	vm.fourLayer = 750
            }
            if (vm.layer == 2 && vm.thick == 1.6 && vm.spray == '有铅喷锡' && vm.halfhole == 1) {
             	vm.fourLayer = 480
            }

            // 四层板 1.6板厚 有铅喷锡 
             console.log( vm.spray)
		    if (vm.layer == 4 && vm.thick == 1.6 && vm.spray == '有铅喷锡') {
		    	vm.fourLayer = 750
		    }
		    // 无铅喷锡
		    if (vm.layer == 4 && vm.thick == 1.6 && vm.spray == '无铅喷锡') {
		    	vm.fourLayer = 800

		    }
		    // 沉金
		    if (vm.layer == 4 && vm.thick == 1.6 && vm.spray == '沉金') {
		    	vm.fourLayer = 900
		    }

		    // 四层板 1.6板厚 外层2盎司 内层2盎司
		    if (vm.layer == 4 && vm.thick == 1.6 && vm.spray == '有铅喷锡' && vm.copper == 2) {
		    	vm.fourLayer = 1100
		    }

		    // 四层板 2.0板厚 
		    if (vm.layer == 4 && vm.thick == 2.0 && vm.spray == '无铅喷锡') {
		    	vm.fourLayer = 1150
		    }
		    if (vm.layer == 4 && vm.thick == 2.0 && vm.spray == '有铅喷锡' && vm.copper == 2) {
		    	vm.fourLayer = 1200
		    }
		    if (vm.layer == 4 && vm.thick == 2.0 && vm.spray == '无铅喷锡' && vm.copper == 2) {
		    	vm.fourLayer = 1200
		    }
		    // 1200 1500 不一样
		    // if (vm.layer == 4 && vm.thick == 2.0 && vm.spray == '有铅喷锡' && vm.copper == 2) {
		    // 	vm.fourLayer = 1500
		    // }
		    if (vm.layer == 4 && vm.thick == 2.0 && vm.spray == '沉金' && vm.copper == 2) {
		    	vm.fourLayer = 1150
		    }
		    //  if (vm.layer == 4 && vm.thick == 2.0 && vm.spray == '沉金' && vm.copper == 2) {
		    // 	vm.fourLayer = 1300
		    // }
		    console.log('不同规格每平方价格',vm.fourLayer)

		    // 加急费
		    if (key == 'urgent' && val == 0) {
		    	vm.urgentFee = 0
		    }else if(key == 'urgent' && val == 1){
		    	vm.urgentFee = 50
		    }else if(key == 'urgent' && val == 2){
		    	vm.urgentFee = 0
		    }
		     console.log('加急费',vm.urgentFee)
        })
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




})