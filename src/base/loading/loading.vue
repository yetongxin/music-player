<template>
    <div class="loading">
        <img width="24" height="24" src="./loading.gif">
        <span class="text">{{loadingText}}</span>
    </div>
</template>

<script>
export default {
    props: {
        loadingText: {type: String, default: 'loading...'}
    }

}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable.styl";
    
    .loading
        width 100%
        text-align center
        display flex
        justify-content center
        align-items center
        .text
            margin-left 0.08rem
            color: $text-clo-b

</style>