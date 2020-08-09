<template>
    <div class="contorl">
        <div class="contorl">
            <transition name="contorlRemove">
                <i v-show="food.count>0"
                   class="icon-remove_circle_outline remove"
                   @click="remove(food)" ></i>
            </transition>
            <transition name="contorlRemove">
                <span v-show="food.count" class="remove">{{food.count}}</span>
            </transition>
            <i class="icon-add_circle add" @click="add(food)"></i>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ele-contorl",
        props:{
            food:Object
        },
        methods:{
            //让对应的food 用户选中的数量加1 减1
            add(food){this.$bus.$emit("add",food)},
            remove(food){this.$bus.$emit("remove",food)}
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"
    .contorl
        justify-content center
        align-items center
        display inline-flex
        i
            display inline-block
            font-size 24px
            vertical-align middle
            color rgba(0,160,220,1)
            &.add
                position relative
                z-index: 1
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-360deg)
        span
            display inline-block
            width 24px
            text-align center
            font-size 10px
            vertical-align middle
            color rgba(147,153,159,1)
            &.remove
                opacity 1
                transform translate3d(0,0,0) rotate(-360deg)
</style>