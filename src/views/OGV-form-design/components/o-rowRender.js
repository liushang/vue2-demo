// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            style: {
                border: '1px solid #409EFF',
                'min-height': '40px'
            }
        }
    },
    props: {
      on: {
          type: Object,
          default: () => {}
      },
      attrs: {
          type: Object,
          default: () => {}
      },
      children: {
          type: Array,
          default: () => [{
              name: 'el-col',
              attrs: {
                  span: 4
              },
              children: []
          }]
      },
      styles: {
          type: Object,
          default: () => {}
      },
    },
    render,
    methods: {
        updateMsg() {
        },
        click() {
          console.log('啊啊啊啊啊啊啊啊啊啊啊啊')
        },
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: [{
              name: 'el-row',
              attr: this.attrs,
              style: Object.assign(this.style, this.styles),
              ref: 'oRow',
              on: {
                click: this.click,
                  ...this.on
              },
              nativeOn: {
                click: () => {
                  console.log('啊啊啊啊啊啊啊啊啊啊啊啊')
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
              },
              children: this.children
          }]
        }
      },
    },
    created() {
    },
    mounted() {
    }
};
export default base
