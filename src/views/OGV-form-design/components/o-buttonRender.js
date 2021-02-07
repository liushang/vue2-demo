// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
// import {
//     stringToFunc
//   } from '@/utils/db'
let base = {
    data() {
        return {
            style: {
                border: '1px solid yellow'
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
            return {}
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
    computed: {
        ...computed,
        configComponents() {
            console.log('configComponents')
            for (let i in this.on) {
                console.log(this)
                let func = this.on[i]
                this.on[i] = (e) => {
                    console.log('开始执行ooooo')
                    return func(e, this)
                }
                console.log(this.on)
            }
            return {
                children: [{
                    // 为了展示边框选中态特意加的
                    name: 'span',
                    on: {
                        click: e => {
                          e.preventDefault()
                          e.stopPropagation()
                          console.log('啊啊啊啊啊啊啊啊啊啊我是div')
                          this.$root.$emit('DEAL_CHOOSE', this)
                        },
                    },
                    children: this.renderFun([{
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
                    }])
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
