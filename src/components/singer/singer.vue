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
import cnchar from 'cnchar'
function Singer({id, name, avatar}){
  this.id = id
  this.name = name
  this.avatar = avatar + '?param=50y50';
  this.picBig = avatar ;
}
const HOT_SINGER_LEN = 20
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
      this.$router.push({
        path: `/singer/${singerBasicInfo.id}`
      })
      this.setSinger(singerBasicInfo)

    },
    _getSingerList() {
      getSingerList().then((res=> {
        let data = res.data
        if(data.code == 200) {
          this.singers = this._normalizeSinger(res.data.artists)
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
          map.hot.items.push(new Singer({name: item.name, id: item.id, avatar: item.picUrl}));
        }
        const key = item.name.spell()[0].toUpperCase();
        if (!map[key]) {
            map[key] = {
              title: key,
              items: []
            }
          }
        map[key].items.push(new Singer({
          name: item.name,
          id: item.id,
          avatar: item.picUrl
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