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
                <main class="main"
                    @touchstart.prevent="onMainTouchStart"
                    @touchmove.prevent="onMainTouchMove"
                    @touchend="onMainTouchEnd"       
                >
                    <div class="cd-wrapper main-left" ref="mainLeft">
                        <div class="cd playing" :class="playing?'':'pause'">
                            <img class="cd-img" :src="currentPlayingSong.image"/>
                        </div>
                    </div>
                    <scroll direction="y" class="lyrics-wrapper main-right" v-if="lyric" ref="lyricScroll">
                        <div>
                            <p v-for="(line,index) in lyric.lines" :key="index" 
                            class="text" 
                            :class="{'current': currentLineNum===index}"
                            ref="lyricLine"
                            >
                            {{line.txt}}
                            </p>
                        </div>
                    </scroll>
                </main>
                <div class="progress-bar-wrapper">
                    <!-- 这里的percent为百分比 -->
                    <progress-bar :percent="percent" @percentChange="onPercentChange"></progress-bar>
                    <div class="time">
                        <div class="time-now">{{currentTimeFormat}}</div>
                        <div class="time-all">{{durationFormat}}</div>
                    </div>
                    
                </div>
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
        
        <audio :src="playSongUrl?playSongUrl:''" 
                @durationchange="onDurationChange"
                @canplay="canplay"
                @error="onAudioError"
                @timeupdate="onTimeUpdate" 
                ref="audio"
        >
        </audio>
    </div>
</template>

<script>
import { mapMutations, mapGetters, mapActions } from 'vuex'
import { getLyrics } from '@/api/song'
import LyricParser from '@/common/js/LyricParser'
import * as MUTATION_TYPES from '@/store/mutation-types'
import ProgressBar from '@/base/progress-bar/progress-bar'
import Scroll from '@/base/scroll/scroll'
export default {
    components:{
        ProgressBar,
        Scroll
    },
    created(){
        this.touch = {}
    },
    data() {
        return {
            readyToPlay: false,
            duration: 0,
            current: 0,
            currentTimeFormat: '0:00',
            durationFormat: '0:00',
            percent: 0,
            lyric: null,
            currentLineNum: -1,
            currentShow: 'cd'
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
        },

        current(newVal) {
            this.currentTimeFormat = this._formatTime(newVal);
            this.percent = 100 * newVal / this.duration;
        },
        currentPlayingSong(newSong, oldSong) {
            if(!newSong.id) {
                return;
            }
            if(newSong.id === oldSong.id) {
                return;
            }
            if(this.lyric) {
                this.lyric.stop();
                this.currentLineNum = 0; 
                this.$refs.lyricScroll.$el.style['transform'] = `translate3d(0, 0, 0)`;

                this.$refs.lyricScroll.$el.style['transition'] = `0s`;
                this.$refs.mainLeft.style['opacity'] = 1;
                this.currentShow = 'cd'
                this.$refs.mainLeft.style['transition'] = `0s`;
            }
            getLyrics(newSong.id).then(res => {
                if(res.data.code === '200') {
                    return;
                }
                this.lyric = new LyricParser(res.data.lrc.lyric, this.handleLyric)

                if(this.playing) {
                    this.lyric.play();
                }
            })
        }
    },
    methods: {
        closeFullPage() {
            // this.$refs.lyricScroll.$el.style['transform'] = `translate3d(0, 0, 0)`;
            // this.$refs.lyricScroll.$el.style['transition'] = `0s`;
            // this.$refs.mainLeft.style['opacity'] = 1;
            // this.currentShow = 'cd'
            // this.$refs.mainLeft.style['transition'] = `0s`;
            
            this.setFullpage(false)
        },
        openFullPage() {
            this.$refs.lyricScroll.$el.style['transform'] = `translate3d(0, 0, 0)`;
            this.$refs.lyricScroll.$el.style['transition'] = `0s`;
            this.$refs.mainLeft.style['opacity'] = 1;
            this.currentShow = 'cd'
            this.$refs.mainLeft.style['transition'] = `0s`;
            this.setFullpage(true)
        },
        toggolePlayingState() {
            let cur = this.playing
            this.setPlayingState(!this.playing)
            if(this.lyric) {
                this.lyric.togglePlay();
            }
        },
        playNext() {
            let newIndex = this.currentPlayIndex + 1;
            if(newIndex >= this.sequenceList.length) {
                newIndex = 0;
            }
            this.setCurrentPlayIndex(newIndex);
            this.getSongUrl(newIndex);

        },
        playPre() {
            let newIndex = this.currentPlayIndex - 1;
            if(newIndex < 0) {
                newIndex = this.sequenceList.length - 1;
            }
            this.setCurrentPlayIndex(newIndex);
            this.getSongUrl(newIndex);
        },
        onDurationChange(e) {
            this.duration = this.$refs.audio.duration
            this.durationFormat = this._formatTime(this.$refs.audio.duration)
        },
        canplay(e) {
            this.readyToPlay = true
            this.$refs.audio.play()
            // this.duration = this.$refs.audio.duration;
        },
        onAudioError() {
            this.readyToPlay = true
            console.error("load music error")
        },
        onTimeUpdate(e){
            this.current = e.target.currentTime
            if(e.target.currentTime>=e.target.duration) {
                this.playNext();
            }
        },
        onPercentChange(percent) {
            const newTime = this.$refs.audio.duration*percent
            this.percent = percent*100
            this.$refs.audio.currentTime = this.$refs.audio.duration*percent;
            if(this.lyric) {
                this.lyric.seek(newTime*1000)
            }
        },
        handleLyric({txt, lineNum}) {
            let lines = this.$refs.lyricLine
            if(lineNum >= 6) {
                this.$refs.lyricScroll.scrollToElement(lines[lineNum-5], 1000)
            } else {
                this.$refs.lyricScroll.scrollTo(0, 0, 1000)
            }
            this.currentLineNum= lineNum;
        },
        onMainTouchStart(e){
            this.touchStart = true;
            const touch = e.touches[0]
            this.touch.startX = touch.pageX;
            this.touch.startY = touch.pageY;
        },
        onMainTouchMove(e){
            if(!this.touchStart) {
                return;
            }
            const touch = e.touches[0];
            const deltaX = touch.pageX - this.touch.startX;
            const deltaY = touch.pageY - this.touch.startY;
            if(Math.abs(deltaY) > Math.abs(deltaX)) {
                return;
            }
            const left = this.currentShow === 'cd' ? 0 : -window.innerWidth;
            const offsetLeft = Math.min(0,Math.max(-window.innerWidth, left+deltaX)); //最左移动到-window.innerWidth, 最右移动到0
            // this.touch.percent = offsetLeft / window.innerWidth
            this.touch.percent = deltaX / window.innerWidth

            this.$refs.lyricScroll.$el.style['transform'] = `translate3d(${offsetLeft}px, 0, 0)`;
            this.$refs.lyricScroll.$el.style['transition'] = `0s`;
            
            let opacityBase;
            if(this.touch.percent<0) { //左滑初始为1
                if(this.currentShow === 'lyric') {
                    return;
                }
                opacityBase = 1;
            } else {
                if(this.currentShow === 'cd') {
                    return;
                }
                opacityBase = 0;
            }
            this.$refs.mainLeft.style['opacity'] = opacityBase + this.touch.percent
            this.$refs.mainLeft.style['transition'] = `0s`;
        },
        onMainTouchEnd(e){
            let offset
            if(this.currentShow === 'cd') { //向左拉
                if(this.touch.percent < -0.1) {
                    offset = -window.innerWidth
                    this.currentShow = 'lyric'
                } else { // 拉得不够远，返回去
                    offset = 0
                }
            } else { //  向右拉
                if(this.touch.percent > 0.1) {
                    offset = 0;
                    this.currentShow = 'cd'
                } else {
                    offset = -window.innerWidth
                }
            }
            this.touch.percent = 0;
            this.$refs.lyricScroll.$el.style['transform'] = `translate3d(${offset}px, 0, 0)`
            this.$refs.lyricScroll.$el.style['transition'] = `0.5s`

            this.$refs.mainLeft.style['opacity'] = this.currentShow === 'cd' ? 1 : 0
            this.$refs.mainLeft.style['transition'] = `opacity 0.5s`

        },
        _formatTime(seconds){
            let min = parseInt(seconds/60);
            let sec = (seconds%60).toFixed(0);
            if(sec.length < 2) {
                sec = '0' + sec
            } 
            return min + ":" + sec
        },
        ...mapMutations({
            setFullpage: MUTATION_TYPES.SET_FULLPAGE_STATE,
            setPlayingState: MUTATION_TYPES.SET_PLAYING_STATE,
            setCurrentPlayIndex: MUTATION_TYPES.SET_CURRENT_PLAY_INDEX
        }),
        ...mapActions(['getSongUrl'])
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
        background $color-filter-grey
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
            color white
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
            top 0.8rem
            bottom 1.5rem
            box-sizing border-box
            padding-top 0.3rem
            white-space nowrap
            .cd-wrapper
                width 100%
                // opacity  0 //TODO
                display inline-block
                vertical-align top
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
            .lyrics-wrapper
                position absolute
                display inline-block
                width 100%
                top 0
                bottom 0
                text-align center
                padding-left 30px
                padding-right 30px
                box-sizing border-box
                overflow hidden

                p.text
                    color $color-text-dg
                    font-size  16px
                    line-height 36px
                    nowrap()
                    &.current
                        color white
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
                color white
                .icon-play-pause
                    font-size 50px
        .progress-bar-wrapper
            position fixed
            bottom 0.8rem
            width 100%
            .time 
                width 80%
                margin 8px auto
                display flex
                justify-content space-between
                font-size 14px
                color $color-text-ll
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
        // opacity 0
        transform translate3d(0, 100%, 0)
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