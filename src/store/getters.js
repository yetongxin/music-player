export const singer = state => state.singer

// const state = {
//     singer: {},           // singer-detail所需的歌手基本信息{id, name, avatar, ...}
//     playing: false,       // 播放状态，暂停或播放
//     fullPage: false,      // 是否全屏
//     playList: [],         // 等待播放的歌曲列表
//     sequenceList: [],     // 播放顺序列表
//     currentPlayIndex: -1, // 当前播放
//     mode: PLAY_MODE.SEQUENCE,  //播放模式，顺序播放

// }
export const playing = state => state.playing;
export const fullPage = state => state.fullPage;
export const playList = state => state.playList;
export const sequenceList = state => state.sequenceList;
export const currentPlayIndex = state => state.currentPlayIndex;
export const mode = state => state.mode;
export const currentPlayingSong = state => {
    if(state.sequenceList && state.currentPlayIndex >= 0) {
        return state.sequenceList[state.currentPlayIndex];
    } else {
        return {};
    }
}
export const playSongUrl = state => state.playSongUrl;