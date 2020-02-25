const timeExp = /\[(\d{2,}):(\d{2})(?:\.(\d{2,3}))?]/g
const STATE_PAUSE = 0
const STATE_PLAYING = 1

function _({
    txt,
    lineNum,
    time
}){}
export default class Lyric {
    constructor(lrc, handler = _) {
        this.lrc = lrc;
        this.lines = [];
        this.state = STATE_PAUSE;
        this.curLine = 0;
        this.handler = handler
        this._init();
    }
    _init(){
        const lines = this.lrc.split("\n");
        for(let i=0;i<lines.length;i++) {
            const line = lines[i];
            let result = timeExp.exec(line);
            if(result) {
                const txt = line.replace(timeExp, '').trim();
                if(txt) {
                    this.lines.push({
                        time:  result[1] * 60 * 1000 + result[2] * 1000 + (result[3] || 0) * 10,
                        txt
                    })
                }
            }
        }
    }
    _findCurNum(time) {
        for (let i = 0; i < this.lines.length; i++) {
          if (time <= this.lines[i].time) {
            return i
          }
        }
        return this.lines.length - 1
      }
    _callHandler(i) {
    if (i < 0) {
        return
    }
    this.handler({
        txt: this.lines[i].txt,
        lineNum: i,
        time: this.lines[i].time
    })
    }
    _playRest() {
        let line = this.lines[this.curNum]
        let delay = this.startTimestamp + line.time - (+new Date());
    
        this.timer = setTimeout(() => {
          this._callHandler(this.curNum++)
          if (this.curNum < this.lines.length && this.state === STATE_PLAYING) {
            this._playRest()
          }
        }, delay)
    }
    play(startTime = 0, skipLast){
        if(!this.lines.length) {
            return;
        }
        this.state = STATE_PLAYING;
        this.curNum = this._findCurNum(startTime);
        this.startTimestamp = +new Date() - startTime
        if (!skipLast) {
            this._callHandler(this.curNum - 1)
        }
      
        if (this.curNum < this.lines.length) {
            clearTimeout(this.timer)
            this._playRest()
        }
    }
    stop() {
        this.state = STATE_PAUSE
        clearTimeout(this.timer)
    }
    seek(offset) {
        this.play(offset)
    }
    togglePlay() {
        var now = +new Date()
        if (this.state === STATE_PLAYING) {
        this.stop()
        this.pauseStamp = now
        } else {
        this.state = STATE_PLAYING
        this.play((this.pauseStamp || now) - (this.startTimestamp || now), true)
        this.pauseStamp = 0
        }
    }
}
