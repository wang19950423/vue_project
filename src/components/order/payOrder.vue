<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{payOrderData.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{payOrderData.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{payOrderData.area}} {{payOrderData.address}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{payOrderData.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{payOrderData.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{payOrderData.message}}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <img id="imgLogo" src="../../statics/site/images/alipay.png" hidden>

                                <div id="container2">
                                    <canvas width="300" height="300"></canvas>
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
import "../../statics/site/js/qrcode/qrcode.js";
// import Vue from 'vue'

export default {
  data() {
    return {
      payOrderData: {}
    };
  },
  created() {
    this.getPayOrder();
  },
  methods: {
    getPayOrder() {
      const url = `site/validate/order/getorder/${this.$route.query.orderid}`;

      this.$axios.get(url).then(res => {
          console.log(res.data.message)
        this.payOrderData = res.data.message[0];
      });
    }
  },
  mounted() {
    //图片logo
    // setTimeout(() => {
    //   $("#container2").erweima({
    //     text: "https://www.baidu.com",
    //     mode: 4,
    //     mSize: 30,
    //     image: $("#imgLogo")[0]
    //   });
    // }, 0);
    // Vue.nextTick(() => {
    //   $("#container2").erweima({
    //     text: "https://www.baidu.com",
    //     mode: 4,
    //     mSize: 30,
    //     image: $("#imgLogo")[0]
    //   });
    // });
    this.$nextTick(() => {
      $("#container2").erweima({
        text: "https://www.baidu.com",
        mode: 4,
        mSize: 30,
        image: $("#imgLogo")[0]
      });
    });
  }
};
</script>
