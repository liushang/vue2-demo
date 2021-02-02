// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '313',
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
              children: [1]
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
                  blur: this.updateMsg,
                  // input: this.input
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
