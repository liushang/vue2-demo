// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '313',
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
          default: () => ['确定', ',']
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
              name: 'el-col',
              attr: this.attrs,
              style: Object.assign(this.style, this.styles),
              ref: 'oCol',
              on: {
                  blur: this.updateMsg,
                //   input: this.input
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
