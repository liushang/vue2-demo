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
          },
          basicData: {}
        }
    },
    props: {
      // 以下属性正式环境下皆为 data
      form: {
        type: Object,
        default: () => {}
      },
      attrs: {
        type: Object,
        default: () => {
          return {
            size: 'small',
          }
        }
      },
      on: {
        type: Object,
        default: () => {}
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
            'min-height': '700px'
          }
        }
      },
      rawId: {
        type: Number,
        default: 0
      },
      computed: {
        type: Object,
        default: () => {}
      },
      methods: {
        type: Object,
        default: () => {}
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
        },
        ...this.methods
    },
    provide() {
      return {
        rootId: this.rawId
      }
    },
    inject: {
      containerInject: {
        default: () => {}
      }
    },
    computed: {
      ...computed,
      ...this.computed,
      configComponents() {
        for (let i in this.on) {
          let func = this.on[i]
          this.on[i] = (e) => {
              return func(e, this)
          }
        }
        return {
          children: this.renderFun([{
              name: 'el-row',
              ref: 'oContainer',
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
                  if (!this.containerInject[this.rawId]) {
                    this.$set(this.containerInject, this.rawId, {})
                  }
                  if (!this.containerInject[this.rawId].methods) {
                    this.$set(this.containerInject[this.rawId], 'methods', this.methods)
                  }
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
    mounted() {
      this.on['mounted'](this)
    }
};
export default base