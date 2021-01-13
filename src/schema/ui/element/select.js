import OgvConfig from '../../confData';
class ConfInstance extends OgvConfig {
    constructor(env) {
        super(env);
        this.componentConfig = this.dealWithConfig(this.config);
    }
    dealWithItem(i) {
        return {
            props: {
                keyword: i.keyword,
                formData: this.formData
            },
            on: {
                change: i.onchange
            }
        };
    }
    dealWithConfig(children) {
        // type: 不带则自动接入el-form-item属性
        // 目标传参
        // let distinction = [{
        //     name: 'el-input',
        //     keyword: 'a',
        //     label: '123',
        // }]
        return children.map(i => {
            return {
                name: 'el-form-item',
                attrs: {
                    label: i.label,
                    ...i.item.attrs
                },
                props: i.item.props,
                children: [
                    this.dealWithItem(i)
                ]
            };
        });
    }
}
export default ConfInstance;