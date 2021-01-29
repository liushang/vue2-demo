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
        children: {
            type: Array,
            default: () => ['确定']
        },
        subName: {
          type: String,
          default: ''
        }
    },
    computed: {
        ...computed,
        configComponents() {
            return {
              children: [{
                  name: this.subName,
                  attr: {
                      size: 'small',
                      type: 'primary',
                  },
                  ref: 'oHtml',
                  jNode: 'oHtml',
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
