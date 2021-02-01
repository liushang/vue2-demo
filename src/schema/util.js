import Vue from 'vue';
export function toSeparator(string, separator = '-') {
    let temp = string.replace(/[A-Z]/g, match => separator + match.toLowerCase());
    if (temp.slice(0, 1) === separator) temp = temp.slice(1);
    return temp;
}

export function deepClone1(obj) {
    // 判断拷贝的要进行深拷贝的是数组还是对象，是数组的话进行数组拷贝，对象的话进行对象拷贝
    let objClone = Array.isArray(obj) ? [] : {};
    // 进行深拷贝的不能为空，并且是对象或者是
    if (obj && typeof obj === 'object') {
        for (let key in obj) {
            if (obj.hasOwnProperty(key)) {
                if (obj[key] && typeof obj[key] === 'object') {
                    objClone[key] = deepClone1(obj[key]);
                } else {
                    objClone[key] = obj[key];
                }
            }
        }
    }
    return objClone;
}

// template字符串拼接
export function analysisConfig(configData) {
    console.log(configData);
    // let templateString = `<div><component :is="i" v-for="(i, index) in useConfig" :key="index"></component></div>`;
    let templateString = ``;
    if (!Array.isArray(configData)) configData = [ configData ];
    for (let i of configData) {
        let staticParams = '';
        if (i.staticParams) {
            for (let y in i.staticParams) {
                if (typeof i.staticParams[y] === 'boolean') {
                    staticParams += `:${y}=${i.staticParams[y]} `;
                } else if (typeof i.staticParams[y] === 'string') {
                    staticParams += `${y}="${i.staticParams[y]}" `;
                }
            }
        }
        console.log(staticParams);
        if (i.name) {
            templateString += `<${i.name} ${staticParams}>${i.children ? analysisConfig(i.children) : ''}</${i.name}>`;
        } else {
            templateString += i.value;
        }
    }
    console.log(templateString);
    return templateString;
}
// render拼接
export function analysisRenderConfig(configData, createElement) {
    if (configData) {
        let renderArr = [];
        for (let i of configData) {
            // if (i.raw.vFor && i.raw.vFor.length > 0) {
            //     for (let o = 0; o < i.raw.vFor.length; o++) {
            //         let e = JSON.parse(JSON.stringify(i));
            //         e.raw.props.value = i.raw.vFor[o].value || i.raw.vFor[o];
            //         e.raw.props.label = i.raw.vFor[o].label || i.raw.vFor[o];
            //         renderArr.push(dealChild(e, createElement));
            //     }
            // } else if (!(i.vIf && i.vIf === false)) {
            //     renderArr.push(dealChild(i, createElement));
            // }
            renderArr.push(dealChild(i, createElement));
        }
        // console.log(JSON.parse(JSON.stringify(renderArr)))
        return renderArr;
    }
}
function dealChild(child, cb) {
    if (child.vFor) {
        delete child.vFor;
    }
    if (!Array.isArray(child.value)) { // 简单类型
        return child.value;
    } else {
        let item = {
            'class': child.raw['class'],
            style: child.raw.style,
            attrs: child.raw.attrs,
            props: child.raw.props,
            domProps: child.raw.domProps,
            on: child.raw.on,
            nativeOn: child.raw.nativeOn,
            directives: child.raw.directives,
            scopedSlots: child.raw.scopedSlots,
            slot: child.raw.slot,
            key: child.raw.key,
            ref: child.raw.ref,
            refInFor: child.raw.refInFor
        };
        console.log(item)
        if (child.raw.attr) {
            let attrs = {};
            let props = {};
            for (let i in child.raw.attr) {
                if (i.startsWith('$')) {
                    props[i.slice(1)] = child.raw.attr[i];
                } else {
                    attrs[i] = child.raw.attr[i];
                }
            }
            item.attrs = Object.assign(item.attrs || {}, attrs);
            item.props = Object.assign(item.props || {}, props);
        }
        return cb(
            child.raw.name,
            item,
            analysisRenderConfig(child.value, cb)
        );
    }
}

export function dealConfigJSON(configJson) {
    console.log('dealConfigJSON');
    console.log(configJson);
    let components = {};
    for (let i of configJson) {
        components[i.name] = resolve => {
            getComponent(component => {
            }, i, resolve);
        };
        // components[i.name] = resolve => require([i.path], resolve);
    }
    return components;
}
export function getComponent(callBack, { path, delay = 1 }, param) {
    // setTimeout(() => {
    callBack(require([`${path}`], param));
    // }, delay);
}

export function analysisData(configComponents, index) {
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
            };
            if (configComponents[i].children) {
                childrenData.value = analysisData(configComponents[i].children, id);
            } else {
                childrenData.value = [];
            }
            this.$set(this.controlData, id, childrenData);
            configData.push(childrenData);
        }
    }
    return configData;
}

export function analysisDataRender(configComponents, index) {
    // 构建组件数据
    const configData = [];
    for (let i = 0; i < configComponents.length; i++) {
        const rawData = deepClone1(configComponents[i]);
        delete rawData.children;
        let id = index === undefined ? 0 : index + '-' + i;
        if (typeof configComponents[i] !== 'object') { // 简单类型
            const childrenData = {
                type: 'simple',
                id,
                value: configComponents[i],
                raw: rawData
            };
            // Vue.set(this.controlData, id, childrenData);
            configData.push(childrenData);
        } else {
            const childrenData = {
                type: 'Array',
                id,
                vIf: i.vIf,
                raw: rawData
            };
            if (configComponents[i].children) childrenData.value = analysisDataRender(configComponents[i].children, id);
            // Vue.set(this.controlData, id, childrenData);
            configData.push(childrenData);
        }
    }
    return configData;
}