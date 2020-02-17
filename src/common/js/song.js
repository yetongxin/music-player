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
export function createSong(song){
    return new Song({
        id: song.id,
        // mid: musicData.songmid,
        singer: filterSinger(song.ar),
        name: song.name,
        album: song.al.name,
        duration: 0,
        image: song.al.picUrl+'?param=300y300',
        // 播放链接需要请求获取
        url: '' 
    })
}
function filterSinger(artists) {
    let ret = []
    if (!artists) {
      return ''
    }
    artists.forEach((s) => {
      ret.push(s.name)
    })
    return ret.join('/')
  }
  