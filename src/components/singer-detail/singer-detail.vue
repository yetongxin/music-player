<template>
  <!-- <div class="sin">singer-detail</div> -->
    <transition name="slide" appear>
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
import MusicList from '@/base/music-list/music-list'
import { mapGetters } from 'vuex' 
import { getSingerDetail } from '@/api/singer'
import { ERR_OK } from '@/api/config'
import { createSong } from '@/common/js/song'
export default {
    created(){
        this._getSingerDetailInfo();
    },
    data() {
        return {
            songs: []
        }
    },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
        ...mapGetters(['singer'])
    },
    components: {
        MusicList
    },
    methods: {
        _getSingerDetailInfo(){
            if(!this.singer || !this.singer.id) {
                this.$router.push('/singer');
            }
            getSingerDetail(this.singer.id).then((res) => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                }

            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                if (musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }

    }
    
}
</script>

<style lang="stylus" scoped>

    .slide-enter-active, .slide-leave-active
        // transition-delay 1s
        transition all 0.5s ease
    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
</style>