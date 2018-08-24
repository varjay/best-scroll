 <template>
  <div id="app">
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
        <div ref="element">
          一个element
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
  mounted() {
    this.$refs.scroll.scrollElement(this.$refs.element)
  },
  methods: {
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

