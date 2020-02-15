export default class Song {
    constructor({id, mid, singer, name, album, duration, image, url}) {
        this.id = id
        this.mid = mid
        this.singer = singer
        this.name = name
        this.album = album
        this.duration = duration
        this.image = image
        this.url = url
    }   
}
export function createSong(musicData){
    return new Song({
        id: musicData.songid,
        mid: musicData.songmid,
        singer: filterSinger(musicData.singer),
        name: musicData.songname,
        album: musicData.albumname,
        duration: musicData.interval,
        image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
        url: `http://ws.stream.qqmusic.qq.com/${musicData.songid}.m4a?fromtag=46`
        // url: `http://thirdparty.gtimg.com/C100${musicData.songmid}.m4a?fromtag=38`
        // http://aqqmusic.tc.qq.com/amobile.music.tc.qq.com/C400001PLl3C4gPSCI.m4a?guid=5767607000&vkey=92D1BF4D3AA3AD21C167D692756D7677C17CA593234A68376A50C376FB87D8684223E8D8BFE7FAECEE9776F43F857A49FB5ED0B8DD9FB5FB&uin=0&fromtag=38
      
    })
}
function filterSinger(singer) {
    let ret = []
    if (!singer) {
      return ''
    }
    singer.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
  }
  