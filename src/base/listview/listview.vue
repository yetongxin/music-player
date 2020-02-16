<template>
    <scroll 
        direction="y" 
        class="listview" 
        ref="scroll"
        :probe-type="3"
        @scroll="onScroll">
        <ul>
            <li v-for="group in data" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li @click="onClickSinger(item)" v-for="item in group.items" class="list-group-item">
                        <img class="avatar" v-lazy="item.avatar"/>
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" 
            @touchstart.stop.prevent="onTouchStart"
            @touchmove.stop.prevent="onTouchMove" >
            <ul>
                <li v-for="(item,index) in shortcutList" class="item" :data-index="index" :class="{'current':currentIndex===index}">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" ref="fixed" v-show="fixedTitle">
            <div class="fixed-title">{{fixedTitle}}</div>
        </div>
    </scroll>
</template>

<script>
import Scroll from '@/base/scroll/scroll'
import { getData } from '@/common/js/dom'

const SHORTCUR_LI_HEIGHT = 18
export default {
    props: {
        data: {type:Array, default: []}
    },
    computed: {
        shortcutList() {
            let res = this.data.map(item => item.title.substr(0, 1))
            return res;
        },
        fixedTitle() {
            if(this.scrollY > 0) {
                return ''
            }
            return this.data[this.currentIndex] ? this.data[this.currentIndex].title: ''
        }
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0
        }
    },
    
    components: {
        Scroll
    },
    created() {
        this.probeType = 3
        this.firstTouch = []
        this.listHeights = []
    },
    methods:{
        onClickSinger(singerBasicInfo) {
            this.$emit('select',singerBasicInfo)
            // this.$emit('select', )
        },
        onTouchStart(e) {
            let index = getData(e.target, 'index');
            if(index ===  null) {
                return;
            }
            this.firstTouch = e.touches[0].pageY;
            this.firstTouchIndex = index;
            this._scrollTo(index);
        },
        onTouchMove(e) {
            let nowTouch = e.touches[0].pageY
            // console.log(this.firstTouch, nowTouch)

            let nowTouchIndex = +this.firstTouchIndex + Math.floor((nowTouch - this.firstTouch)/SHORTCUR_LI_HEIGHT)

            // console.log("pre:", this.firstTouchIndex, "now:", nowTouchIndex)
            this._scrollTo(nowTouchIndex)
        },
        onScroll(pos){
            this.scrollY = pos.y
        },
        _calculateHeights() {
            const group = this.$refs.listGroup;
            let arr = []
            let height = 0;
            arr.push(0)
            for(let i=0;i<group.length;i++) {
                height+=group[i].clientHeight;
                arr.push(height)
            }
            this.listHeights = arr
        },
        _scrollTo(index) {
            let groups = this.$refs.listGroup;

            this.$refs.scroll.scrollToElement(groups[index], 0)
        },
        
    },
    watch: {
        data() {
            setTimeout(() => {
                this._calculateHeights();
            },0)
        },
        // 页面发生滚动时, scrollY发现变化，观察其变化，修改currentIndex
        scrollY(newY) {
            if(newY >= 0) {
                this.currentIndex = 0
                return;
            }
            const listHeights = this.listHeights;
            for(let i=0;i<listHeights.length;i++) {
                let height1 = listHeights[i],
                    height2 = listHeights[i+1];
                if((-newY)>=height1 && (-newY)<height2) {
                    this.currentIndex = i;
                    return;
                }
            }
            this.currentIndex = listHeights.length - 1
            // if(-newY>listHeights[listHeights.length-1])
        }
    },
}
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
.listview
    position: relative
    width: 100%
    height 100%
    // height: 7.0rem
    overflow: hidden
    background: $color-background-white
    .list-group
        padding-bottom: 30px
        .list-group-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-background
        .list-group-item
            display: flex
            align-items: center
            padding: 20px 0 0 30px
            .avatar
                width: 50px
                height: 50px
                border-radius: 50%
            .name
                margin-left: 20px
                color: $text-clo-b
                font-size: $font-size-medium
    .list-shortcut
        position: absolute
        z-index: 30
        right: 0
        top: 50%
        transform: translateY(-50%)
        width: 20px
        padding: 20px 0
        border-radius: 10px
        text-align: center
        background: $color-background
        font-family: Helvetica
        .item
            padding: 3px
            line-height: 1
            color: $color-text-l
            font-size: 13px
            &.current
                color: $color-theme
    .list-fixed
        position: absolute
        top: 0px
        left: 0
        width: 100%
        .fixed-title
            height: 30px
            line-height: 30px
            padding-left: 20px
            font-size: $font-size-small
            color: $color-text-l
            background: $color-background
    .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>