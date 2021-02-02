// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
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
            default: () => {}
        },
        children: {
            type: Array,
            default: () => ['确定']
        },
        styles: {
            type: Object,
            default: () => {}
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
export default base
