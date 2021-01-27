// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { created, render } from '../../../schema/api';
// let data = {
//     configComponents: {
//         children: [{
//             name: 'el-button',
//             attr: {
//                 size: 'small',
//                 type: 'primary',
//             },
//             ref: 'oButton',
//             on: {
//                 click: this.updateMsg
//             },
//             children: [ '确定', {
//                 name: 'span',
//             } ]
//         }]
//     },
//     configData: [],
// };
let base = {
    data() {
        return {
            configComponents: {
                children: [{
                    name: 'el-button',
                    attr: {
                        size: 'small',
                        type: 'primary',
                    },
                    ref: 'oButton',
                    on: {
                        click: this.updateMsg
                    },
                    children: [ '确定', {
                        name: 'span',
                    } ]
                }]
            },
            configData: [],
        }
    },
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
    },
    created,
    mounted() {
        console.log(this.$refs.myRef)
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
