// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
          style: {
            border: '1px solid #409EFF'
          }
        }
    },
    props: {
      form: {
        type: Object,
        default: () => {}
      },
      attrs: {
        type: Object,
        default: () => {
          return {
            // 'label-width': '100px',
          }
        }
      },
      children: {
        type: Array,
        default: () => ['确定']
      },
      styles: {
        type: Object,
        default: () => {}
      },
      rawId: {
        type: Number,
        default: 0
      },
    },
    render,
    methods: {
        change() {
            console.log('我是change');
        },
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: [{
              name: 'el-form-item',
              ref: 'oFormItem',
              on: {
                click: () => {
                  console.log('心疼的感觉')
                }
              },
              attrs: {
                model: this.form,
                // labelWidth: this.labelWidth,
                ...this.attrs
              },
              style: Object.assign(this.style, this.styles),
              props: {
                value: this.value
              },
              children: this.children
          }]
        }
      },
    },
    mounted() {}
};
export default base