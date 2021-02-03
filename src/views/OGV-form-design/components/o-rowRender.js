// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            style: {}
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
