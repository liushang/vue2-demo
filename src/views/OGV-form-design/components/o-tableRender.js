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
        default: () => {
          return {
            'a': 12
          }
        }
      },
      keyword: {
        type: String,
        default: 'a'
      },
      styles: {
        type: Object,
        default: () => {
          return {
          }
        }
      },
      attrs: {
        type: Object,
        default: () => {}
      },
      rawId: {
        type: Number,
        default: 0
      },
      children: {
        type: Array,
        default: () => ['确定']
      },
    },
    render,
    methods: {},
    inject: ['containerInject', 'rootId'],
    computed: {
      ...computed,
      val() {
        return this.containerInject[this.rootId] && this.containerInject[this.rootId].table || []
      },
      configComponents() {
        return {
          children: [{
              // 为了展示边框选中态特意加的
            name: 'span',
            attr: this.attrs,
            on: {
                click: e => {
                  e.preventDefault()
                  e.stopPropagation()
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
            },
            children: [{
              name: 'el-table',
              attrs: {
                size: 'small',
                ...this.attrs,
                data: this.val
              },
              style: Object.assign(this.style, this.styles),
              ref: 'oTable',
              props: {
                rawId: this.rawId
              },
              children: this.children
            }]
        }]
        }
      },
    },
    mounted() {
    }
};
export default base
