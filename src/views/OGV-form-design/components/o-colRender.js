// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '313',
            style: {
              border: '1px solid #409EFF'
            }
        }
    },
    props: {
      on: {
          type: Object,
          default: () => {}
      },
      nativeOn: {
        type: Object,
        default: () => {}
      },
      attrs: {
          type: Object,
          default: () => {
            return {
              span: 10,
            }
          }
      },
      children: {
          type: Array,
          default: () => ['确定', ',']
      },
      styles: {
        type: Object,
        default: () => {
          return {
            border: '1px solid #409EFF'
          }
        }
      },
      renderFun: {
        type: Function,
        default: x => x
      },
      rawId: {
        type: Number,
        default: 0
      },
    },
    render,
    inject: ['colInject'],
    methods: {
        updateMsg() {
        },
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: this.renderFun([{
            name: 'el-col',
            attrs: this.attrs,
            style: Object.assign(this.style, this.styles),
            ref: 'oCol',
            on: {
              ...this.on
            },
            props: {
              rawId: this.rawId
            },
            nativeOn: {
              click: e => {
                e.stopPropagation();
                console.log('啊啊啊啊啊啊啊啊啊啊啊啊')
                this.$root.$emit('DEAL_CHOOSE', this)
              },
              ...this.nativeOn
            },
            children: this.children
        }], ...this.colInject)
        }
      },
    },
    mounted() {
      console.log('privideddddddddddddd', this.colInject)
      console.log(this)
    }
};
export default base
