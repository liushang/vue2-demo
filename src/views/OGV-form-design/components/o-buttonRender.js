// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {}
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
        }
    },
    computed: {
        ...computed,
        configComponents() {
            return {
              children: [{
                  name: 'el-button',
                  attr: {
                      size: 'small',
                      type: 'primary',
                  },
                  ref: 'oButton',
                  jNode: 'oButton',
                  on: this.on,
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
// let oButton = config => {
//     if (config) {
//         // 根据配置增强基础配置
//         return deal(config, base)
//     } else {
//         // 输出基础配置
//         console.log(base)
//         return base
//     }
// }
export default base
