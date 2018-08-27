<template>
  <div class="index-list">
    <scroll ref="indexList" :on-scroll="scrollEvent">
      <div class="index-list-content" ref="content">
        <ul ref="groups">
          <li v-for="(group,i) in data" :key="i" ref="listGroup">
            <h2 class="index-list-anchor" v-if="group.name">{{group.name}}</h2>
            <div class="contents">
                <div class="contents-box" v-for="(item,i) in group.items" :key="i">
                  {{item.name}}
                </div>
            </div>
          </li>
        </ul>
      </div>
    </scroll>
    <div class="index-list-nav" @touchstart="onShortcutTouchStart" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item, index) in shortcutList" :key="index" v-if="item" :data-index="index" :class="{active: currentIndex === index}">{{item}}</li>
      </ul>
    </div>
    <div class="index-list-fixed" ref="fixed" v-show="fixedTitle">
      {{fixedTitle}}
    </div>
  </div>
</template>

<script>
var ACTIVE_CLS = 'index-list-item_active'
var TITLE_HEIGHT = 0
var SUBTITLE_HEIGHT = 30
var ANCHOR_HEIGHT = window.innerHeight <= 480 ? 17 : 18

export default {
  props: ['data', 'type', 'check'],
  data() {
    return {
      currentIndex: 0,
      scrollY: -1,
      diff: -1,
    }
  },
  created() {
    this.probeType = 3
    this.listenScroll = true
    this.listHeight = []
    this.touch = {}
  },
  mounted() {
    setTimeout(() => {
      this._calculateHeight()
    }, 20)
  },
  computed: {
    fixedTitle() {
      return this.data[this.currentIndex]
        ? this.data[this.currentIndex].name
        : ''
    },
    shortcutList() {
      return this.data.map(group => {
        return group.name.substr(0, 1)
      })
    },
  },
  methods: {
    getData(el, name, val) {
      let prefix = 'data-'
      if (val) {
        return el.setAttribute(prefix + name, val)
      }
      return el.getAttribute(prefix + name)
    },
    scrollEvent(pos) {
      if (pos.y < 0) {
        this.scrollY = 0
        return
      }
      this.scrollY = pos.y
    },
    onShortcutTouchStart(e) {
      let anchorIndex = this.getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex
      this._scrollTo(anchorIndex)
    },
    onShortcutTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = ((this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT) | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta

      this._scrollTo(anchorIndex)
    },
    _calculateHeight() {
      var list = this.$refs.listGroup
      if (!list) {
        return
      }
      this.listHeight = []
      let height = TITLE_HEIGHT
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    _scrollTo(index) {
      if (!index && index !== 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.$refs.indexList.scrollElement(this.$refs.listGroup[index], 100)
    },
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    diff(newVal) {
      let fixedTop = newVal > 0 && newVal < SUBTITLE_HEIGHT ? newVal - SUBTITLE_HEIGHT : 0
      if (this.fixedTop === fixedTop) {
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
    },
    scrollY(n) {
      var listHeight = this.listHeight
      // 在中间部分滚动
      for (let i = 0; i < listHeight.length - 1; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (n >= height1 && n < height2) {
          this.currentIndex = i
          this.diff = height2 - n
          return
        }
      }
      // 当滚动到底部，且-newY大于最后一个元素的上限
      this.currentIndex = listHeight.length - 2
    },
  },
}
</script>
<style lang="less">
@import '../less/var.less';
.contents {
  overflow: hidden;
  .contents-box {
    height: 40px;
    display: flex;
    align-items: center;
    padding-left: 10px;
    border-bottom: 1px solid #ebebeb;
    &:last-child{
      border: none;
    }
  }
}
.index-list {
  width: 100%;
  height: 100%;
  .index-list-content {
    .index-list-anchor {
      height: 30px;
      display: flex;
      align-items: center;
      padding-left: 0.4rem;
      font-size: 0.7em;
      color: #999;
      background: #f7f7f7;
    }
    a {
      position: relative;
      padding: 0 0.7rem;
      img {
        height: 1.8em;
        width: 1.8em;
        border-radius: 50%;
        margin-right: 0.4em;
      }
    }
    .contacts-container {
      padding-left: 0.4em;
      background: white;
      margin-top: 0.6em;
      border-top: 1px solid #e9e9e9;
      a:last-child {
        .slider {
          border: none;
        }
      }
    }
  }
  .index-list-fixed {
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width: calc(100% - 0.4rem);
    font-size: 0.7em;
    display: flex;
    align-items: center;
    padding: 0;
    height: 1.5em;
    padding-left: 0.4rem;
    line-height: 1;
    color: #999;
    background: #f7f7f7;
    height: 30px;
  }
  .index-list-nav {
    position: absolute;
    z-index: 30;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-family: Helvetica;
    > ul {
      margin: 0;
      background: rgba(0, 0, 0, 0.1);
      padding: 0.5em 0;
      border-radius: 3px;
      > li {
        line-height: 1;
        text-align: center;
        font-size: 1em;
        color: #666;
        width: 2em;
        padding: 0.2em 0;
        &.active {
          color: #3b99fc;
        }
      }
    }
  }
}
.newfriend {
  position: relative;
  ins {
    position: absolute;
    width: 0.85em;
    height: 0.85em;
    background: red;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 1.75em;
    top: 0;
    em {
      font-size: 0.7em;
    }
  }
}
</style>
