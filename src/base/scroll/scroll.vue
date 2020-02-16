<template>
  <div class="scroll-view-wrapper" ref="scrollwrapper">
      <slot></slot>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
export default {
    props: {
        scrollAreaWidth: {type:String, default: '100%'},
        probeType: {type: Number, default: 1},
        direction: {type: String, default: 'x'},
        click: {type: Boolean, default: true},
        listenScroll: {type: Boolean, default: true},
        refreshDelay: {type: Number, default: 20},
        data: { type: Array, default: null},
    },
    
    mounted() {
        setTimeout(() => {
            this._initScroll();
        },20)
    },

    methods: {
        _initScroll(){
            if (!this.$refs.scrollwrapper) {
                return
            }
            this.$refs.scrollwrapper.style.width = this.scrollAreaWidth;
            let scrollX = true, scrollY = false;
            if(this.direction === 'y') {
                scrollX = false; scrollY = true;
            }
            this.scroll = new Bscroll(this.$refs.scrollwrapper, {
                probeType: this.probeType,
                scrollX,
                scrollY,
                click: this.click
            })
            if(this.listenScroll) {
                let _this = this;
                this.scroll.on('scroll', (pos) => {
                    _this.$emit('scroll', pos)
                })
            }
            
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
        scroll() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
        }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.refresh()
        }, this.refreshDelay)
      }
    }
}
</script>

<style>
    .scroll-view-wrapper{
        overflow: hidden;
    }
</style>