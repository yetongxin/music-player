import * as types from './mutation-types'
export const selectPlaySong = function({commit, state}, {songs, index}) {
    commit(types.SET_PLAYING_STATE, true)
    commit(types.SET_FULLPAGE_STATE, true)
    commit(types.SET_SEQUENCE_LIST, songs)
    commit(types.SET_CURRENT_PLAY_INDEX, index)
}
