import OgvConfig from '../../confData';
class ConfInstance extends OgvConfig {
    constructor(env) {
        super(env);
        console.log(this);
        console.log(this.dataConfig);
        this.componentConfig = this.dealWithConfig(this.dataConfig);
    }
    dealWithItem(i) {
        let item = {
            props: {
                keyword: i.keyword,
                formData: this.data,
                ...i
            },
            on: {},
            children: [],
            name: i.name
        };
        for (let y in i) {
            if (y.startsWith('on')) {
                // console.log(i[y]);
                item.on[y.split('on')[1].toLowerCase()] = i[y];
            }
        }
        console.log(item);
        return item;
    }
    dealWithConfig(children) {
        // type: 不带则自动接入el-form-item属性
        // 目标传参
        let rowArr = [];
        let tempItem = {
            name: 'el-row',
            attr: {
                $span: '24'
            },
            children: []
        };
        let colCom = 0;
        for (let i = 0; i < children.length; i++) {
            let item = {
                name: 'el-col',
                attr: {
                    span: children[i].span
                },
                children: [{
                    name: 'el-form-item',
                    attr: {
                        label: children[i].label,
                        ...((children[i].item && children[i].item.attr) || {})
                    },
                    children: [
                        this.dealWithItem(children[i])
                    ]
                }]
            };
            if (!children[i].span) {
                rowArr.push(item);
                tempItem = JSON.parse(JSON.stringify({
                    name: 'el-row',
                    attr: {
                        $span: '24'
                    },
                    children: []
                }));
            } else {
                colCom += children[i].span;
                if (colCom > 24) {
                    rowArr.push(tempItem);
                    tempItem = JSON.parse(JSON.stringify({
                        name: 'el-row',
                        attr: {
                            $span: '24'
                        },
                        children: [ item ]
                    }));
                    colCom = children[i].span;
                } else {
                    tempItem.children.push(item);
                }
            }
        }
        if (tempItem) {
            rowArr.push(tempItem);
        }
        // children = children.map(i => {
        //     let item = {
        //         name: 'el-form-item',
        //         attr: {
        //             label: i.label,
        //             ...((i.item && i.item.attr) || {})
        //         },
        //         children: [
        //             this.dealWithItem(i)
        //         ]
        //     };
        //     if (!i.span) {
        //     } else {
        //         return {
        //             name: 'el-row',
        //             attr: {
        //                 $span: "24"
        //             }
        //         }
        //     }
        // });
        console.log('children123123123123');
        console.log(rowArr);
        return {
            name: 'div',
            children: rowArr
        };
    }
}
export default ConfInstance;