<template>
  <div class="progress-bar">
    <div
      class="progress-bar-outer"
      @touchstart.stop.prevent="onTouchStart"
      @touchmove.stop.prevent="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div class="progress-bar-inner" ref="progressBarInner">
        <!-- TODO: 添加加载进度条 -->
        <!-- <div class="progress-load"></div> -->
        <div class="progress-play" ref="progressPlay" :style="{width: progressWidth}">
          <i class="play-dot" :style="{left: dotLeft}" ref="dot"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    percent: { type: Number, default: 60 }
  },
  data() {
    return {
      dotLeft: "-4px",
      progressWidth: 0,
      touch: {},
      ismoving: false
    };
  },
  mounted() {
    this.progressAllWidth = this.$refs.progressBarInner.clientWidth;
  },
  watch: {
    percent(newVal) {
      if (this.ismoving) {
        return;
      }
      this.progressWidth = newVal + "%";
      let progressAllWidth = this.$refs.progressBarInner.clientWidth;

      this.dotLeft = -4 + (progressAllWidth * newVal) / 100 + "px";
    },
    touch(newVal) {
      this._moveProgressAndDot(newVal);
    }
  },
  methods: {
    onTouchStart(e) {
      this.ismoving = true;
      this.touch = e.touches[0].pageX;
    },
    onTouchMove(e) {
      this.touch = e.touches[0].pageX;
    },
    onTouchEnd(e) {
      this.ismoving = false;
      this._changePercent();
    },
    _changePercent() {
      let progressPlayWidth = this.$refs.progressPlay.clientWidth;
      let progressAllWidth = this.$refs.progressBarInner.clientWidth;
      let percent = progressPlayWidth / progressAllWidth;
      this.$emit("percentChange", percent);//此事件只会在手动拉动进度条时触发
    },
    _moveProgressAndDot(x) {
      let left = this.$refs.progressBarInner.offsetLeft;
      let progressAllWidth = this.$refs.progressBarInner.clientWidth;

      let moveLeft = x - left,
        widthPercent = (x - left) / progressAllWidth;
      if (moveLeft < 0) {
        moveLeft = 0;
        widthPercent = 0;
      } else if (moveLeft > progressAllWidth) {
        moveLeft = progressAllWidth;
        widthPercent = 1;
      }
      this.$refs.dot.style.left = moveLeft + "px";
      this.$refs.progressPlay.style.width = 100 * widthPercent + "%";
    }
  }
};
</script>

<style lang="stylus" scoped>
.progress-bar {
  display: flex;
  align-items: center;
  height: 10px;

  .progress-bar-outer {
    width: 80%;
    margin: 0 auto;
    padding: 6px 0;

    // background rgba(225,225,225,.8)
    .progress-bar-inner {
      width: 100%;
      height: 3px;
      position: relative;
      background: rgba(225, 225, 225, 0.5);

      .progress-play {
        height: 3px;
        width: 50%;
        background: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: flex-end;
        align-items: center;

        .play-dot {
          position: absolute;
          left: -4px;
          top: -4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 1);
        }
      }
    }
  }
}
</style>