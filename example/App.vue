 <template>
  <div id="app">
    <span @click="scrollToElement(1)">移动到位置1</span>
    <span @click="scrollToElement(2)">移动到位置2</span>
    <div style="height: 50vh;width: 200px;overflow: hidden;position: relative;background: #aaa;">
      <scroller ref="scroll">
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
      </scroller>
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
      this.$refs.scroll.scrollElement(this.$refs['element' + i])
    }
  }
}
</script>

<style lang="scss" scoped>
.hello {
  width: 600px;
  margin: 0 auto;
  font-size: 14px;
}
</style>

