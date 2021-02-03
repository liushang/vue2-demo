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
          default: () => {
            return {
              span: 10,
              offset: 2
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
      rawId: {
        type: Number,
        default: 0
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
