<template>
    <div class="goods">
        <div class="content">
            <div class="menuWrap">
                <ul class="menulist">
                    <li class="menu" v-for="(good,index) in goods" :key="index">
                        <v-icon class="icon" v-if="good.type >=0" size="3" :type="good.type"></v-icon>
                        <span>{{good.name}}</span>
                    </li>
                </ul>
            </div>
            <div class="typeWrap"></div>
        </div>
        <div class="cart"></div>
    </div>
</template>

<script>
    import {mapState} from "vuex";
    export default {
        name: "goods",
        computed:{
            ...mapState(["goods"])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .goods
        flex 1
        display flex
        flex-direction column
        overflow hidden
        .content
            flex 1
            display flex
            overflow hidden
            .menuWrap
                flex-basis 80px
                .menulist
                    .menu
                        one-px(rgba(7,17,27,.1))
                        height 54px
                        background #f3f5f7
                        font-size 12px
                        display flex
                        justify-content center
                        align-items center
                        .icon
                            margin-right 3px
            .typeWrap
                flex 1
        .cart
            flex-basis 50px

</style>