<template>
  <section class="mui-list-gf">
    <section class="title" v-show="disc.length">
      <h2 class="text-clo-b title-text">{{name}}</h2>
      <a class="title-text-more l">更多</a>
    </section>
    <scroll class="scroll-wrapper">
      <section class="mui-list-wrapper">
        <ul class="mui-list-horizontal">
          <li v-for="(item,index) in disc" :key="index">
            <div class="mui-list-box">
              <div class="mui-list-media">
                <img class="mui-list-cover" :src="item.imgurl" />
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
  </section>
</template>

<script>
import Scroll from "@/base/scroll/scroll";
export default {
    components: {
        Scroll
    },
    props: {
        disc: {type: Array, default: []},
        name: {type: String, default:''}
    }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';
// 公用class CSS
.text-clo-b 
  color $text-clo-b
.mui-list-title
  display -webkit-box
  -webkit-box-orient vertical
  -webkit-line-clamp 2
  white-space normal 
  word-wrap break-word
  word-break normal 
.title-text-more 
  color $color-text-small

section.title
    position relative
    display flex
    justify-content space-between
    height .3rem
    margin .2rem .16rem .1rem;
    .title-text-more
      font-size: 13px
      position absolute
      top .05rem
      right -.06rem
      height .2rem
      font-weight 300
  .scroll-wrapper
    margin-top -.1rem
  section.mui-list-wrapper
    // display block
    // margin-top -.1rem
    display inline-block
    ul.mui-list-horizontal
      display flex  //inline-block 设置这两个属性才能够自动撑开横向宽度
      white-space nowrap
      margin 0 .12rem
      li
        list-style none
        display inline-block
        margin-bottom 0
        width auto
        font-size .12rem
        div.mui-list-box
          width 1.09rem
          margin 0 .04rem
          div.mui-list-media
            position relative
          img 
            display block
            width 100%
            height 1.09rem
            object-fit cover
            z-index 1
            border-radius .08rem
          div.mui-cover-count
            position absolute
            bottom 0
            right 0
            display flex
            justify-content center
            align-items center
            height 17px
            min-width 14px
            padding 0 7px
            background: rgba(0,0,0,.4);
            border-radius: 9px;
            color #fff
            i.mui-cover-count-icon
              display inline-block
              width 10px
              height 10px
              background-image url('./play.png')
              background-size cover
              background-repeat no-repeat
            span
              margin-left 2px;
        div.mui-list-bd
          display block
          font-size .13rem
          margin-top  .08rem

.title-text 
  font-size 0.18rem
  font-weight 700
  max-width: 80%;
</style>>
