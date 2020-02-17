import axios from 'axios'
import { HOST } from './config'
export function getPlayUrl(id) {
    if(!id) {
        return;
    }
    return axios({
        url: HOST + '/song/url?id=' + id,
        withCredentials: true
    })
}