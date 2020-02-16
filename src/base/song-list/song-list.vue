<template>
  <div class="song-list">
    <ul>
        <li class="item" 
            v-for="(song, index) in songs" 
            :key="index"
            @click="selectSong(song, index)"
        >
        <!-- <div class="rank" v-show="rank">
          <span :class="getRankCls(index)" v-text="getRankText(index)"></span>
        </div> -->
        <div class="content">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: []
        },
        rank: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        getDesc(song) {
            return `${song.singer}·${song.album}`
        },
        selectSong(song, index) {
            this.$emit('selectSong', {song, index})
        }
    }
}
</script>

<style lang="stylus" scoped>
    @import '~common/stylus/variable'
    @import '~common/stylus/mixin';
    .song-list
        display flex
        align-items center
        padding 0.1rem 0.16rem
        background $color-background
        .content
            padding 0.1rem
            line-height 20px
            // overflow hidden
            .name
                font-size $font-size-middle
            .desc
                font-size $font-size-small
                color rgba(26,26,26,0.8)
                nowarp()
</style>