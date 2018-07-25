<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925" v-if="goodsDetailData.goodsinfo">
                        <div class="goods-box clearfix">
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsDetailData.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsDetailData.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsDetailData.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsDetailData.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsDetailData.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsDetailData.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <el-input-number v-model="buyCount" :min="1" :max="goodsDetailData.goodsinfo.stock_quantity" ></el-input-number>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsDetailData.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="addToShopCart" ref="addToShop" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="showIntroduce(true)" href="javascript:void(0);" :class="isShowContent ?'selected':''">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="showIntroduce(false)" href="javascript:void(0);" :class="!isShowContent ?'selected':''">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div v-show="isShowContent" class="tab-content entry" style="display: block;">
                                <span v-html="goodsDetailData.goodsinfo.content"></span>
                            </div>
                            <div v-show="!isShowContent" class="tab-content" style="display: block;">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm"
                                        class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" ref="textAreaRef" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="postComment" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="commentData.totalcount<=0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item,index) in commentData.message" :key="index">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time | moment('YYYY-MM-DD hh:mm:ss')}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                        
                                    </ul>
                                    <div v-if="commentData.totalcount>0" class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <el-pagination 
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-sizes="[1, 5, 10, 20]"
                                        :page-size="pageSize"
                                        layout="total, sizes, prev, pager, next, jumper"
                                        :total="commentData.totalcount">
                                        </el-pagination>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsDetailData.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">
                                                <img :src="item.img_url">
                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsinfo/'+item.id" class="">{{item.title}}</router-link>
                                            <span>{{item.add_time | moment}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <transition
            v-on:before-enter="beforeEnter"
            v-on:enter="enter"
            v-on:after-enter="afterEnter"
        >
            <div v-show="isShowImg" class="animationImg" id="animationId" v-if="goodsDetailData.imglist">
                <img width="100%" height="100%" :src="goodsDetailData.imglist[0].thumb_path" alt="">
            </div>
        </transition>
    </div>
    
</template>

<style>
@import "../../statics/site/js/jqimgzoom/css/magnifier.css";
img {
  vertical-align: top;
}
.animationImg {
  border: 1px solid rgba(92, 92, 92, 0.3);
  width: 40px;
  height: 40px;
  position: absolute;
  transition: all 0.8s;
}
</style>


<script>
import "../../statics/site/js/jqimgzoom/js/magnifier.js";
import axios from "axios";
import { Affix } from "iview";

const baseUrl = "http://47.106.148.205:8899/";

export default {
  data() {
    return {
      goodsDetailData: {}, //商品图片等信息
      isShowContent: true, //评论和介绍的切换
      currentPage: 1, //也码
      pageSize: 5, //页容量
      commentData: {}, //评论数据
      buyCount: 1, //购买的数量
      addToShopCartOffset: null, //动画开始时候的top、left
      isShowImg: false
    };
  },
  watch: {
    $route: function() {
      this.getGoodsDetail();
      this.getCommentData();
    }
  },
  created() {
    this.getGoodsDetail();
    this.getCommentData();
  },
  mounted() {
    setTimeout(() => {
      //1.0 给动画的起始位置赋值
      this.addToShopCar = $(this.$refs.addToShop).offset();
      //2.0 设置要动画图片的位置
      $("#animationId")
        .css("left", this.addToShopCar.left + "px")
        .css("top", this.addToShopCar.top + "px");

      this.shoppingCartCount = $("#shoppingCartCount").offset();
    }, 500);
  },
  components: {
    Affix: Affix
  },
  methods: {
    //根据id获取数据
    getGoodsDetail() {
      const url = `${baseUrl}site/goods/getgoodsinfo/${
        this.$route.params.goodsid
      }`;
      axios.get(url).then(res => {
        // console.log(res.data.message);
        this.goodsDetailData = res.data.message;

        setTimeout(() => {
          $("#magnifier1").imgzoon({ magnifier: "#magnifier1" });
        }, 200);
      });
    },
    //商品品论和商品介绍的切换
    showIntroduce(isShow) {
      this.isShowContent = isShow;
    },
    //分页评论数据
    getCommentData() {
      const url = `${baseUrl}site/comment/getbypage/goods/${
        this.$route.params.goodsid
      }?pageIndex=${this.currentPage}&pageSize=${this.pageSize}`;
      axios.get(url).then(res => {
        // console.log(res.data.message)
        this.commentData = res.data;
      });
    },
    //更改分页容量
    handleSizeChange(size) {
      this.pageSize = size;
      this.getCommentData();
    },
    //更改页码
    handleCurrentChange(currentPage) {
      this.currentPage = currentPage;
      this.getCommentData();
    },
    //提交评论
    postComment() {
      const commenttxt = this.$refs.textAreaRef.value;
      // console.log(commenttxt)
      if (commenttxt.trim().length == 0) {
        this.$message({
          message: "评论内容不能为空",
          type: "warning"
        });
        return;
      }
      const url = `${baseUrl}site/validate/comment/post/goods/${
        this.$route.params.goodsid
      }`;
      axios.post(url, { commenttxt }).then(res => {
        if (res.data.status == 1) {
          this.$message.error(res.data.message);
          return;
        }
        //清空输入框内容
        this.$refs.textAreaRef.value = " ";
        this.currentPage = 1;
        this.getCommentData();
      });
    },
    //加入购物车
    addToShopCart() {
        this.isShowImg = true
    },
    //购物车动画钩子函数
    beforeEnter: function(el) {
         //设置动画的起始位置
                el.style.left = `${this.addToShopCar.left}px`
                el.style.top = `${this.addToShopCar.top}px`
    },
    enter: function(el, done) {
        // 刷新针
                el.offsetWidth
                // 设置结束位置
                el.style.left = `${this.shoppingCartCount.left}px`
                el.style.top = `${this.shoppingCartCount.top}px`
                done()
    },
    afterEnter: function(el) {
        this.isShowImg = false
    }
  }
};
</script>