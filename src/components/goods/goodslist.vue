
<template>
    <div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="item in goodsList.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="subItem in item.subcates" :key="subItem.id">
                                                {{subItem.title}}&nbsp;
                                            </span>
                                            
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subItem in item.subcates" :key="subItem.id" href="/goods/43.html">{{subItem.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <!-- <ul class="slides">
                                    <li class="" style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 0; display: block; z-index: 1;">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/imgs/SJ4EgwosX0wTqvyAvhtFGT1w.jpg" draggable="false">
                                        </a>
                                    </li>
                                    <li style="width: 100%;height:100%; float: left; margin-right: -100%; position: relative; opacity: 1; display: block; z-index: 2;" class="flex-active-slide">
                                        <a href="/goods.html">
                                            <img style="width: 100%;height:100%;" src="http://39.108.135.214:8899/upload/201504/20/thumb_201504200314272543.jpg" draggable="false">
                                        </a>
                                    </li>
                                </ul>
                                <ol class="flex-control-nav flex-control-paging">
                                    <li>
                                        <a class="">1</a>
                                    </li>
                                    <li>
                                        <a class="flex-active">2</a>
                                    </li>
                                </ol> -->
                                 <!-- <el-carousel :interval="3000" type="card" height="200px"> -->
                                <el-carousel :interval="5000" arrow="always" height="341px">
                                    <el-carousel-item v-for="item in goodsList.sliderlist" :key="item.id">
                                        <img :src="item.img_url" alt="">
                                    </el-carousel-item>
                                </el-carousel>
                                    
                            </div>

                        </div>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in goodsList.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | moment}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="item in goodsData" :key="item.id">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="titleItem in item.level2catelist" :key="titleItem.id" href="/goods/43.html">{{titleItem.subcatetitle}}</a>
                    <!-- <a href="/goods/40.html">更多
                        <i>+</i>
                    </a> -->
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="dataItem in item.datas" :key="dataItem.artID">
                            <router-link :to="'/goodsinfo/'+dataItem.artID" class="">
                                <div class="img-box">
                                    <img v-lazy="dataItem.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{dataItem.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{dataItem.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{dataItem.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{dataItem.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
    .el-carousel__item img {
        width: 100%;
        height: 100%;
    }
</style>


<script>
    

    //默认导出
    export default {
        data(){
            return {
                goodsList:{},
                goodsData:[]
            }
        },
        created() {
            this.getGoodsList()
            this.getGoodsListData()
        },
        methods: {
            //获取轮播图和其左右的数据
            getGoodsList(){
                const url = `site/goods/gettopdata/goods`

                this.$axios.get(url).then(res=>{
                    // console.log(res.data)
                    this.goodsList = res.data.message
                })
            },
            //获取商品列表数据
            getGoodsListData(){
                const url = `site/goods/getgoodsgroup`

                this.$axios.get(url).then(res=>{
                    console.log(res.data)
                    this.goodsData = res.data.message
                })
            }
        }
    }

</script>

