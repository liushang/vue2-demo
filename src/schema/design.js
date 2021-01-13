
import { analysisData, analysisRenderConfig } from './util';
export default {
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
        );
    },
    data() {
        return {
            configData: [],
            controlData: {}
        };
    },
    mounted() {
        console.log('2342347209347820-37423');
        console.log(this);
        this.configData = analysisData.call(this, this.configComponents.children);
    }
};