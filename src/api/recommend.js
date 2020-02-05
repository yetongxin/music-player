import axios from 'axios'
import {commonParams, options} from './config'
export function getRecommend() {
    const url = 'http://localhost:3200/getRecommend'
    return axios.get(url).then(resp => {
        return new Promise((resolve, reject) => {
            return resolve(resp.data)
        })
    }) 
}
      
