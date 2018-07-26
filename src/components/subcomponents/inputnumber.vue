<template>
    <div>
        <div class="sub">-</div>
        <div class="number">{{count}}</div>
        <div class="add">+</div>
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
            }
        },
        data(){
            return{
                count:0
            }
        },
        created() {
            this.count = this.initCount
        },
    }

</script>
