import Vue from 'vue';
import { analysisConfig } from './util';
function getComponent(callBack, { path, delay = 1 }, param) {
    // setTimeout(() => {
    callBack(require([ `${path}` ], param));
    // }, delay);
}
let template = `<div ref='ogvDesign'></div>`;
// let configJson = [{
//     name: 'seasonList',
//     path: './views/season-list'
// }, {
//     name: 'timeLine',
//     path: './views/time-line'
// }];
function dealConfigJSON(configJson) {
    let components = {};
    for (let i of configJson) {
        if (i.path) {
            components[i.name] = resolve => {
                getComponent(() => {
                }, i, resolve);
            };
        }
        // components[i.name] = resolve => require([i.path], resolve);
    }
    console.log(components);
    return components;
}
// console.log(dealConfigJSON(configJson));
// let components = dealConfigJSON(configJson);
// let components = {};
// components[configJson[0].name] = resolve => require(['./views/season-list'], resolve);
// console.log(components);
//     [configJson.name]: resolve => require(['./views/season-list'], resolve)
// };

export default {
    template,
    props: {
        // 数据配置
        configData: {
            type: Array,
            default: () => []
        },
        // 初始化组件注册 用于业务组件注册
        registerConfig: {
            type: Array,
            default: () => []
        }
    },
    // 组件实例数据
    data() {
        return {
            firstName: 'Walter',
            lastName: 'White',
            alias: 'Heisenberg'
        };
    },
    mounted() {
        // 编译
        console.log('compile');
        this.compile();
    },
    methods: {
        compile() {
            console.log(this.registerConfig);
            const useConfig = [ 'aaa', 'el-row' ];
            const Component = Vue.extend({
                template: `<div>${analysisConfig(this.configData)}</div>`,
                components: dealConfigJSON(this.registerConfig),
                data: function () {
                    return {
                        useConfig
                    };
                }
            });
            const componentInstance = new Component().$mount();
            this.$refs['ogvDesign'].appendChild(componentInstance.$el);
        }
    }
};