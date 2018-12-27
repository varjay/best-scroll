# Best Scroll ![version](https://img.shields.io/badge/version-%20v2.2.0%20-green.svg) ![vue](https://img.shields.io/badge/vue-%20v2.1%20-green.svg) 

## How to use

#### NPM
```js
npm i best-scroll -S
```
#### js
```js
import Vue from 'vue'
import scroll from 'best-scroll'
Vue.use(scroll)
```

#### vue
```html
<scroll 
  :on-refresh="refresh"
  :on-infinite="infinite">
  <!-- content goes here -->
</scroll>
```

## API

#### Scroll component attributes:

| Attr. Name | Description | Required | Default Value |
|-----|-----|-----|-----|
| onRefresh | pull to refresh callback | N | - |
| onInfinite | infinite loading callback | N | - |
| onScroll | Y-axis position callback | N | - |
| scrollingComplete | scroll end callback | N | 滚动完毕回调 |
| refreshText | tips of `pull-to-refresh` | N | 下拉刷新 |
| noDataText | tips of `no-more-data` when `infinite-loading` finished | N | 没有更多数据 |
| width | scroll container width | N | `100%` |
| height | scroll container height | N | `100%` |
| snapping | enable snapping mode | N | `false` |
| snappingWidth | snapping width | N | 100 (stand for 100px) |
| snappingHeight | snapping height | N | 100 |
| refreshLayerColor | text color of `pull-to-refresh` layer | N | #AAA |
| loadingLayerColor | text color of `infinite-loading` layer | N | #AAA |
| minContentHeight | min content height (px) of `scroll-content` | N | 0 |

#### Scroll vm instance methods:

- `resize()` resize scroll content (**deprecated, cause the scroll's content resizes self automatically**)
- `triggerPullToRefresh()` start pull-to-refresh manually
- `finishPullToRefresh()` stop pull-to-refresh
- `finishInfinite(isNoMoreData :Boolean)` stop infinite-loading
- `scrollTo(x:Integer, y:Integer, animate:Boolean)` scroll to a position in scroll content
- `scrollBy(x:Integer, y:Integer, animate:Boolean)` scroll by a position in scroll content
- `getPosition :Object` get current position of scroll content
- `scrollElement(el, time, offsetX, offsetY, easing)` 
- `disable()` disable scrolling
- `enable()` enable scrolling
