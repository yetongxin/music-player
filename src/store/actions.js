import * as types from './mutation-types'
import { getPlayUrl } from '@/api/song'
export const selectPlaySong = function({commit, state}, {songs, index}) {
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULLPAGE_STATE, true)
    commit(types.SET_SEQUENCE_LIST, songs)
    commit(types.SET_CURRENT_PLAY_INDEX, index)
    getPlayUrl(songs[index].id).then(res => {
        if(res.data.code === 200) {
            let url = res.data.data[0].url
            if(url) {
                commit(types.SET_PLAY_SONG_URL, url)
            } else {
                commit(types.SET_PLAYING_STATE, false)
            }
        }
    })
}
// 获取播放地址
export const getSongUrl = function({commit, state}, index) {
    commit(types.SET_PLAYING_STATE, false)
    getPlayUrl(state.sequenceList[index].id).then(res => {
        if(res.data.code === 200) {
            let url = res.data.data[0].url
            if(url) {
                commit(types.SET_PLAY_SONG_URL, url)
                commit(types.SET_PLAYING_STATE, true)
            } else {
                commit(types.SET_PLAYING_STATE, false)
            }
        }
    })
}