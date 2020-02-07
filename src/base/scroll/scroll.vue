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
        listenScroll: {type: Boolean, default: false},
        refreshDelay: {type: Number, default: 20}
    },
    
    mounted() {
        setTimeout(() => {
            this._initScroll();
        },20)
    },

    methods: {
        _initScroll(){
            console.log("hereeeeeeee",this.$refs.scrollwrapper)
            if (!this.$refs.scrollwrapper) {
                return
            }
            this.$refs.scrollwrapper.style.width = this.scrollAreaWidth;
            console.log("scrollwrapper",this.$refs.scrollwrapper.style)
            let scrollX = true, scrollY = false;
            if(this.direction === 'y') {
                scrollX = false; scrollY = true;
            }
            this.scroll = new Bscroll(this.$refs.scrollwrapper, {
                scrollX: true,
                scrollY: false,
            })
            if(this.listenScroll) {
                this.scroll.on('scroll', (pos) => {
                    this.$emit('scroll', pos)
                })
            }
            
        },
        refresh() {
            this.scroll && this.scroll.refresh()
        },
    }
}
</script>

<style>
    .scroll-view-wrapper{
        overflow: hidden;
    }
</style>