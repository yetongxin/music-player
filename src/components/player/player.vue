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
                        <div class="cd playing" :class="playing?'':'pause'">
                            <img class="cd-img" :src="currentPlayingSong.image"/>
                        </div>
                    </div>
                </main>

                <div class="bottom">
                    <div class="opeerations-wrapper">
                        <div class="icon-operation">
                            <i class="icon-sequence"></i>
                        </div>
                        <div class="icon-operation" @click.stop="playPre">
                            <i class="icon-prev"></i>
                        </div>
                        <div class="icon-operation icon-play-pause" @click.stop="toggolePlayingState">
                            <i :class="playing ? 'icon-pause':'icon-play'"></i>
                        </div>
                        <div class="icon-operation " @click.stop="playNext">
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
                    <div class="icon-operation" @click="toggolePlayingState">
                        <i class="icon" :class="playing ? 'icon-pause':'icon-play'"></i>
                    </div>
                    <div class="icon-operation">
                        <i class="icon icon-playlist"></i>
                    </div>
                    
                </div>
            </div>
        </transition>
        <audio :src="playSongUrl" 
                @canplay="canplay"
                @error="onAudioError"
                @timeupdate="onTimeUpdate" 
                ref="audio"
        >
        </audio>
    </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import * as MUTATION_TYPES from '@/store/mutation-types'
export default {
    data() {
        return {
            readyToPlay: false
        }
    },
    computed: {
        ...mapGetters([
            'fullPage',
            'currentPlayingSong',
            'playing',
            'playSongUrl',
            'currentPlayIndex',
            'sequenceList'
        ])
    },
    watch: {
        playing(newPlaying) {
            if(!this.readyToPlay) {
                return;
            }
            if(newPlaying) {
                this.$refs.audio.play()
            } else {
                this.$refs.audio.pause()
            }
        }
    },
    methods: {
        closeFullPage() {
            this.setFullpage(false)
        },
        openFullPage() {
            this.setFullpage(true)
        },
        toggolePlayingState() {
            let cur = this.playing
            this.setPlayingState(!this.playing)
        },
        playNext() {
            let newIndex = this.currentPlayIndex + 1;
            if(newIndex >= this.sequenceList.length) {
                newIndex = 0;
            }
            this.setCurrengPlayIndex(newIndex);
        },
        playPre() {
            let newIndex = this.currentPlayIndex - 1;
            if(newIndex < 0) {
                newIndex = this.sequenceList.length - 1;
            }
            this.setCurrengPlayIndex(newIndex);
        },
        canplay() {
            console.log("can play")
            this.readyToPlay = true
            this.$refs.audio.play()
        },
        onAudioError() {
            this.readyToPlay = true
            console.log("load music error")
        },
        onTimeUpdate(){

        },
        ...mapMutations({
            setFullpage: MUTATION_TYPES.SET_FULLPAGE_STATE,
            setPlayingState: MUTATION_TYPES.SET_PLAYING_STATE,
            setCurrengPlayIndex: MUTATION_TYPES.SET_CURRENT_PLAY_INDEX
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
                    &.playing
                        animation rotate 24s infinite linear
                    &.pause
                        animation-play-state paused
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