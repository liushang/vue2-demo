import indexIns from './o-button';
import { analysisRenderConfig, deepClone1 } from '../../../schema/util';
let configComponents = {
    children: [{
        name: 'el-button',
        attrs: {
            size: 'small',
            type: 'primary'
        },
        children: [ '确定', {
            name: 'span',
            children: [ '123' ]
        } ]
    }]
}
let oButton =  {
    data() {
        return {
            configComponents,
            configData: [],
            controlData: {}
        };
    },
    render(h) {
        let configArr = analysisRenderConfig(this.configData, h); 
        return h(
            'div',
            {
                attrs: {
                    class: 'foo'
                }
            },
            configArr
        )
    },
    methods: {
        updateMsg() {
            console.log('updateMsg');
        },
        change() {
            console.log('我是change');
            console.log(this.formOne);
        },
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
                // let id = 0;
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
        this.configData = this.analysisData(this.configComponents.children);
    }
};
export default oButton