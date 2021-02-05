// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
          style: {
            border: '1px solid #409EFF',
            'min-height': '200px',
          },
          attr: {
            size: 'small',
            'label-width': '74px',
            'min-height': '200px'
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
            size: 'small',
            'label-width': '74px',
            'min-height': '200px'
          }
        }
      },
      nativeOn: {
        type: Object,
        default: () => {}
      },
      children: {
        type: Array,
        default: () => []
      },
      renderFun: {
        type: Function,
        default: x => x
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
    provide: {
      colInject: [3123, 123,12312]
    },
    inject: ['oformInject'],
    computed: {
      ...computed,
      configComponents() {
        return {
          children: this.renderFun([{
              name: 'el-form',
              ref: 'oForm',
              on: {
                  click: e => {
                    e.preventDefault()
                    e.stopPropagation()
                    this.$root.$emit('DEAL_CHOOSE', this)
                },
                ...this.on
              },
              attrs: {
                model: this.form,
                ...this.attrs
              },
              nativeOn: {
                click: () => {
                  console.log('啊啊啊啊啊啊啊啊啊啊啊啊')
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
                ...this.nativeOn
              },
              style: Object.assign(this.style, this.styles),
              props: {
                value: this.value,
                rawId: this.rawId
              },
              children: this.children
          }])
        }
      },
    },
    mounted() {}
};
export default base