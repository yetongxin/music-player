import jsonp from 'common/js/jsonp'
import axios from 'axios'
import {commonParams, options, HOST} from './config'

// qq音乐
// export function getSingerList() {
//   const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

//   const data = Object.assign({}, commonParams, {
//     channel: 'singer',
//     page: 'list',
//     key: 'all_all_all',
//     pagesize: 100,
//     pagenum: 1,
//     hostUin: 0,
//     needNewCode: 0,
//     platform: 'yqq'
//   })

//   return jsonp(url, data, options)
// }
// 网易云音乐
export function getSingerList() {
  const url_hot = HOST + '/top/artists?offset=0&limit=100';
  return axios({
    url: url_hot,
    withCredentials: true
  })
}
// export function getSingerList() {
//   const url_hot = HOST + '/top/artists?offset=0&limit=100';
//   const url_alpha = HOST +'/artist/list?cat=1001&limit=10&initial='
//   let promises = [];
//   promises.push(axios({url: url_hot, withCredentials: true}));
//   let a = 'a'.charCodeAt(), alpha;
//   for(let i=0;i<26;i++) {
//     alpha = String.fromCharCode(a+i);
//     promises.push(axios({
//       url: url_alpha+alpha,
//       withCredentials: true
//     }).then(res => {
//       return new Promise(resolve => {
//         return resolve({artists: res.data.artists, code: alpha})
//       })
//     }).catch(err => {
//       console.log(err);
//       return new Promise(resolve => {
//         resolve(err)
//       })
//     })
//     )
//   }
//   return Promise.all(promises)
// }

// 需要处理url返回null的情况
export function getSingerDetail(singerId) {
  const url = `${HOST}/artist/top/song?id=${singerId}`;
  return axios({
    url,
    withCredentials: true
  })
}
