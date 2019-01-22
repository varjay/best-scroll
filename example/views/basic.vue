<template>
  <div>
    <span @click="scrollToElement(1)">移动到位置1</span>
    <span @click="scrollToElement(2)">移动到位置2</span>
    <div style="height: 50vh;width: 200px;overflow: hidden;position: relative;background: #aaa;">
      <scroll ref="scroll" :onInfinite="pullingUp" :scrollingComplete="scrollingComplete" :onRefresh="onRefresh">
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        <div ref="element1">
          位置1
        </div>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        <div ref="element2">
          位置2
        </div>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
        滚动测试 <br>
      </scroll>
    </div>
  </div>
</template>
<script>
export default {
  name: 'App',
  created () {
  },
  data () {
    return {
      
    }
  },
  methods: {
    scrollToElement(i) {
      this.$refs.scroll.scrollElement(this.$refs['element' + i], 100000)
    },
    scrollingComplete() {
      console.log('aaaa')
    },
    onRefresh() {
      console.log('刷新')
    },
    pullingUp() {
      console.log('上拉加载')
    },
  }
}
</script>
