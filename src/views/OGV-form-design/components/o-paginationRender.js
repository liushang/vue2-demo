// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            style: {
                border: '1px solid #409EFF',
                'min-height': '40px'
            }
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
              layout: 'prev, pager, next',
              total: 50,
              'pager-size': 20,
              background: true
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
              'text-align' : 'center'
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
        click() {
          this.$root.$emit('DEAL_CHOOSE', this)
        },
    },
    inject: ['containerInject', 'rootId'],
    computed: {
      ...computed,
      configComponents() {
        return {
            children: [{
                // 为了展示边框选中态特意加的
                name: 'span',
                on: {
                    click: e => {
                      e.preventDefault()
                      e.stopPropagation()
                      this.$root.$emit('DEAL_CHOOSE', this)
                    },
                    'current-change': e => {
                      console.log('current-change')
                    }
                },
                children: [{
                    name: 'el-pagination',
                    attr: this.attrs,
                    style: Object.assign(this.style, this.styles),
                    ref: 'oPagination',
                    on: {
                      click: this.click,
                      'current-change': e => {
                        console.log('current-change')
                        console.log('当前页是', `${e}`)
                        console.log(this.$root)
                        console.log(this.containerInject[this.rootId].methods)
                        this.containerInject[this.rootId].pn = e
                        this.containerInject[this.rootId].methods.getData(this, e)
                      },
                      ...this.on
                    },
                    children: this.children
                }]
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
