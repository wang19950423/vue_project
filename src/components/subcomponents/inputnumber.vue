<template>
    <div>
        <div class="sub" @click="sub">-</div>
        <div class="number">{{count}}</div>
        <div class="add" @click="add">+</div>
    </div>
</template>

<style scoped>
    .sub,.number,.add {
        display: inline-block;
        width: 30px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid rgba(92,92, 92, 0.3);
    }
</style>


<script>
    
    export default {
        // props:['initialCounter']
        props:{
            initCount:{
                type: Number,
                default: 100
            },
            goodsId:Number
        },
        data(){
            return{
                count:0
            }
        },
        created() {
            this.count = this.initCount
        },
        methods:{
            sub(){
                if(this.count<=1){
                    return
                }
                this.count--
                this.notify()
            },
            add(){
                this.count++
                this.notify()
            },
            notify(){
                const goods = {
                    goodsId:this.goodsId,
                    count:this.count
                }
                this.$emit("changeNumber",goods)
            }
        }
    }

</script>
