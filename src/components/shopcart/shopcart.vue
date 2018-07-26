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
                                <li>
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
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <a>选择</a>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-for="item in shopData" :key="item.id">
                                    <td width="48" align="center">
                                        <el-switch
                                            v-model="item.isSelected"
                                            active-color="#409eff"
                                            inactive-color="#555555">
                                        </el-switch>
                                    </td>
                                    <td align="left" colspan="2">
                                        <div class="shopInfo">
                                            <img :src="item.img_url" alt="" style="width: 50px; height: 50px; margin-right: 10px;">
                                            <span>{{item.title}}</span>
                                        </div>
                                    </td>
                                    <td width="84" align="left">{{item.sell_price}}</td>
                                    <td width="104" align="center">
                                        <inputnumber :initCount="item.buycount"></inputnumber>
                                    </td>
                                    <td width="104" align="left">{{item.sell_price * item.buycount}}</td>
                                    <td width="54" align="center">
                                        <a href="javascript:void(0)">删除</a>
                                    </td>
                                </tr>
                                <tr v-if="shopData.length==0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{getTotalCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getTotalPrice}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" onclick="formSubmit(this, '/', '/shopping.html');">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
    </div>
  </div>

</template>

<style scoped>
    .shopInfo{
        display: flex;
        align-items: center;
    }
</style>


<script>
    import {getLocalGoods} from '../../common/localStroageTool.js'
    import inputnumber from '../subcomponents/inputnumber.vue'
    import axios from 'axios'
    const baseUrl = "http://47.106.148.205:8899/";
    
    export default {
        data(){
            return{
                shopData:[],
            }
        },
        created() {
            this.getShopData()
        },
        components:{
            inputnumber
        },
        computed:{
            //计算商品总件数
            getTotalCount(){
                let toTalCount = 0
                this.shopData.forEach(item=>{
                    if(item.isSelected){
                        toTalCount += item.buycount
                    }
                })
                return toTalCount
            },
            //计算商品总价格
            getTotalPrice(){
                let totalPrice = 0
                this.shopData.forEach(item=>{
                    if(item.isSelected){
                        totalPrice += item.buycount * item.sell_price
                    }
                })
                return totalPrice
            }
        },
        methods:{
            getShopData(){
                const localGoods = getLocalGoods()
                console.log(localGoods)
                
                // let temArray = []
                // for(const key in localGoods){
                //     temArray.push(key)
                // }                             //使用还是要join一下
                // console.log(temArray)

                let temArray = Object.keys(localGoods).join(',')
                // console.log(temArray)

                const url = `${baseUrl}site/comment/getshopcargoods/${temArray}`
                axios.get(url).then(res=>{
                    console.log(res.data.message)
                    //添加开关状态
                    res.data.message.forEach(element => {
                        //给buycount添加商品数量
                        element.buycount = localGoods[element.id]
                        //让开关默认是开着的
                        element.isSelected = true
                    });
                    this.shopData = res.data.message
                })

            }
        }
    }

</script>
