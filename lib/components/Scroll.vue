<template>
  <div
    class="_v-container"
    :id="containerId"
    @touchstart="touchStart($event)"
    @touchmove="touchMove($event)"
    @touchend="touchEnd($event)"
    @mousedown="mouseDown($event)"
    @mousemove="mouseMove($event)"
    @mouseup="mouseUp($event)"
    @mousewheel="mousewheel"
  >
    <div class="_v-content" :id="contentId">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Scroller from '../module/core'
import getContentRender from '../module/render'
const re = /^[\d]+(\%)?$/
const widthAndHeightCoerce = (v) => {
  if (v[v.length - 1] != '%') return v + 'px'
  return v
}
const widthAndHeightValidator = (v) => {
  return re.test(v)
}
export default {
  props: {
    onRefresh: Function,
    onInfinite: Function,
    onScroll: Function,
    scrollingComplete: Function,
    width: {
      type: String,
      default: '100%',
      validator: widthAndHeightValidator
    },

    height: {
      type: String,
      default: '100%',
      validator: widthAndHeightValidator
    },

    snapping: {
      type: Boolean,
      default: false
    },

    snapWidth: {
      type: Number,
      default: 100
    },

    snapHeight: {
      type: Number,
      default: 100
    },

    animating: {
      type: Boolean,
      default: true
    },

    animationDuration: {
      type: Number,
      default: 250
    },

    bouncing: {
      type: Boolean,
      default: true
    },

    cssClass: String, // content css class
  },

  computed: {
    w: function () {
      return widthAndHeightCoerce(this.width)
    },

    h: function () {
      return widthAndHeightCoerce(this.height)
    },
  },

  data() {
    return {
      containerId: 'outer-' + Math.random().toString(36).substring(3, 8),
      contentId: 'inner-' + Math.random().toString(36).substring(3, 8),
      state: 0, // 0: pull to refresh, 1: release to refresh, 2: refreshing
      loadingState: 0, // 0: stop, 1: loading, 2: stopping loading

      showLoading: false,

      container: undefined,
      content: undefined,
      scroller: undefined,
      pullToRefreshLayer: undefined,
      mousedown: false,
      infiniteTimer: undefined,
      resizeTimer: undefined,
      disableMove: false,
      resultTop: 0,
    }
  },

  mounted () {
    this.container = document.getElementById(this.containerId)
    this.container.style.width = this.w
    this.container.style.height = this.h

    this.content = document.getElementById(this.contentId)
    if (this.cssClass) this.content.classList.add(this.cssClass)
    this.pullToRefreshLayer = this.content.getElementsByTagName("div")[0]

    let render = getContentRender(this.content)

    let scrollerOptions = {
      scrollingX: false
    }

    this.scroller = new Scroller(render, {
      scrollingX: false,
      snapping: this.snapping,
      animating: this.animating,
      animationDuration: this.animationDuration,
      bouncing: this.bouncing,
      scrollingComplete: this._scrollingComplete,
    })

    // enable PullToRefresh
    if (this.onRefresh) {
      this.scroller.activatePullToRefresh(60, () => {
        this.state = 1
      }, () => {
        this.state = 0
      }, () => {
        this.state = 2

        this.$on('$finishPullToRefresh', () => {
          setTimeout(() => {
            this.state = 0
            this.finishPullToRefresh()
          })
        })

        this.onRefresh(this.finishPullToRefresh)
      })
    }

    // enable infinite loading
    if (this.onInfinite) {
      this.infiniteTimer = setInterval(() => {
        let {left, top, zoom} = this.scroller.getValues()

        // 在 keep alive 中 deactivated 的组件长宽变为 0 
        if (this.content.offsetHeight > 0 && 
          top + 60 > this.content.offsetHeight - this.container.clientHeight) {
          if (this.loadingState) return
          this.loadingState = 1
          this.showLoading = true
          this.onInfinite(this.finishInfinite)
        }
      }, 10)
    }

    // enable onscroll
    if (this.onScroll) {
      let beforeTop
      this.onscrollTimer = setInterval(() => {
        let {left, top, zoom} = this.scroller.getValues()
        top = Math.round(top)
        if (beforeTop === top) {
          return
        }
        beforeTop = top
        this.onScroll({x: left,y: top})
      }, 10)
    }

    // setup scroller
    let rect = this.container.getBoundingClientRect()
    this.scroller.setPosition(rect.left + this.container.clientLeft, rect.top + this.container.clientTop)

    // snapping
    if (this.snapping) {
      // console.log(this.snapWidth, this.snapHeight)
      this.scroller.setSnapSize(this.snapWidth, this.snapHeight)
    }

    // onContentResize
    const contentSize = () => {
      return {
        width: this.content.offsetWidth,
        height: this.content.offsetHeight
      }
    }

    let { content_width, content_height } = contentSize()
    this.resizeTimer = setInterval(() => {
      let {width, height} = contentSize()
      if (width !== content_width || height !== content_height) {
        content_width = width
        content_height = height
        this.resize()
      }
    }, 10);
  },

  destroyed () {
    clearInterval(this.resizeTimer);
    if (this.infiniteTimer) clearInterval(this.infiniteTimer);
    if (this.onscrollTimer) clearInterval(this.onscrollTimer);
  },

  methods: {
    mousewheel(e) {
      if (this.resultTop === 0) {
        this.resultTop = this.scroller.__scrollTop
      }
      let speed = 10
      let wheelDeltaX
      let wheelDeltaY
      let scrollheight = this.scroller.__contentHeight - this.scroller.__clientHeight
      switch (true) {
        case 'deltaX' in e:
          if (e.deltaMode === 1) {
            wheelDeltaX = -e.deltaX * speed
            wheelDeltaY = -e.deltaY * speed
          } else {
            wheelDeltaX = -e.deltaX
            wheelDeltaY = -e.deltaY
          }
          // console.log('deltaX')
          break
        case 'wheelDeltaX' in e:
          wheelDeltaX = e.wheelDeltaX / 120 * speed
          wheelDeltaY = e.wheelDeltaY / 120 * speed
          // console.log('wheelDeltaX')
          break
        case 'wheelDelta' in e:
          wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * speed
          // console.log('wheelDelta')
          break
        case 'detail' in e:
          wheelDeltaX = wheelDeltaY = -e.detail / 3 * speed
          // console.log('detail')
          break
        default:
          return
      }
      let direction = true ? -1 : 1
      wheelDeltaX *= direction
      wheelDeltaY *= direction
      // console.log(wheelDeltaY)
      let {left, top, zoom} = this.scroller.getValues()
      this.resultTop += wheelDeltaY
      // console.log(this.resultTop)
      if (this.resultTop < 0) {
        this.resultTop = 0
      } else if (this.resultTop > scrollheight) {
        this.resultTop = scrollheight
      }
      this.scroller.scrollTo(0, this.resultTop, 500)
    },
    resize() {
      let container = this.container;
      let content = this.content;
      this.scroller.setDimensions(container.clientWidth, container.clientHeight, content.offsetWidth, content.offsetHeight);
    },

    finishPullToRefresh() {
      this.scroller.finishPullToRefresh()
    },

    finishInfinite(hideSpinner) {
      this.loadingState = hideSpinner ? 2 : 0
      this.showLoading = false

      if (this.loadingState == 2) {
        this.resetLoadingState()
      }
    },

    triggerPullToRefresh() {
      this.scroller.triggerPullToRefresh()
    },

    scrollTo(x, y, animate) {
      this.scroller.scrollTo(x, y, animate)
    },
    scrollElement(el, time=100, offsetX, offsetY, easing) {
      let y = el.offsetTop
      let x = el.offsetLeft
      this.scrollTo(x, y, time)
    },

    scrollBy(x, y, animate) {
      this.scroller.scrollBy(x, y, animate)
    },

    touchStart(e) {
      // Don't react if initial down happens on a form element
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      this.scroller.doTouchStart(e.touches, e.timeStamp)
    },

    touchMove(e) {
      if (this.disableMove) {
        return
      }
      e.preventDefault()
      this.scroller.doTouchMove(e.touches, e.timeStamp)
    },

    touchEnd(e) {
      this.scroller.doTouchEnd(e.timeStamp)
    },

    mouseDown(e) {
      // Don't react if initial down happens on a form element
      if (e.target.tagName.match(/input|textarea|select/i)) {
        return
      }
      this.scroller.doTouchStart([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp)
      this.mousedown = true
    },

    mouseMove(e) {
      if (this.disableMove) {
        return
      }
      if (!this.mousedown) {
        return
      }
      this.scroller.doTouchMove([{
        pageX: e.pageX,
        pageY: e.pageY
      }], e.timeStamp)
      this.mousedown = true
    },

    mouseUp(e) {
      if (!this.mousedown) {
        return
      }
      this.scroller.doTouchEnd(e.timeStamp)
      this.mousedown = false
    },

    // 获取位置
    getPosition() {
      let v = this.scroller.getValues()

      return {
        left: parseInt(v.left),
        top: parseInt(v.top)
      }
    },

    resetLoadingState() {
      let {left, top, zoom} = this.scroller.getValues()
      let container = this.container;
      let content = this.content;

      if (top + 60 > this.content.offsetHeight - this.container.clientHeight) {
        setTimeout(() => {
          this.resetLoadingState()
        }, 1000)
      } else {
        this.loadingState = 0
      }
    },
    // 停用滚动
    disable() {
      this.disableMove = true
    },
    enable() {
      this.disableMove = false
    },
    _scrollingComplete() {
      if (this.scrollingComplete) {
        this.scrollingComplete()
      }
    },
  }
}
</script>
<style lang="less" scoped>
._v-container {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  -o-user-select: none;
  user-select: none;
  > ._v-content {
    width: 100%;
    -webkit-transform-origin: left top;
    -webkit-transform: translateZ(0);
    -moz-transform-origin: left top;
    -moz-transform: translateZ(0);
    -ms-transform-origin: left top;
    -ms-transform: translateZ(0);
    -o-transform-origin: left top;
    -o-transform: translateZ(0);
    transform-origin: left top;
    transform: translateZ(0);
  }
}
</style>
