import originJsonp from 'jsonp'

export default function jsonp(url, data, opt) {
    url += (url.indexOf('?') < 0 ? '?' : '&') + parseQueryString(data)
    return new Promise((resolve, reject) => {
        originJsonp(url, opt, (err, data) => {
            if(!err) {
                resolve(data)
            } else {
                reject(err)
            }
        })
    })
}

function parseQueryString(data) {
    let str = '';
    for(let k in data) {
        let value = data[k] !== undefined ? data[k] : '';
        str += `&${k}=${value}`
    }
    return str ? str.substring(1) : ''
}