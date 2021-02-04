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
            'label-width': '100px',
          }
        }
      },
      children: {
        type: Array,
        default: () => []
      },
      styles: {
        type: Object,
        default: () => {
          return {
          }
        }
      },
      rawId: {
        type: Number,
        default: 0
      },
    },
    render,
    methods: {
        updateMsg() {
            console.log('updateMsg');
        },
        change() {
            console.log('我是change');
        },
        input(event) {
          this.value = event
        },
        submit(e) {
          console.log('submit');
          console.log(e)
        }
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: [{
              name: 'el-form',
              ref: 'oForm',
              on: {
                  blur: this.updateMsg,
                  input: this.input
              },
              attrs: {
                model: this.form,
                ...this.attrs
              },
              style: Object.assign(this.style, this.styles),
              props: {
                value: this.value,
                rawId: this.rawId
              },
              children: this.children
          }]
        }
      },
    },
    mounted() {}
};
export default base