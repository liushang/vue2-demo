import OgvConfig from '../../../schema/confData';
class ConfInstance extends OgvConfig {
    constructor(env) {
        super(env);
        this.config = this.registerConfig();
    }
    registerConfig() {
        return {
            name: 'div',
            children: [{
                name: 'el-breadcrumb',
                attr: {
                    'separator-class': 'el-icon-anti-right'
                },
                children: [{
                    name: 'el-button',
                    children: [ '番剧列表' ]
                }, {
                    name: 'el-button',
                    attrs: {
                        size: 'small',
                        type: 'primary'
                    },
                    children: [ '确定' ]
                }]
            }]
        };
    }
}
export default ConfInstance;