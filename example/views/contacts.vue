<template>
  <div>
    <contactslist :data="datas"></contactslist>
  </div>
</template>
<script>
import contactslist from '../components/contact-list.vue'
export default {
  components: {
    contactslist,
  },
  data() {
    return {
      datas: [
        {
          items: [
            {
              "name": 'A 元素1',
            },
            {
              "name": 'A 元素2',
            },
            {
              "name": 'A 元素3',
            },
            {
              "name": 'A 元素4',
            },
            {
              "name": 'A 元素5',
            },
          ],
          name: 'A',
        },
        {
          items: [
            {
              "name": 'B 元素',
            },
          ],
          name: 'B',
        },
        {
          items: [
            {
              "name": 'C 元素',
            },
          ],
          name: 'C',
        },
        {
          items: [
            {
              "name": 'D 元素',
            },
          ],
          name: 'D',
        },
        {
          items: [
            {
              "name": 'E 元素',
            },
          ],
          name: 'E',
        },
        {
          items: [
            {
              "name": 'F 元素',
            },
          ],
          name: 'F',
        },
        {
          items: [
            {
              "name": 'G 元素',
            },
          ],
          name: 'G',
        },
        {
          items: [
            {
              "name": 'H 元素',
            },
          ],
          name: 'H',
        },
        {
          items: [
            {
              "name": 'I 元素',
            },
          ],
          name: 'I',
        },
        {
          items: [
            {
              "name": 'J 元素1',
            },
            {
              "name": 'J 元素2',
            },
            {
              "name": 'J 元素3',
            },
            {
              "name": 'J 元素4',
            },
            {
              "name": 'J 元素5',
            },
          ],
          name: 'J',
        },
        {
          items: [
            {
              "name": 'K 元素',
            },
          ],
          name: 'K',
        },
        {
          items: [
            {
              "name": 'L 元素',
            },
          ],
          name: 'L',
        },
        {
          items: [
            {
              "name":  "X 元素",
            },
          ],
          name: "X"
        },
        {
          items: [
            {
              "name":  "Y 元素",
            },
          ],
          name: "Y"
        },
        {
          items: [
            {
              "name":  "Z 元素",
            },
          ],
          name: "Z"
        },
      ],
    }
  }
}
</script>