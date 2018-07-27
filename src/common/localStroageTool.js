import { Object } from "core-js";

const key = 'goods'


// 返回保存在本地的商品信息对象
export const getLocalGoods=()=>{
    const localGoods = JSON.parse(localStorage.getItem(key) || "{}")
    return localGoods
}


// 获取localStorage中商品的总数量
export const getTotalCount=()=>{
    const localGoods = getLocalGoods()

    let totalCount = 0
    for(const key in localGoods){
        totalCount += localGoods[key]
    }
    return totalCount
}


//goodsObj = {goodsid:"87",count:2}   保存数据到本地
export const addLocalGoods = (goodsObj)=>{
    //最终保存的格式 {"87":5,"94":2}
    //获取第一次保存的数据，可能为空
    const localGoods = getLocalGoods()

    if(localGoods[goodsObj.goodsid]){//代表原先的对象中有该id
        localGoods[goodsObj.goodsid] += goodsObj.buyCount
    }else{
        localGoods[goodsObj.goodsid] = goodsObj.buyCount
    }

    //保存到本地中
    localStorage.setItem(key,JSON.stringify(localGoods))
    //返回加入之后的总数量
    return getTotalCount()
}


//goodsObj = {goodsid:"87",count:2}   保存数据到本地
//最终保存的格式 {"87":5,"94":2}
export const updateLocalGoods = (goodsObj)=>{
    //获取第一次保存的数据，可能为空
    const localGoods = getLocalGoods()
    // console.log(goodsObj)
    localGoods[goodsObj.goodsId] = goodsObj.count
    
    //保存到本地中
    localStorage.setItem(key,JSON.stringify(localGoods))
    //返回加入之后的总数量
    return getTotalCount()
}


export const deleteLocalGoods = (goodsId)=>{
    //获取第一次保存的数据，可能为空
    const localGoods = getLocalGoods()
    // console.log(goodsId)

    delete localGoods[goodsId]
    //保存到本地中
    localStorage.setItem(key,JSON.stringify(localGoods))
    //返回加入之后的总数量
    return getTotalCount()
    
}