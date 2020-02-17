<template>
    <div class="player">
        <transition name="normal">
            <div class="normal-player" v-show="fullPage">
                <div class="background-filter">
                    <img :src="currentPlayingSong.image">
                </div>
                <header class="header">
                    <div class="icon" @click="closeFullPage">
                        <i class="icon-back"></i>
                    </div>
                    <div class="title-wrapper">
                        <h1 class="title">{{currentPlayingSong.name}}</h1>
                        <h2 class="sub-title">{{currentPlayingSong.singer}}</h2>
                    </div>
                </header>
                <main class="main">
                    <div class="cd-wrapper">
                        <div class="cd">
                            <img class="cd-img" :src="currentPlayingSong.image"/>
                        </div>
                    </div>
                </main>

                <div class="bottom">
                    <div class="opeerations-wrapper">
                        <div class="icon-operation">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon-operation">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon-operation icon-play-pause">
                            <i class="icon-play"></i>
                        </div>
                        <div class="icon-operation ">
                            <i class="icon-next"></i>
                        </div>
                        <div class="icon-operation">
                            <i class="icon-playlist"></i>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
        <transition name="mini">
            <div class="mini-player" v-show="!fullPage && Object.keys(currentPlayingSong).length">
                <div class="info-wrapper" @click="openFullPage">
                    <img :src="currentPlayingSong.image"/>
                    <span>{{currentPlayingSong.name}} - {{currentPlayingSong.singer}}</span>
                </div>
                <div class="icon-opeartion-wrapper">
                    <div class="icon-operation">
                        <i class="icon icon-play"></i>
                    </div>
                    <div class="icon-operation">
                        <i class="icon icon-playlist"></i>
                    </div>
                    
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
export default {
    computed: {
        ...mapGetters(['fullPage','currentPlayingSong'])
    },
    methods: {
        closeFullPage() {
            this.setFullpage(false)
        },
        openFullPage() {
            this.setFullpage(true)
        },
        ...mapMutations({
            setFullpage: 'SET_FULLPAGE_STATE'
        })
    }
}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin'
    .normal-player
        position fixed 
        top 0
        bottom 0
        left 0
        right 0
        background $color-background
        z-index 1000
        .background-filter
            width 100%
            height 100%
            position: absolute
            left 0
            top  0
            z-index -1
            img 
                width 100%
                height 100%
                opacity 0.6
                filter blur(20px)
        .header
            display flex
            .icon
                width 0.4rem
                height 0.4rem
                font-size 20px
                text-align center
                line-height 0.4rem
                transform: rotate(-90deg)
            .title-wrapper
                margin-left 4px
                margin-top 4px
                .title
                    line-height 0.24rem
                    font-size 16px
                    no-wrap()
                .sub-title
                    line-height 0.14rem
                    font-size 13px
        .main
            position fixed
            width 100%
            top 1rem
            // bottom 0.6rem
            .cd-wrapper
                width 100%
                .cd
                    width 76%
                    margin 0 auto
                    height 100%
                    text-align center
                    animation rotate 24s infinite linear
                    img 
                        width 100%
                        border: 10px solid hsla(0,0%,100%,.1)
                        border-radius 50%
                        box-sizing border-box
                        
        .bottom
            position fixed
            bottom 0
            width 100%
            height 0.9rem
            display flex
            align-items center
            .opeerations-wrapper
                width 80%
                margin 0 auto
                display flex
                justify-content space-between
                align-items center
                font-size 28px
                .icon-play-pause
                    font-size 50px
    .mini-player
        position fixed
        bottom 0
        width 100%
        display flex
        justify-content space-between
        align-items center
        background white
        .info-wrapper
            display flex
            align-items center
            margin-left 6px
            img 
                width 40px
                border-radius 50%
            span 
                margin-left 6px
                font-size $font-size-small
                height 11px
                nowrap()
        .icon-opeartion-wrapper
            display flex
            align-items center
            color $color-theme
            .icon-operation
                padding 5px
                .icon
                    font-size $font-size-large-xx
    .normal-enter-active, .normal-leave-active
        // transition opacity 10s
        transition all 0.5s
        .header, .bottom, .cd-wrapper
            transition all 0.5s
    .normal-enter, .normal-leave-to
        opacity 0
        // transform translate3d(0, 100%, 0)
        .header
            transform translate3d(0,-100%,0)
        .bottom
            transform translate3d(0, 100%, 0)
        .cd-wrapper
            transform translate3d(-18%, 100%, 0)
    .mini-enter-active, .mini-leave-active
        transition all .5s
    .mini-enter, .mini-leave-to
        opacity 0
    @keyframes rotate {
        0% {
            transform: rotate(0)
        }
        100% {
            transform: rotate(360deg)
        }
    }
</style>