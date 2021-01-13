import { analysisRenderConfig, deepClone1 } from './util';
// jsx不能使用组件懒加载？
import aaa from '../views/test-component/a';
import oSelect from './ui/element/select.vue';
import oForm from './ui/element/form.vue';
// let template = `<div>${analysisConfig(this.configData)}</div>`;
// let configJson = [{
//     name: 'aaa',
//     path: './views/test-component/a'
// }, {
//     name: 'seasonList',
//     path: './views/season-list'
// }, {
//     name: 'timeLine',
//     path: './views/time-line'
// }];

// console.log(dealConfigJSON(configJson));
// let components = dealConfigJSON(configJson);
// let components = {};
// components[configJson[0].name] = resolve => require(['./views/season-list'], resolve);
// console.log(components);
//     [configJson.name]: resolve => require(['./views/season-list'], resolve)
// };

// function getComponent(callBack, { path, delay = 1 }, param) {
//     // setTimeout(() => {
//     callBack(require([ `${path}` ], param));
//     // }, delay);
// }
// function dealConfigJSON(configJson) {
//     let components = {};
//     for (let i of configJson) {
//         if (i.path) {
//             components[i.name] = resolve => {
//                 getComponent(() => {
//                 }, i, resolve);
//             };
//         }
//         // components[i.name] = resolve => require([i.path], resolve);
//     }
//     console.log(components);
//     return components;
// }
// console.log(dealConfigJSON(configJson));
// let components = dealConfigJSON(configJson);
// let components = {};
// components[configJson[0].name] = resolve => require(['./views/season-list'], resolve);
// console.log(components);

export default {
    props: {
        configComponents: {
            type: Object,
            default: () => {}
        }
        // registerConfig: {
        //     type: Array,
        //     default: () => [{
        //         name: 'aaa',
        //         path: './views/test-component/a.vue'
        //     }]
        // }
    },
    // template: `<div>${analysisConfig(this.configData)}</div>`,
    render: function (h, context) {
        console.log('configComponents');
        console.log(this.configData);
        let configArr = analysisRenderConfig(this.configData, h);
        console.log('configArr');
        console.log(configArr);
        return h(
            'div',
            {
                attrs: {
                    class: 'foo'
                }
            },
            configArr
        );
    },
    // render: function (h) {
    //     return (
    //         <aaa level={1} onClick={console.log(1231)} >
    //             <span>Hello</span> world!
    //         </aaa>
    //     );
    // },
    data: function () {
        return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg',
            configData: [],
            controlData: {}
        };
    },
    methods: {
        analysisData(configComponents, index) {
            // 构建组件数据
            const configData = [];
            console.log('configComponents');
            console.log(configComponents);
            for (let i = 0; i < configComponents.length; i++) {
                const rawData = deepClone1(configComponents[i]);
                delete rawData.children;
                console.log('rawData', rawData);
                let id = index === undefined ? 0 : index + '-' + i;
                // console.log(id);
                if (typeof configComponents[i] !== 'object') { // 简单类型
                    const childrenData = {
                        type: 'simple',
                        id,
                        value: configComponents[i],
                        raw: rawData
                    };
                    this.$set(this.controlData, id, childrenData);
                    configData.push(childrenData);
                } else {
                    const childrenData = {
                        type: 'Array',
                        id,
                        vIf: i.vIf,
                        raw: rawData
                        // value: configComponents[i].children ? this.analysisData(configComponents[i].children, id) : {
                        //     type: 'Array',
                        //     id,
                        //     vIf: i.vIf,
                        //     raw: rawData,
                        //     value: []
                        // }
                    };
                    if (configComponents[i].children) childrenData.value = this.analysisData(configComponents[i].children, id);
                    this.$set(this.controlData, id, childrenData);
                    configData.push(childrenData);
                }
            }
            return configData;
        }
    },
    mounted() {
        console.log('ogvdesignmounted');
        console.log(this.configComponents);
        this.configData = this.analysisData(this.configComponents.children);
        // console.log(this.configData);
    },
    components: {
        // aaa: resolve => { require(['./views/test-component/a.vue'], resolve); },
        aaa,
        oSelect,
        oForm
    }
};