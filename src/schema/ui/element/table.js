import OgvFunc from '../../design';
import { analysisData } from '../../util';
export default {
    ...OgvFunc,
    props: {
        configComponents: {
            type: Object,
            default: () => {
                return {
                    name: 'oTable',
                    children: [ {
                        name: 'el-table',
                        children: []
                    } ]
                };
            }
        }
    },
    mounted() {
        console.log('2342347209347820-37423');
        console.log(this);
        this.configData = analysisData.call(this, this.configComponents.children);
    }
};