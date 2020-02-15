<template>
	<div class="m-header">
		<div class="icon"></div>
		<h1 class="text">QQ Music</h1>
		<router-link to="/recommend">
			<i class="icon-mine"></i>	
		</router-link>    
	</div>    
</template>

<script>
export default {
    
}
</script>

<style scoped lang="stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
    
  .m-header
    position: relative
    height 0.44rem
    text-align: center
    color: $color-theme
    // margin-top 2px
    font-size 0
    display flex
    align-items center
    justify-content center
    .icon
      display inline-block
      width 42px
      height 42px
      margin-right 9px
      bg-img('logo')
      background-size 56px 38px
    .text
      display inline-block
      font-size $font-size-large
      margin-left 3px
</style>