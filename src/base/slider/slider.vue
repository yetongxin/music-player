<template>
    <div class="slider" ref="slider">
        <div class="slider-group" ref="sliderGroup">
            <slot></slot>
        </div>
        <div class="dots">
            <div class="dot" v-for="index in dots" :key="index" :class="{active: currentPageIndex+1 === index}"></div>
        </div>
    </div>

</template>

<script>
import { addClass } from '@/common/js/dom'
import BScroll from 'better-scroll'
export default {
    props: {
        loop: {type: Boolean, default: true},
        autoplay: {type: Boolean, default: true},
        interval: {type: Number, default: 400},    
    },
    data() {
        return {
            dots: 0,
            currentPageIndex: 0
        }
    },
    mounted() {
        setTimeout(() => {
            this._setSliderWidth();
            this._initScroll();
        }, 20)
        // this._setSliderWidth();
        window.addEventListener('resize', () => {
            if(!this.bscroll){
                return
            }
            this._setSliderWidth(true)
            this.bscroll.refresh();
        })
    },
    methods: {
        _setSliderWidth(isResize) {
            let sliderGroup =  this.$refs.sliderGroup;
            let childrens = sliderGroup.children;
            // slider初始宽度即为屏幕宽度
            let imgWidth = this.$refs.slider.clientWidth
            let allWidth = 0
            // console.log("setting width: ",childrens)
            for(let i = 0; i< childrens.length; i++) {
                let child = childrens[i];
                addClass(child, 'slider-item')
                child.style.width = imgWidth+'px'
                //渲染完成后再添加class
                allWidth += imgWidth;
            }
            if(this.loop && !isResize) {
                allWidth += 2*imgWidth;
            }
            
            this.$refs.sliderGroup.style.width = allWidth + 'px'
            this.dots = childrens.length
            if(isResize) {
                this.dots -= 2
            }
        },
        _initScroll() {
            let slider = this.$refs.slider;
            this.bscroll = new BScroll(slider, {
                scrollX: true,
                scrollY: false,
                momentum: false,
                snap: {
                    loop: this.loop,
                    threshold: 0.1,
                    speed: 400
                },
            })
            this.bscroll.on('scrollEnd',(obj) => {
                clearTimeout(this.sliderTimer)
                // 滚动结束后自行滚动一次
                if(this.autoplay) {
                    this._play();
                }
                this.currentPageIndex = this.bscroll.getCurrentPage().pageX
            })
            this.bscroll.on('beforeScrollStart', () => {
                if(this.sliderTimer) {
                    clearTimeout(this.sliderTimer)
                }
            })
            this._play();
        },
        _play() {
            let pageIndex = this.currentIndex
            if(this.autoplay) {
                this.sliderTimer = setTimeout(() => {
                    this.bscroll.next();
                }, 1000)
            }
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import "~common/stylus/variable.styl";
    .slider
        min-height 1px
        overflow hidden
        position relative
        .slider-group
            position relative
            white-space nowrap
            overflow hidden
            .slider-item
                float left
                overflow hidden
                // font-size 0
                // line-height 0
                a
                    display inline-block
                    // font-size 0 //或者Line-height 0 防止a标签高度大于img高度
                    // width 100%
                    // height 100%
                    text-decoration none 
                    img 
                        width 100%
        .dots
            display inline-block
            position absolute 
            bottom 8px
            // left 50%
            left 0
            right 0
            text-align center
            // line-height 0
            font-size 100%
            .dot
                display inline-block
                margin  0 4px
                width 8px
                height 8px
                border-radius 8px
                background $color-text-l
                &.active
                    width 16px
                    background: $color-text-ll
</style>