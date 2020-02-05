<template>
<div>
  <div class="slider-wrapper">
    <slider v-if="focus.length">
      <!--防止出现未有数据时候无法正确获取slider的宽度-->
      <div v-for="pic in focus">
        <a href="javascript:;">
          <img v-bind:src="pic.pic_info.url" />
        </a>
      </div>
    </slider>
  </div>
  <!-- <div>
    <section>
      <section class="title">
        <h2 class="text-h">官方歌单</h2>
        <a class="text-small">更多</a>
      </section>
      <section>
        <section class="mui-list-wrapper">
          <ul class="mui-list-horizontal">
            <li v-for="item in 5" :key="item">
              <div class="mui-list-box">
                <div class="mui-list-media">
                  <img
                    class="mui-list-cover"
                    src="http://qpic.y.qq.com/music_cover/xiabfMZAmQ0PYUzgCvOicArIoGLzqL3n6q3fDiawWkhTTVWgGNM52HBNA/300?n=1"
                  />
                  <div class="mui-list-count">723.1万</div>
                </div>
                <div class="mui-list-bd">
                  <h3 class="text-small"></h3>
                </div>
              </div>
            </li>
          </ul>
        </section>
      </section>
    </section>
  </div> -->
</div>
</template>

<script>
import { getRecommend } from "@/api/recommend";
import Slider from "@/base/slider/slider";

export default {
  components: {
    Slider
  },
  data() {
    return {
      focus: []
    };
  },
  created() {
    console.log("created");
    this._getRecommend();
  },
  methods: {
    _getRecommend() {
      getRecommend().then(data => {
        console.log(data);

        if (data.response.code === 0) {
          this.focus = data.response.focus.data.content;
          console.log(this.focus);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/stylus/variable.styl';

.text-h {
  color: $color-text-h;
}

h2 {
  font-size: 0.18rem;
}
</style>>
    
