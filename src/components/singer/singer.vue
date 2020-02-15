<template>
  <div class="singer" ref="singer">
      <list-view v-bind:data="singers" @select="onSelect"></list-view>
      <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from '@/api/singer'
import ListView from '@/base/listview/listview'
import { mapMutations } from 'vuex'
function Singer({id, name}){
  this.id = id
  this.name = name
  this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
}
const HOT_SINGER_LEN = 16
export default {
  created() {
    this._getSingerList();
  },
  data() {
    return {
        singers: []
      }
    },
  components:{
    ListView
  },
  methods:{
    onSelect(singerBasicInfo){
      console.log("onselect:",   singerBasicInfo)
      this.$router.push({
        path: `/singer/${singerBasicInfo.id}`
      })
      this.setSinger(singerBasicInfo)

    },
    _getSingerList() {
      getSingerList().then((res=> {
        if(res.code == 0) {
          this.singers = this._normalizeSinger(res.data.list)
        }
      }))
    },
    _normalizeSinger(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      }
      list.forEach((item, index) => {
        if(index<HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({name: item.Fsinger_name, id: item.Fsinger_mid}));
        }
        const key = item.Findex
        if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      let ret = [], hot = []
      for(let key in map) {
        let val = map[key]
          if (val.title.match(/[a-zA-Z]/)) {
            ret.push(val)
          } else if (val.title === "热门") {
            hot.push(val)
          }
      }
      // 排序A-Z
      ret.sort((a, b) => {
          return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
}
</script>

<style lang="stylus" scoped>
    .singer
        width 100%
        position fixed
        top 0.88rem
        bottom 0
</style>