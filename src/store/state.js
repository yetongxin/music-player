const PLAY_MODE = {
    SEQUENCE: 0,
    LOOP:1,
    RANDOM: 2
}
const state = {
    singer: {},           // singer-detail所需的歌手基本信息{id, name, avatar, ...}
    playing: false,       // 播放状态，暂停或播放
    fullPage: false,      // 是否全屏
    playList: [],         // 等待播放的歌曲列表
    sequenceList: [],     // 播放顺序列表
    currentPlayIndex: -1, // 当前播放
    mode: PLAY_MODE.SEQUENCE,  //播放模式，顺序播放

}
export default state;