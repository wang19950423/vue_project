
import Vue from 'vue'
import VueRouter from 'vue-router';
import ElementUI from 'element-ui';
import moment from 'moment'
import VueLazyload from 'vue-lazyload'
import Vuex from 'vuex'



//集成中间件/插件【注意：必须是基于Vue的】
Vue.use(VueRouter)
Vue.use(ElementUI);
Vue.use(VueLazyload,{
    loading:"http://img.lanrentuku.com/img/allimg/1212/5-121204193R0-50.gif"
})
Vue.use(Vuex)


//导入根组件
import App from './App.vue'

//导入全局样式
import './statics/site/css/style.css'
import 'element-ui/lib/theme-chalk/index.css';



//时间格式化moment函数
Vue.filter('moment', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD';
    // return moment(value).format(formatString); // value可以是普通日期 20170723
    return moment(value).format(formatString); // 这是时间戳转时间
});

//路由相关
//默认导入 ，如果 goodslist加了 {}，就称之为按需导入
import goodslist from './components/goods/goodslist.vue'
import shopcart from './components/shopcart/shopcart.vue'
import goodsinfo from './components/goods/goodsinfo.vue'


const router = new VueRouter({
    routes:[
        {path:'/',redirect:'/goodslist'},
        {path:'/goodslist',component:goodslist},
        {path:'/goodsinfo/:goodsid',component:goodsinfo},
        {path:'/shopcart',component:shopcart}
    ]
})
//按需导入
import {addLocalGoods,getTotalCount,getLocalGoods} from './common/localStroageTool.js'
const store = new Vuex.Store({
    state:{
        shopCount:0//加入购物车中的商品总数量，用在layout.vue的头部的购物车那个徽标上面
    },
    getters:{
        getBuyCount(state){
            if(state.shopCount>0){
                return state.shopCount
            }else{
                return getTotalCount()
            }
        }
    },
    mutations:{
        addGoods(state,goods){
            state.shopCount = addLocalGoods(goods)
        }
    }
})

new Vue({
    el:'#app',
    router,
    store,
    render:function(createElement){
        return createElement(App)
    }
})
