import Vue from 'vue';
import ElementKeyword from './ui/element/keyword';
import StandardKeyword from './ui/standardKeywords';
import { toSeparator } from './util';
import ogvdesign from './ogvdesign';
import oTable from './ui/element/table.js';
class OGVSchema {
    constructor() {
        setTimeout(() => {
            this.uiLibraryGather = this.getUiLbraryGather();
            this.setUiKeywordMap(this.uiLibraryGather);
            window.OGVSchema = this;
            console.log('window ogvschema');
            console.log(window.OGVSchema);
        }, 0);
    }
    install(app, options) {
        Vue.component('ogvdesign', Vue.extend(ogvdesign));
        console.log('install');
        console.log(oTable);
        Vue.component('oTable', oTable);
        // const MyComponent = app.component('ElRow', {});
        // console.log(MyComponent.options);
        // window.OGVSchema = this;
        // console.log('window ogvschema');
        // console.log(window.OGVSchema);
    }
    getUiLbraryGather() {
        console.log(Vue.options);
        const { components } = Vue.options;
        const elementUiComponents = {};
        // const elementUiComponents = components.filter(i => i.startsWith(''))
        for (let i in components) {
            if (i.startsWith('El')) {
                const uiName = i.split('El')[1];
                const separatorUiName = toSeparator(uiName);
                if (ElementKeyword.components[separatorUiName]) {
                    elementUiComponents[separatorUiName] = components[i];
                }
            }
        }
        return {
            elementUi: elementUiComponents
        };
    }
    setUiKeywordMap(uiLibraryGather) {
        let uiKeywordMap = {};
        const elementUiKeyword = ElementKeyword.components;
        const standardKeywords = StandardKeyword.components;
        for (let i in uiLibraryGather) {
            uiKeywordMap[i] = {};
            if (i === 'elementUi') {
                for (let y in uiLibraryGather[i]) {
                    if (elementUiKeyword[y]) {
                        let keywords = standardKeywords[y];
                        keywords.keyMap = elementUiKeyword[y].keywords;
                        uiLibraryGather[i][y].OGV_standardMap = keywords;
                    }
                }
            }
        }
    }
}
let ogvSchema = new OGVSchema();
export default ogvSchema;