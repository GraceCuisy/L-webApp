<template>
    <div>
        <div class="cart">
            <div class="left" style="color: white" @click="foldFn">
                <div class="icon">
                    <div class="logo" :class="{active:totalPrice>0}">
                        <i class="icon-shopping_cart"></i>
                    </div>
                    <span class="qipao" v-show="totalCount>0">{{totalCount}}</span>
                </div>
                <div class="totalPrice" :class="{active:totalPrice>0}">
                    <span>¥{{totalPrice}}</span>
                </div>
                <div class="deliveryPrice">
                    <span>另需配送费¥{{seller.deliveryPrice}}元</span>
                </div>
            </div>
            <div class="right" :class="{active:totalPrice >= seller.minPrice}">
                <span>{{rightText}}</span>
            </div>
        </div>
        <div class="list" v-show="showList">
            <div class="header">
                <span class="cartText">购物车</span>
                <span class="clear" @click="clear">清空</span>
            </div>
            <div class="content" ref="cartContent">
                <ul>
                    <li class="item" v-for="selectedFood in selectedFoods">
                        <span class="left"> {{selectedFood.name}} </span>
                        <div class="right">
                            <span class="price">{{selectedFood.price * selectedFood.count}}</span>
                            <v-contorl class="contorl" :food="selectedFood" ></v-contorl>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="mask" v-show="showList" @click="fold=true" ></div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    import contorl from "components/contorl/contorl";
    import BScroll from "better-scroll";
    export default {
        name: "ele-cart",
        props:{
            selectedFoods:Array
        },
        data(){
          return {
              fold:true //购物车列表是否折叠
          }
        },
        computed:{
            ...mapState(["seller"]),
            //购物车中食物的总数量
            totalCount(){
                return this.selectedFoods.reduce((adder,item)=>{
                    return adder += item.count
                },0)
            },
            //购物车的总价格
            totalPrice(){
                return this.selectedFoods.reduce((adder,item)=>{
                    return adder += item.count*item.price
                },0)
            },
            //购物车结算按钮的文案
            rightText(){
                if(this.totalPrice === 0){
                    return `¥${this.seller.minPrice}起送`
                }else if (this.totalPrice < this.seller.minPrice){
                    return `还差¥${this.seller.minPrice - this.totalPrice}起送`
                }else {
                    return `去结算`
                }
            },
            //代表list & mask 是否需要显示
            showList(){
                if(this.totalCount <= 0){
                    this.fold = true;
                    return false;
                }

                //在每一次showlist值被改变的时候触发滑屏的初始化
                if(!this.Scroll){
                    this.Scroll = new BScroll(this.$refs.cartContent)
                }else {
                    //重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
                    //可以不用重新创建一个新的BScroll
                    this.Scroll.refresh()
                }

                return !this.fold;
            }
        },
        components:{
            "v-contorl":contorl
        },
        methods:{
            clear(){
                //清空购物车数据
                this.$emit("clear")
            },
            foldFn(){
                /*
                    当购物车中数据为0时;我们在点击购物车按钮时 不应该让fold产生变化
                    限制当前这个细节:
                        用户点击了购物车 让fold状态变为false(未折叠)
                        用户点击了+号按钮
                */

                //在这种方法中 我们只是单方面的修改fold 那一定要长个心眼
                //维护好fold 与 showlist互拆关系
                if(this.totalCount <= 0){
                    return
                }
                this.fold = !this.fold
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .cart
        position fixed
        z-index 3
        bottom 0
        left 0
        height 46px
        width 100%
        background #141d27
        display flex
        .left
            flex 1
            height 100%
            display flex
            .icon
                position relative
                bottom 15px
                width 56px
                height 56px
                border-radius 50%
                background #141d27
                margin-left 12px
                margin-right 12px
                display flex
                justify-content center
                align-items center
                .logo
                    display flex
                    justify-content center
                    align-items center
                    width 44px
                    height 44px
                    border-radius 50%
                    background rgba(255,255,255,0.4)
                    &.active
                        background rgba(0,160,220,1)
                        i
                            color white
                    i
                        color rgba(255,255,255,0.4)
                .qipao
                    position absolute
                    right 0
                    top 5px
                    width 24px
                    height 16px
                    line-height 16px
                    border-radius 6px
                    background red
                    font-size 9px
                    font-weight 700
                    text-align center
            .totalPrice
                display flex
                justify-content center
                align-items center
                margin-right 12px
                font-size 16px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                &.active
                    color white
            .deliveryPrice
                display flex
                justify-content center
                align-items center
                font-size 14px
                line-height 24px
                font-weight 700
                color rgba(255,255,255,.4)
                padding-left 12px
                border-left 2px solid rgba(255,255,255,0.1)
        .right
            flex 0 0 105px
            height 100%
            background rgba(255,255,255,0.4)
            display flex
            justify-content center
            align-items center
            &.active
                background green
                span
                    color white
            span
                color rgba(255,255,255,0.6)
    .list
        max-height 255px
        position fixed
        z-index 2
        left 0
        bottom 45px
        width 100%
        background #f3f5f1
        padding-bottom 20px
        .header
            one-px(rgba(7,17,27,.1))
            height 40px
            background #f3f5f7
            display flex
            justify-content space-between
            align-items center
            .cartText
                margin-left 18px ;
                color rgba(7,17,27,1);
                font-weight 800
                font-size 14px
            .clear
                margin-right 18px
                color rgba(0,160,220,1);
                font-weight 800
                font-size 14px

        .content
            max-height 195px
            overflow hidden
            .item
                one-px(rgba(7,17,27,.1))
                display flex
                height 48px
                align-items center
                justify-content space-between
                .left
                    padding-left 18px
                .right
                    display flex
                    align-items center
                    padding-right  22px
                    .price
                        margin-right 12px
                        color rgba(240,20,20,1)
                        font-size 10px
                        font-weight 700
    .mask
        position fixed
        z-index 1
        left 0
        right 0
        top 0
        bottom 0
        background rgba(7,17,27,.6)
        backdrop-filter blur(5px)
</style>