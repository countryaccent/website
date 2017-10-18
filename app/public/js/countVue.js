var i_data = {
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

        // 不是批量的额外费用
        thickExtra: 0,
        price: {
            gcFee: 0,
            bcFee: 0,
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
            urgentFee: 0,
            extraFee: 0,
            differLayer:1
        },

        // 计算不同样式价格
        differLayer:0,
        urgentFee:0,

    }
var vm = new Vue({
    el: '.P-count',
    delimiters: ['${', '}'],
    data: i_data,
    mounted:function(){
        //不同板厚多加50
        if (this.thick == 0.4 || this.thick > 2.0) {
            this.thickExtra =  price['price9'];
        }else if(this.thick == 2.5){
            this.thickExtra =  price['price10'];
        }else if(this.thick == 3.0){
            this.thickExtra =  price['price11'];
        }else{
            this.thickExtra = 0;
        }

        var url = document.URL
        var result = url.match(/[?&][^?&]+=?[^?&]+/g)
        if (result) {
            console.log(result)
            this.width = result[0].split('=')[1]
            this.height = result[1].split('=')[1]
            this.layer = result[2].split('=')[1]
            this.counts = result[3].split('=')[1]
            this.thick = result[4].split('=')[1]
        }
        this.mass();
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
        // 面积
        area: function(){
            console.log()
            return this.width * this.height * this.counts/10000 * (this.pbWidth >0 ? this.pbWidth : 1) * (this.pbHeight >0 ? this.pbHeight : 1)
        },
        // 板材费 长宽相同价格不变 0.38 0.05 
        bcFee:function(){
            if (this.area < 2) {
                if (this.layer == 1) {
                    return this.width * this.height * this.counts * price['price5']
                }else if(this.layer == 2){
                    return this.width * this.height * this.counts * price['price6']
                }else if(this.layer == 4){
                    return this.width * this.height * this.counts * price['price7']
                }else if(this.layer == 6){
                    return this.width * this.height * this.counts * price['price8']
                }
            }else{
                return 0
            }
        	
        },
        // 工程费 分50 250
        gcFee:function(){
            // 如果大于两平方不收工程费和测试费
            if (this.area >= 2) {
                return 0
            }
        	if (this.layer == 1) {
        		return price['price1']
        	}else if(this.layer == 2){
                return price['price2']
            }else if(this.layer == 4){
        		return price['price3']
        	}else if(this.layer == 6){
                return price['price4']
            }
        },
        // 四层算菲林费
        feilinFee:function(){
        	// if (this.layer == 4) {
        	// 	return this.width * this.height * 0.1
        	// }else{
        	// 	return 0
        	// }
        },
        // 批量总价
        massTotalFee:function(){
        	return (this.differLayer * this.area) + this.urgentFee 
           
        },
        // 普通总价
        generTotalFee:function(){
            console.log(this.bcFee,this.gcFee)
            return this.bcFee + this.gcFee + this.urgentFee +
                        this.thickExtra + this.price.copperFee +
                        this.price.sprayFee
        }
    },
    methods:{
        submit:function(){
            var data = {
                layer: this.layer,
                pattern: this.pattern,
                width: this.width,
                height: this.height,
                pbStyle: this.pbStyle,
                pbWidth: this.pbWidth,
                pbHeight: this.pbHeight,
                border: this.border,
                borderStyle: this.borderStyle,
                borderStyleStatus: this.borderStyleStatus,
                counts: this.counts,
                thick: this.thick,
                spray: this.spray,
                cover: this.cover,
                color: this.color,
                copper: this.copper,
                lineweight: this.lineweight,
                hole: this.hole,
                bga: this.bga,
                halfhole: this.halfhole,
                impedance: this.impedance,
                test: this.test,
                delivery: this.delivery,
                urgent: this.urgent, 
                bcFee: this.bcFee,
                gcFee: this.gcFee,
                urgentFee: this.urgentFee,
                thickExtra: this.thickExtra,
                copperFee: this.price.copperFee,
                sprayFee: this.price.sprayFee,
                colorFee:this.price.colorFee,
                testFee:this.price.testFee,
                totalFee: this.area >= 2 ? this.massTotalFee : this.generTotalFee
                // price:{
                //     bcFee: this.bcFee,
                //     gcFee: this.gcFee,
                //     urgentFee: this.urgentFee,
                //     thickExtra: this.thickExtra,
                //     copperFee: this.price.copperFee,
                //     sprayFee: this.price.sprayFee,
                //     colorFee:this.price.colorFee,
                //     testFee:this.price.testFee,
                //     totalFee: this.area >= 2 ? this.massTotalFee : this.generTotalFee
                //     bcFee: this.bcFee,
                // }  
            }
            $.post('/count/submit?_csrf='+ csrf,data,function(res){
                console.log('success')
                if (res) {
                    console.log('success');
                    window.location.href = '/order?orderId=' + res
                }
            })
            console.log(data)
        },
        submitStop:function(){
            alert('请先登录再操作')
            window.location.href = '/signin'
        },
        onLength:function(){
            // this.value=this.value.replace(/[^0-9]+/,'')
            if (this.area >= 2) {
                this.mass()
            }else{
                if (this.spray == '沉金') {
                    this.price.sprayFee =  price['price12']
                }
                if(this.copper == 2){
                    this.price.copperFee =  price['price13']
                }
            }
        },
        mass:function(){
                
             // 计算价格// 计算价格// 计算价格// 计算价格// 计算价格
             // 单面板
            // if(this.layer == 1 && this.thick == 1.6){
            //     switch(this.spray){
            //         case '有铅喷锡':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price20']
            //             else 
            //                 this.differLayer =  price['price17']
            //             break;
            //         case '无铅喷锡':
            //              this.differLayer =  price['price18']
            //             break;
            //         case '沉金':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price21']
            //             else   
            //                 this.differLayer =  price['price19']
            //             break;
            //     }
            // }else if(this.layer == 1 && this.thick == 2.0){
            //     switch(this.spray){
            //         case '无铅喷锡':
            //              this.differLayer =  price['price22']
            //             break;
            //         case '沉金':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price24']
            //             else
            //                 this.differLayer =  price['price23']
            //             break;
            //     }
            // }
          
            // if(this.layer == 2 && this.thick == 1.6){
            //     switch(this.spray){
            //         case '有铅喷锡':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price28']
            //             else if(this.halfhole == 1)
            //                 this.differLayer =  price['price31']
            //             else  this.differLayer =  price['price25']
            //             break;
            //         case '无铅喷锡':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price30']
            //             else
            //                 this.differLayer =  price['price26']
            //             break;
            //         case '沉金':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price29']
            //             else   
            //                 this.differLayer =  price['price27']
            //             break;
            //     }
            // }else if(this.layer == 2 && this.thick == 2.0){
            //     switch(this.spray){
            //         case '无铅喷锡':
            //              this.differLayer =  price['price22']
            //             break;
            //         case '沉金':
            //             if (this.copper == 2) 
            //                 this.differLayer =  price['price24']
            //             else
            //                 this.differLayer =  price['price23']
            //             break;
            //     }
            // }

            var spray1 = this.spray == '有铅喷锡';
            var spray2 = this.spray == '无铅喷锡';
            var spray3 = this.spray == '沉金';
            var copper = this.copper == 2
            console.log(spray1,spray2,spray3)
            if (this.layer == 1 && this.thick == 1.6 ) {
                if (spray1) 
                    this.differLayer =  price['price17']
                
                else if (spray2) 
                    this.differLayer =  price['price18']
                
                else if (spray3) 
                    this.differLayer =  price['price19']
                
                if (spray1 && copper) 
                    this.differLayer =  price['price20']
                
                if (spray3 && copper) 
                    this.differLayer =  price['price21']
                
            }
            else if (this.layer == 1 && this.thick == 2.0) {
                if (spray1) 
                    this.differLayer =  price['price22']
                
                else if (spray3) 
                    this.differLayer =  price['price23']
                
                if (spray3 && copper) 
                    this.differLayer =  price['price24']
                 
             }

            // 双面板
            if (this.layer == 2 && this.thick == 1.6) {
                if (spray1) 
                    this.differLayer =  price['price25']
                
                else if (spray2) 
                    this.differLayer =  price['price26']
                
                else if (spray3) 
                    this.differLayer =  price['price27']
                
                if (spray1 && copper) 
                    this.differLayer =  price['price28']
                
                if (spray3 && copper) 
                    this.differLayer =  price['price29']
                
                if (spray2 && copper) 
                    this.differLayer =  price['price30']
                
                if (spray1 && this.halfhole == 1) 
                    this.differLayer =  price['price31']
  
            }
            else if (this.layer == 2 && this.thick == 2.0) {
                if (spray1) 
                    this.differLayer =  price['price32']
                
                else if (spray2) 
                    this.differLayer =  price['price33']
                
                else if (spray3) 
                    this.differLayer =  price['price36']

                if (spray1 && copper) 
                    this.differLayer =  price['price34']
                
                if (spray2 && copper) 
                    this.differLayer =  price['price35']
                
                if (spray3 && copper) 
                    this.differLayer =  price['price37']
                  
            }
            // 四层板 1.6板厚 有铅喷锡 
             console.log( this.spray)
             if (this.layer == 4 && this.thick == 1.6) {
                if (spray1) 
                    this.differLayer =  price['price38']
                
                // 无铅喷锡
                else if (spray2) 
                    this.differLayer =  price['price39']
                
                // 沉金
                else if (spray3) 
                    this.differLayer =  price['price40']
                
                // 四层板 1.6板厚 外层2盎司 内层2盎司
                if (spray1 && copper) 
                    this.differLayer =  price['price41']
            }
            // 四层板 2.0板厚 
            else if (this.layer == 4 && this.thick == 2.0) {
                if (spray2) 
                    this.differLayer =  price['price42']
                
                else if (spray1) 
                    this.differLayer =  price['price43']
                
                else if (spray3) 
                    this.differLayer =  price['price44']
                
            }
            // 6层板占位
            if (this.layer == 6 && this.thick == 1.6) {
                this.differLayer =  price['price44']
            }
        }
    }

})