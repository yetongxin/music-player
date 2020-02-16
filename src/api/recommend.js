import axios from 'axios'
import {commonParams, options} from './config'

const host = 'http://129.204.159.200:3200';
export function getRecommend() {
    const url = host + '/getRecommend'
    return axios.get(url).then(resp => {
        return new Promise((resolve, reject) => {
            return resolve(resp.data)
        })
    }) 
}
export function getDiscList() {
    const url =  host + '/getSongLists?categoryId=10000000'
    return axios.get(url).then(resp => {
        return new Promise((resolve, reject) => {
            return resolve(resp.data)
        })
    })
    
}
export function getDiscList2() {
    const url =  host + '/getSongLists?categoryId=165'
    return axios.get(url).then(resp => {
        return new Promise((resolve, reject) => {
            return resolve(resp.data)
        })
    })
    
}