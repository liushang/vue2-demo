// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            style: {
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
            default: () => ['确定']
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
    computed: {
        ...computed,
        configComponents() {
            return {
              children: [{
                  name: 'el-button',
                  style: Object.assign(this.style, this.styles),
                  attrs: Object.assign({
                      size: 'small',
                      type: 'primary',
                  }, this.attrs),
                  ref: 'oButton',
                  jNode: 'oButton',
                  on: {
                      click: e => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('啊啊啊啊啊啊啊啊啊啊按钮')
                          console.log(this)
                          this.$root.$emit('DEAL_CHOOSE', this)
                      },
                      ...this.on
                  },
                  props: {
                    rawId: this.rawId
                  },
                  nativeOn: {
                    // click: () => {
                    //   console.log('啊啊啊啊啊啊啊啊啊啊啊啊')
                    //   this.$root.$emit('DEAL_CHOOSE', this)
                    // },
                  },
                  children: this.children
              }]
            }
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
    },
    mounted() {
        console.log(this.$refs.myRef)
        console.log('this.on')
        console.log(this.on)
    }
};
export default base
