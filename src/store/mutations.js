import * as types from './mutation-types'

//[type](state, payload)
const mutations = {
    [types.SET_SINGER](state, singer) {
        state.singer = singer
    }
}
export default mutations