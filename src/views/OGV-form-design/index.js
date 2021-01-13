import OgvConfig from '../../schema/confData';
class ConfInstance extends OgvConfig {
    constructor(env) {
        super(env);
        this.config = this.registerConfig();
    }
    registerConfig() {
        return {
            name: 'div',
            children: [{
                vFor: this.vForArr,
                props: {},
                name: 'el-breadcrumb',
                attr: {
                    'separator-class': 'el-icon-anti-right'
                },
                children: [{
                    name: 'el-breadcrumb-item',
                    children: [ '番剧列表' ]
                }, {
                    name: 'el-button',
                    attrs: {
                        size: 'small'
                    },
                    children: [ '确定' ]
                }]
            }, {
                name: 'el-row',
                children: [{
                    name: 'el-form',
                    vIf: this.clientShow,
                    attrs: {
                        size: 'small'
                    },
                    children: [{
                        name: 'oForm',
                        attr: {
                            $formData: this.formOne,
                            $formConfig: [
                                ...this.vForArr.map(x => {
                                    return {
                                        name: 'oSelect',
                                        keyword: 'select1',
                                        // select初始列表
                                        optionList: [ {
                                            label: '1',
                                            value: 1
                                        }, {
                                            label: '2',
                                            value: 2
                                        }],
                                        // change事件
                                        onChange: this.change,
                                        // 长度
                                        span: 8,
                                        // label
                                        label: '下拉列表'
                                    };
                                })]
                        },
                        children: []
                    }]
                }]
            }]
        };
    }
}
export default ConfInstance;
// export default function (vm) {
//     return {
//         name: 'div',
//         children: [{
//             name: 'el-breadcrumb',
//             attrs: {
//                 'separator-class': 'el-icon-anti-right'
//             },
//             children: [{
//                 name: 'el-breadcrumb-item',
//                 children: [ '番剧列表' ]
//             }]
//         }, {
//             name: 'el-row',
//             children: [{
//                 name: 'el-form',
//                 vIf: vm.clientShow,
//                 params: {
//                     attrs: {
//                         size: 'small'
//                     },
//                     props: {
//                         class: {
//                             'filter-form': true
//                         },
//                         inline: true,
//                         model: vm.filter
//                     }
//                 },
//                 children: [{
//                     name: 'el-form-item',
//                     children: [{
//                         name: 'el-button',
//                         children: [ '添加···' ]
//                     }]
//                 }, {
//                     name: 'oSelect',
//                     params: {
//                         props: {
//                             formData: vm.formData,
//                             keyword: 'select'
//                         },
//                         nativeOn: {
//                             ccc(e) {
//                                 console.log('nativeOn');
//                                 console.log(e);
//                             }
//                         },
//                         on: {
//                             cc(e) {
//                                 console.log('ononononono');
//                                 console.log(e);
//                             }
//                         }
//                     },
//                     // onEvent: this.updateMsg,
//                     children: [{
//                         name: 'el-button',
//                         children: [ '添加···' ]
//                     }]
//                 }, {
//                     name: 'el-form-item',
//                     params: {
//                         attrs: {
//                             label: '关键字'
//                         }
//                     },
//                     children: [{
//                         name: 'el-input',
//                         params: {
//                             attrs: {
//                                 type: 'primary'
//                             },
//                             domProps: {
//                                 value: vm.value
//                             },
//                             on: {
//                                 input: function (event) {
//                                     vm.$emit('input', event.target.value);
//                                 }
//                             }
//                         }
//                     }]
//                 }, {
//                     name: 'el-form-item',
//                     params: {
//                         attrs: {
//                             label: '版权地区'
//                         }
//                     },
//                     children: [{
//                         name: 'el-select',
//                         params: {
//                             // domProps: {
//                             //     value: 123123
//                             // },
//                             props: {
//                                 value: vm.value
//                             },
//                             on: {
//                                 change(e) {
//                                     console.log(e);
//                                 },
//                                 click(e) {
//                                     console.log('click');
//                                 }
//                             }
//                         },
//                         children: [{
//                             name: 'el-option',
//                             params: {
//                                 on: {
//                                     input(e) {
//                                         console.log(e);
//                                         vm.$emit('input', event.target.value);
//                                     },
//                                     click(e) {
//                                         console.log('click');
//                                     }
//                                 },
//                                 props: {
//                                     value: 2
//                                 }
//                             },
//                             children: [],
//                             vFor: [ {
//                                 label: '标签1',
//                                 value: 1
//                             }, {
//                                 label: '标签2',
//                                 value: 2
//                             } ]
//                         }]
//                     }]
//                 }]
//             }]
//         }]
//     };
// }