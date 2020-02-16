<template>
    <div class="music-list">
        <div class="header">
            <div class="back" @click="goBack">
                <i class="icon-back"></i>
            </div>
            <h1 class="title">{{title}}</h1>
            <div class="bg-image" :style="bgStyle" ref="bgImage"></div>
        </div>
        <div class="bg-layer" ref="bgLayer"></div>
        <scroll direction="y" 
                :data="songs" 
                class="scroll-song-list" 
                :style="scrollHeight"
                
                :probeType="3"
                @scroll="onScroll"
        >
            <div class="song-list-wrapper" >
                <song-list :songs="songs" @selectSong="selectSong"></song-list>
            </div>
        </scroll>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Scroll from '@/base/scroll/scroll'
import SongList from '@/base/song-list/song-list'
export default {
    props: {
        songs: {type: Array, default: []},
        bgImage: {type: String, default: ''},
        title: {type: String, default: ''}
    },
    mounted() {
        this.imageHeight = this.$refs.bgImage.clientHeight;
        this.savedHeight = 40;
        this.minScrollUpLength = -(this.imageHeight-this.savedHeight);
    },
    data(){
        return {
            scrollY: 0
        }
    },
    computed: {
        bgStyle() {
            return {backgroundImage: `url(${this.bgImage})`}
        },
        scrollHeight() {
            // 背景图片的高度为宽度的70%
            let screenHeight = document.documentElement.clientHeight,
                screenWidth = document.documentElement.clientWidth;
            return {
                height: `${screenHeight - screenWidth*0.7}px`
                // height: `${screenHeight*0.7}px`
                
            }
        },
    },
    methods: {
        goBack() {
            this.$router.back()
        },
        onScroll(pos) {
            this.scrollY = pos.y
        },
        selectSong({song, index}) {
            let songs = this.songs
            this.selectPlaySong({songs, index})
        },
        ...mapActions(['selectPlaySong'])
    },
    components: {
        Scroll,
        SongList
    },
    watch: {
        // scrollY(newY) {
        //     const percent = Math.abs(newY/this.imageHeight)
        //     if(newY > 0) {
        //         // 背景图放大
        //         this.$refs.bgImage.style.transform = `scale(${1+percent})`
        //         this.$refs.bgImage.style.zIndex = 201
        //     } else {
        //         // 背景图zindex回归
        //         this.$refs.bgImage.style.zIndex = 10
        //         // 上滑到了阈值
        //         if(newY < this.minScrollUpLength) {
        //             this.$refs.bgImage.style.zIndex = 201
        //             this.$refs.bgImage.style.paddingTop = '40px'
        //         } else {
        //             this.$refs.bgImage.style.paddingTop = '70%'
        //             this.$refs.bgImage.style.zIndex = 10
        //             // this.$refs.bgImage.style.transform  = `translate3d(0, ${newY}px, 0)`
        //         }
        //     },
            scrollY(newY) {
            const percent = Math.abs(newY/this.imageHeight)
            // zIndex=201，覆盖其它，zIndex=10被覆盖，
            if(newY > 0) {
                // 背景图放大
                this.$refs.bgImage.style.transform = `scale(${1+percent})`
                this.$refs.bgImage.style.zIndex = 201
            } else {
                // 背景图zindex回归
                this.$refs.bgImage.style.zIndex = 10
                this.$refs.bgImage.style.transform  = `translate3d(0, ${newY}px, 0)`

                // 上滑到了阈值
                if(newY < this.minScrollUpLength) {
                    this.$refs.bgImage.style.zIndex = 201
                    this.$refs.bgImage.style.paddingTop = '70%'
                    this.$refs.bgImage.style.transform  = `translate3d(0, ${this.minScrollUpLength}px, 0)`

                    // this.$refs.bgLayer.style.top = '0px'
                    this.$refs.bgLayer.style.zIndex = 201
                } else {
                    this.$refs.bgImage.style.paddingTop = '70%'
                    this.$refs.bgImage.style.zIndex = 10

                    // this.$refs.bgLayer.style.top = '0px'
                    this.$refs.bgLayer.style.zIndex = 0
                }
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable"
    .music-list
        position fixed
        top 0
        bottom 0
        left 0
        right 0
        z-index 100
        background $color-background
        display flex
        flex-direction column
        .header
            flex 0
            .back
                position absolute
                top 0
                left 6px
                z-index 202
                .icon-back
                    display block
                    padding 10px
                    color  black 
                    font-size $font-size-large + 2px
            .title
                position absolute 
                top 0
                left 10%
                width 80%
                line-height  40px
                text-align center
                font-size $font-size-large
                z-index 202
            .bg-image
                position relative
                width 100%
                height 0
                padding-top 70%
                transform-origin top
                background-size  cover
                z-index 10
        .bg-layer
            position absolute 
            top 0
            width 100%
            height 0.44rem
            // z-index 由js控制
            background $color-background
        .scroll-song-list
            flex 1
            z-index 200
            overflow: unset 
            // position fixed
            // top 39%
            // bottom 0
            // width 100%
</style>