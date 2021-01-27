// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { created, render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            configComponents: {
                children: [{
                    name: 'el-input',
                    attr: {
                        size: 'small',
                        type: 'primary',
                    },
                    ref: 'oInput',
                    on: {
                        blur: this.updateMsg,
                        input: this.input
                    },
                    props: {
                      value: 12312312312312
                    },
                    // domProps: {
                    //   value: 12
                    // },
                    children: [ '确定', {
                        name: 'span',
                    } ]
                }]
            },
            value: '313',
            llvalue: '313',
        }
    },
    // value: 213,
    // props: ['value'],
    render,
    methods: {
        updateMsg() {
            console.log('updateMsg');
            console.log(this.configData)
        },
        change() {
            console.log('我是change');
            console.log(this.configData);
        },
        input(event) {
          console.log(event)
          this.$emit('input', event)
          this.configComponents.children[0].props.value = event
          console.log(this)
        }
    },
    computed,
    mounted() {
        console.log(this.$refs.myRef)
        setTimeout(() => {
          this.configComponents.children[0].props.value = 2
          // console.log(this.$refs.oInput.props.value = 234)
        }, 2000)
    }
};
let oButton = config => {
    if (config) {
        // 根据配置增强基础配置
        return deal(config, base)
    } else {
        // 输出基础配置
        console.log(base)
        return base
    }
}
export default oButton()
