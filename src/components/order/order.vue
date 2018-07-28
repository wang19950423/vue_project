
<template>
    <div>
         <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li class="active">
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    <div class="cart-box">
                        <h2 class="slide-tit">
                            <span>1、收货地址</span>
                        </h2>
                        <div id="orderForm" name="orderForm" url="">
                            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
                                <el-form-item style="margin-top:30px" label="收货人姓名 : " prop="accept_name">
                                    <el-input style="width:500px" v-model="ruleForm.accept_name"></el-input>
                                </el-form-item>
                                <el-form-item style="margin-top:30px" label="所属地区 : " prop="area">
                                    <v-distpicker :province="ruleForm.area.province.value" :city="ruleForm.area.city.value" :area="ruleForm.area.area.value"></v-distpicker>
                                </el-form-item>
                                <el-form-item label="详细地址 : " prop="address">
                                    <el-input style="width:500px" v-model="ruleForm.address"></el-input>
                                </el-form-item>
                                <el-form-item label="手机号码 : " prop="mobile">
                                    <el-input style="width:500px" v-model="ruleForm.mobile"></el-input>
                                </el-form-item>
                                <el-form-item label="电子邮箱 : " prop="email">
                                    <el-input style="width:500px" v-model="ruleForm.email"></el-input>
                                </el-form-item>
                                <el-form-item label="邮政编码 : " prop="post_code">
                                    <el-input style="width:150px" v-model="ruleForm.post_code"></el-input>
                                </el-form-item>
                            </el-form>
                            <h2 class="slide-tit">
                                <span>2、支付方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio v-model="ruleForm.payment_id" label="6">在线支付 <em>手续费：0.00元</em></el-radio>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>3、配送方式</span>
                            </h2>
                            <ul class="item-box clearfix">
                                <!--取得一个DataTable-->
                                <li>
                                    <el-radio-group @change="changePrice" v-model="ruleForm.express_id">
                                        <el-radio label="1">顺丰快递 <em>费用：20.00元</em> </el-radio>
                                        <el-radio label="2">圆通快递 <em>费用：10.00元</em></el-radio>
                                        <el-radio label="3">韵达快递 <em>费用：8.00元</em></el-radio>
                                    </el-radio-group>
                                </li>
                            </ul>
                            <h2 class="slide-tit">
                                <span>4、商品清单</span>
                            </h2>
                            <div class="line15"></div>
                            <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                <tbody>
                                    <tr>
                                        <th colspan="2" align="left">商品信息</th>
                                        <th width="84" align="left">单价</th>
                                        <th width="84" align="center">购买数量</th>
                                        <th width="104" align="left">金额(元)</th>
                                    </tr>
                                    <tr v-for="item in orderData" :key="item.id">
                                        <td width="68">
                                            <a target="_blank" href="/goods/show-89.html">
                                                <img :src="item.img_url" class="img">
                                            </a>
                                        </td>
                                        <td>
                                            <a target="_blank" href="/goods/show-89.html">{{item.title}}</a>
                                        </td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.sell_price}}
                                            </span>
                                        </td>
                                        <td align="center">{{item.buycount}}</td>
                                        <td>
                                            <span class="red">
                                                ￥{{item.totalamount}}
                                            </span>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div class="line15"></div>
                            <h2 class="slide-tit">
                                <span>5、结算信息</span>
                            </h2>
                            <div class="buy-foot clearfix">
                                <div class="left-box">
                                    <dl>
                                        <dt>订单备注(100字符以内)</dt>
                                        <dd>
                                            <textarea name="message" class="input" v-model="ruleForm.message" style="height:35px;"></textarea>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="right-box">
                                    <p>
                                        商品
                                        <label class="price">{{totalCount}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                        <label id="goodsAmount" class="price">{{totalPrice}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                    </p>
                                    <p>
                                        运费：￥
                                        <label id="expressFee" class="price">{{ruleForm.expressMoment}}</label> 元
                                    </p>
                                    <p class="txt-box">
                                        应付总金额：￥
                                        <label id="totalAmount" class="price">{{orderPrice}}</label>
                                    </p>
                                    <p class="btn-box">
                                        <router-link to="shopcart" class="btn button" >返回购物车</router-link>
                                        <input id="btnSubmit" @click="toPayOrder" name="btnSubmit" type="submit" value="确认提交" class="btn submit">
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>


<script>
import { getLocalGoods } from "../../common/localStroageTool.js";
import VDistpicker from "v-distpicker";

export default {
  data() {
    /**
     * rule 检验对象
     * value 用户输入的要校验的原始值
     * callback 回调，决定是否校验成功
     */
    const isMobile = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号码不能为空"));
      }

      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
      if (!myreg.test(value)) {
        callback(new Error("请输入正确电话号码"));
      } else {
        callback();
      }
    };
    return {
      orderData: {}, //下单的商品数据
      totalCount: 0, //下单的商品的件数
      totalPrice: 0, //下单的商品的总价
      ruleForm: {
        accept_name: "伊泽", //用户名
        address: "北京市朝阳区朝阳街道5号", //地址
        area: {
          province: { code: 440000, value: "广东省" },
          city: { code: 440300, value: "深圳市" },
          area: { code: 440306, value: "宝安区" }
        },
        mobile: "13698682595", //电话
        email: "shehuiwang@163.com", //邮箱
        post_code: "440000", //邮编
        payment_id: "6", //默认在线支付
        express_id: "1", //运送的方式
        message: "请尽快安排", //备注
        expressMoment: 20, //快递的费用
        goodsAmount: 0, //商品总价(包含运费)
        goodsids: {},
        cargoodsobj: {}
      },
      rules: {
        accept_name: [
          { required: true, message: "请输入收货人名字", trigger: "blur" }
        ],
        area: [
          { required: true, message: "请输入收货人地址", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入收货人详细地址", trigger: "blur" }
        ],
        mobile: [{ required: true, validator: isMobile, trigger: "blur" }]
      }
    };
  },
  created() {
    this.getOrderList();
  },
  components: {
    VDistpicker
  },
  computed: {
    orderPrice() {
      return this.totalPrice + this.ruleForm.expressMoment;
    }
  },
  methods: {
    //获取订单信息
    getOrderList() {
      const localGoods = getLocalGoods();
      //   console.log(localGoods);
      //提交订单去结账要的ids
      this.ruleForm.goodsids = this.$route.query.ids;
      const url = `site/validate/order/getgoodslist/${this.$route.query.ids}`;

      const temObj = {};

      this.$axios.get(url).then(res => {
        let temCount = 0
        let temPrice = 0
        console.log(res.data.message);

        res.data.message.forEach(item => {
          item.buycount = localGoods[item.id];
          item.totalamount = localGoods[item.id] * item.sell_price;

          temObj[item.id] = item.buycount;
            
          //商品总件数
          temCount += item.buycount
          //商品总价
          temPrice += item.buycount * item.sell_price;
        });
        // console.log(temObj);
        //提交订单去结账要的参数
        this.totalCount = temCount
        this.totalPrice = temPrice
        this.ruleForm.goodsAmount = temPrice;
        this.ruleForm.cargoodsobj = temObj;

        this.orderData = res.data.message;
      });
    },
    //改变快递费用
    changePrice(label) {
      // console.log(label)
      switch (label) {
        case "1":
          this.ruleForm.expressMoment = 20;
          break;
        case "2":
          this.ruleForm.expressMoment = 10;
          break;
        case "3":
          this.ruleForm.expressMoment = 8;
          break;
        default:
          break;
      }
    },
    //去支付页面
    toPayOrder() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          const url = `site/validate/order/setorder`
          console.log(this.ruleForm)
          this.$axios.post(url,this.ruleForm).then(res=>{
            //   console.log(res.data)
            if(res.data.status != 0){
                this.$message.error(res.data.message)
                return
            }

            this.$router.push({path:'payOrder',query:{orderid:res.data.message.orderid}})
            //2.清空已经结算的本地数据
            const ids = this.$route.query.ids.split(',')
            
            // console.log(ids)
            ids.forEach(id=>{
                this.$store.commit('deleteGoods',id)
            })
            // this.getOrderList()
          })
        } else {
          this.$message.error('请完善提交信息')
        }
      });
    }
  }
};
</script>
