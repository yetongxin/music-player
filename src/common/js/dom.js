export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
    return reg.test(el.className)
}

export function addClass(el, className) {
    if(hasClass(el, className)) {
        return
    }
    let currentClass = el.className;
    let classArr = currentClass.split(' ');
    classArr.push(className);
    el.className = classArr.join(' ')
}
export function getData(el, name) {
    return el.getAttribute('data-'+name);
}
export function setData(el, name, val) {
    if(val) {
        return el.setAttribute('data-'+name, val);
    }
}