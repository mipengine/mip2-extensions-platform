<template>
  <div class="line-word">
    <div class="line-left"/>
    <div class="word-content">{{ lineContent }}</div>
    <div class="line-right"/>
  </div>
</template>

<script>
export default {
  props: {
    'line-content': {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../less/const';

.line-word {
  display: flex;
  /*padding: 0 0.5rem;*/
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  .line-left,
  .line-right {
    width: 27%;
    /*padding: 0 0.6rem;*/
    border: 0.01rem solid @color-text-p;
  }

  .word-content {
    width: 27%;
    font-size: 12px;
    color: #bababa;
    // color: @f-color3;
  }
}

</style>
