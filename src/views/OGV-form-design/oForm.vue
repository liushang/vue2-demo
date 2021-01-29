<template>
<oFormRender :config="config"></oFormRender>
</template>

<script>
export default {
  data() {
    return {
      config: [ {
          name: 'oButton',
          children: ['确定123'],
          props: {
            on: {
              click() {
                console.log('我是obutton的click')
              }
            }
          },
          span: 4,
        }, {
          name: 'oInput',
          children: [],
          // props: {
          //   form: {
          //     a: 1
          //   },
          //   keyword: 'a'
          // },
          span: 3,
          offset: 7
        }, {
          name: 'oHtml',
          props: {},
          subName: 'div',
          children: [
            '1', '2'
          ],
          // props: {
          //   form: {
          //     a: 1
          //   },
          //   keyword: 'a'
          // },
          span: 3,
          offset: 7
        }
      ]
    }
  }
}
</script>

<style>

</style>