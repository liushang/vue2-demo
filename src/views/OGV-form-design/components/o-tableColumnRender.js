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
          default: () => {}
      },
      children: {
          type: Array,
          default: () => []
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
        click() {
          console.log('啊啊啊啊啊啊啊啊啊啊啊啊column')
          this.$root.$emit('DEAL_CHOOSE', this)
        },
    },
    computed: {
      ...computed,
      configComponents() {
        return {
            // children: [{
            //     // 为了展示边框选中态特意加的
            //     name: 'span',
            //     on: {
            //         click: e => {
            //           e.preventDefault()
            //           e.stopPropagation()
            //           console.log('column')
            //           this.$root.$emit('DEAL_CHOOSE', this)
            //         },
            //     },
                children: [{
                    name: 'el-table-column',
                    attr: this.attrs,
                    style: Object.assign(this.style, this.styles),
                    ref: 'oTableColumn',
                    on: {
                      click: this.click,
                        ...this.on
                    },
                    nativeOn: {
                      click: () => {
                        console.log('啊啊啊啊啊啊啊啊啊啊啊啊column')
                        this.$root.$emit('DEAL_CHOOSE', this)
                      },
                    },
                    children: this.children
                }]
            // }]
        }
      },
    },
    created() {
    },
    mounted() {
    }
};
export default base
