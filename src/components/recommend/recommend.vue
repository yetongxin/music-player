<template>
  <div  class="recommend-wrapper">
    <div class="slider-wrapper" v-show="focus.length" :style="{minHeight: minHeight2}">
      <slider v-if="focus.length">
        <!--防止出现未有数据时候无法正确获取slider的宽度-->
        <div v-for="pic in focus">
          <a href="http://www.baidu.com">
            <img v-bind:src="pic.pic_info.url" />
          </a>
        </div>
      </slider>
    </div>
    <main v-show="focus.length&& disc.length&&disc2.length">
      <!-- <section class="mui-list-gf">
        <section class="title">
          <h2 class="text-clo-b title-text">官方歌单</h2>
          <a class="title-text-more l">更多</a>
        </section>
        <scroll v-bind:width="scrollWidth" class="scroll-wrapper">
          <section class="mui-list-wrapper">
            <ul class="mui-list-horizontal">
              <li v-for="item in disc" :key="item">
                <div class="mui-list-box">
                  <div class="mui-list-media">
                    <img
                      class="mui-list-cover"
                      :src="item.imgurl"
                    />
                    <div class="mui-cover-count">
                      <i class="mui-cover-count-icon"></i>
                      <span class="mui-cover-count-num">{{(item.listennum/10000).toFixed(1)}}万</span>
                      </div>
                  </div>
                  <div class="mui-list-bd">
                    <h3 class="title-text-more mui-list-title">{{item.dissname}}</h3>
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </scroll>
      </section> -->
      <diss-list :disc="disc" name="官方歌单" ></diss-list>
      <diss-list :disc="disc2" name="达人歌单"></diss-list>
      
    </main>
    <div class="loading-container" v-show="!(focus.length&&disc.length&&disc2.length)">
        <loading></loading>
    </div>
  </div>
</template>

<script>
import { getRecommend, getDiscList, getDiscList2 } from "@/api/recommend";
import Slider from "@/base/slider/slider";
import Scroll from "@/base/scroll/scroll";
import DissList from '@/components/diss-list/diss-list'
import Loading from '@/base/loading/loading'
export default {
  components: {
    Slider,
    Scroll,
    DissList,
    Loading
  },
  data() {
    return {
      focus: [],
      scrollWidth: '100%',
      disc: [],
      disc2: [],
      minHeight2: 0
    };
  },
  created() {
    this.minHeight2 = document.documentElement.clientWidth/2.5 + 'PX';
    console.log(this.minHeight2)
    this._getRecommend();
    this._getDiscList();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(data => {
        if (data.response.code === 0) {
          this.focus = data.response.focus.data.content;
        }
      });

    },
    _getDiscList() {
        getDiscList().then(data => {
            data = data.response
            if(data.code !== 0) {
            return;
            }
            this.disc = data.data.list.slice(0, 6);
        })
        getDiscList2().then(data => {
            data = data.response
            if(data.code !== 0) {
            return;
            }
            this.disc2 = data.data.list.slice(0, 6);
        })

      }
      
    },
    
};
</script>

<style lang="stylus" scoped>
.recommend-wrapper
    position relative
    height 5.79rem
    // top 0.88rem
    // bottom 0

.loading-container
    position absolute 
    width 100%
    top 50%
    transform translateY(-50%)

// @import '~common/stylus/variable.styl';

// .text-clo-b 
//   color $text-clo-b
// .mui-list-title
//   display -webkit-box
//   -webkit-box-orient vertical
//   line-clamp 2
//   white-space normal 
//   word-wrap break-word
//   word-break normal 
// .title-text-more 
//   color $color-text-small
// main 
//   display: block;
//   section.title
//     position relative
//     display flex
//     justify-content space-between
//     height .3rem
//     margin .2rem .16rem .1rem;
//     .title-text-more
//       font-size: 13px
//       position absolute
//       top .05rem
//       right -.06rem
//       height .2rem
//       font-weight 300
//   .scroll-wrapper
//     margin-top -.1rem
//   section.mui-list-wrapper
//     // display block
//     // margin-top -.1rem
//     display inline-block
//     ul.mui-list-horizontal
//       display inline-block //设置这两个属性才能够自动撑开横向宽度
//       white-space nowrap
//       margin 0 .12rem
//       li
//         list-style none
//         display inline-block
//         margin-bottom 0
//         width auto
//         font-size .12rem
//         div.mui-list-box
//           width 1.09rem
//           margin 0 .04rem
//           div.mui-list-media
//             position relative
//           img 
//             display block
//             width 100%
//             object-fit cover
//             z-index 1
//             border-radius .08rem
//           div.mui-cover-count
//             position absolute
//             bottom 0
//             right 0
//             display flex
//             justify-content center
//             align-items center
//             height 17px
//             min-width 14px
//             padding 0 7px
//             background: rgba(0,0,0,.4);
//             border-radius: 9px;
//             color #fff
//             i.mui-cover-count-icon
//               display inline-block
//               width 10px
//               height 10px
//               background-image url('./play.png')
//               background-size cover
//               background-repeat no-repeat
//             span
//               margin-left 2px;
//         div.mui-list-bd
//           display block
//           font-size .13rem
//           margin-top  .08rem
          




// .title-text 
//   font-size 0.18rem
//   font-weight 700
//   max-width: 80%;

</style>>
    
