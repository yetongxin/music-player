import * as types from './mutation-types'

//[type](state, payload)
const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer;
    },

    [types.SET_PLAYING_STATE](state, playing) {
        state.playing = playing;
    },
    
    [types.SET_FULLPAGE_STATE](state, fullPage) {
        state.fullPage = fullPage;
    },

    [types.SET_CURRENT_PLAY_INDEX](state, index) {
        state.currentPlayIndex = index

    },
    [types.SET_PLAY_LIST](state, playList) {
        state.playList = playList;
    },
    
    [types.SET_SEQUENCE_LIST](state, sequenceList) {
        state.sequenceList = sequenceList;
    },
    
    [types.SET_MODE](state, mode) {
        state.mode = mode;
    },

    [types.SET_PLAY_SONG_URL](state, url) {
        state.playSongUrl = url;
    }
}
export default mutations