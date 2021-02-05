import { getDefaultProps, getRawId } from '../../../schema/util'
import {
  stringToFunc
} from '@/utils/db'
import Vue from 'vue'
export default {
    data() {
        let options = [{
            value: '1',
            label: 'string'
          }, {
            value: '2',
            label: '数字'
          }, {
            value: '3',
            label: 'bool'
          }, {
            value: '4',
            label: '对象'
          }, {
            value: '5',
            label: '数组'
          }]
        const optionsArr = options.map(x => <el-option key={x.value} label={x.label} value={x.value}></el-option>)
        return {
            // 编辑对象
            modifyItem: {},
            options,
            valueTypeInitial: {
                '1': '',
                '2': 0,
                '3': false,
                '4': {},
                '5': []
            },
            valueTypeMap : {
                '1': e => <el-input v-model={e.value}  style="width: 80px" />,
                '2': e => <el-input v-model={e.value}  style="width: 80px" />,
                '3': e => <el-input v-model={e.value}  style="width: 80px" />,
                '4': e => (
                    <el-form-item label-width="40px">
                        <el-form-item>
                            {this.getValue(e, 'value')}
                        </el-form-item>
                        {e.value.hasOwnProperty('key') ? <el-button onClick={() => this.delModifyItem(e, 'value')}>取消</el-button> : <el-button onClick={() => this.addProperty(e, 'value', '4')}>新建</el-button>}
                        {/* <el-button onClick={() => this.addProperty(e, 'value', '4')}>新建</el-button> */}
                        {/* {this.rootWord === 'children' ? <el-button onClick={() => this.addSubComponent(e, 'value')}>添加子组件</el-button> : ''} */}
                    </el-form-item>
                ),
                '5': e => (
                    <el-form-item label-width="40px">
                        <el-form-item>
                            {e.value.length ? e.value.map((x, i) => this.getValue(e.value, i)) : ''}
                        </el-form-item>
                        {
                          !e.value.length ?
                          <el-button onClick={() => this.addProperty(e, 'value', '5')}>创建</el-button> :
                          e.value.hasOwnProperty('key') ? <el-button onClick={() => this.delModifyItem(e, 'value')}>取消</el-button> : <el-button onClick={() => this.addProperty(e, 'value', '5')}>新增</el-button>
                        }
                    </el-form-item>
                ),
            },
            detailValueTypeMap : {
              '1': e => <span>{e.value}</span>,
              '2': e => <span>{e.value}</span>,
              '3': e => <span>{e.value}</span>,
              '4': e => (
                  <el-form-item label-width="40px">
                      <el-form-item>
                          {this.getTrueValue(e, 'value')}
                      </el-form-item>
                  </el-form-item>
              ),
              '5': e => (
                  <el-form-item label-width="40px">
                      <el-form-item>
                          {e.value.length ? e.value.map((x, i) => this.getTrueValue(e.value, i)) : ''}
                      </el-form-item>
                  </el-form-item>
              ),
          }
        }
    },
    props: {
        activeData: {
            type: Object,
            default: () => {}
        },
        rootWord: {
            type: String,
            default: 'props'
        },
        initialTypeShow: {
          type: String,
          default: 'input'
        },
        initialType: {
          type: String,
          default: 'object'
        }
    },
    render() {
        const modifyItem = this.modifyItem
        const propertyList = this.getList(this.rootWord)
        const rootWord = this.rootWord
        return (<el-form-item label={this.rootWord}>
        {propertyList.map(x => {
            return (<el-form-item label={['string', 'number', 'boolean', 'function'].includes(typeof this.activeData[rootWord]) ? '' : x} label-width="82px">
              {['string', 'number', 'boolean'].includes(typeof this.activeData[rootWord]) && this.initialTypeShow === 'input' ? <el-input v-model={this.activeData[rootWord]} placeholder="请输入字段名（v-model）s"  style="width: 165px"/> :
                ['array', 'object'].includes(typeof this.activeData[rootWord][x]) ?
                <span onClick={() => this.analysisProperty(this.activeData, rootWord, x)}>{this.activeData[rootWord][x].name || JSON.stringify(this.activeData[rootWord][x])}</span> :
                this.initialTypeShow === 'input' ?
                <el-input v-model={this.activeData[rootWord][x]} placeholder="请输入字段名（v-model）s"  style="width: 165px"/>:
                <span onClick={() => this.analysisProperty(this.activeData, rootWord, x)}>{this.activeData[rootWord][x] ? this.activeData[rootWord][x].toString(): this.activeData[rootWord].toString()}</span>  
                }
              {
                ['string', 'number', 'boolean'].includes(typeof this.activeData[rootWord]) ? '' :
                <i class="el-icon-error" onClick={() => this.delKey(x, rootWord)} style="margin-left: 5px;color: #409EFF"/>
              }
            </el-form-item>)
        })}
        <el-form-item>
        {this.getValue(modifyItem, rootWord)}
        </el-form-item>
        {
          // 简单属性不可新增和取消
          ['string', 'number', 'boolean', 'function'].includes(typeof this.activeData[rootWord]) ? ''
          :
          <div>
          <el-button onClick={() => !modifyItem[rootWord] ? this.addProperty(modifyItem, rootWord, null, 'rootWord') : this.saveProperty(rootWord)}>{!modifyItem[rootWord] ? '新建' : '保存'}</el-button> <el-button onClick={() => this.delModifyItem(modifyItem, rootWord)}>取消</el-button>
          </div>
        }
    </el-form-item>)
    },
    mounted() {
    },
    methods: {
        getValue(data, keyword) {
            // console.log(data[keyword])
            const options = this.options.map((x, i) => <el-option key={i} label={x.label} value={x.value}></el-option>)
            return data.hasOwnProperty(keyword) && data[keyword].type ? (<div><el-form-item>
                <el-input v-model={data[keyword].key} style="width: 60px" />&nbsp;
                <el-select v-model={data[keyword].type} style="width: 80px" onChange={e => this.changeOptions(e, keyword, data)}>
                  {options}
                </el-select>
                &nbsp;: {data[keyword].type !== '4' && data[keyword].type !== '5' ? this.valueTypeMap[data[keyword].type](data[keyword]) : ''}
              </el-form-item>
              {data[keyword].type === '4' || data[keyword].type === '5' ? this.valueTypeMap[data[keyword].type](data[keyword]) : ''}
              </div>) : ''
        },
        getList(key, data = this.activeData) {
          let list = []
          if (data) {
            if (typeof data[key] === 'object') {
              for (const i in data[key]) {
                list.push(i)
              }
            } else {
              list.push(data[key])
            }
          }
          return list
        },
        getType(value) {
          if (typeof value === 'array') {
            return '5'
          } else if (typeof value === 'object') {
            return '4'
          } else {
            return '1'
          }
        },
        changeOptions(e, key, data) {
            data[key].value = e === '5' ? [] : this.valueTypeInitial[e]
        },
        addProperty(data, key, type, rootName) {
          console.log('addproperty')
          if (!type) type = typeof this.activeData[key] === 'object' ? '4' : Array.isArray(this.activeData[key]) ? '5' : '1'
          if (type === '4') {
            // 对象
            this.$set(data, key, {
              // children做特殊处理
              key: rootName && this.initialType === 'array' ? this.activeData[this.rootWord].length || 0 : '',
              type: '1',
              value: ''
            })
          } else if (type === '5') {
            let arr = data[key]
            if (!arr) {
              arr = []
            } else {
              arr.push({
                key: '',
                type: '1',
                value: ''
              })
            }
            this.$set(data, key, arr)
          } else {
            this.$set(data, key, '')
          }
        },
        saveProperty(key, data = this.activeData) {
          if (!(key in data)) this.$set(data, key, {})
          console.log('saveProperty')
          if (this.modifyItem[key].type !== '4' && this.modifyItem[key].type !== '5') {
            // 如果输入的是组件。则增加此组件的相关配置
            // console.log(this.$root.$options.components.oCol.options.props)
            if (this.$root.$options.components[this.modifyItem[key].value]) {
              const comOptions = this.$root.$options.components[this.modifyItem[key].value].options
              // 填充初始props属性
              // let aaa = window.Math.random()
              const config = {
                name: this.modifyItem[key].value,
                props: getDefaultProps(comOptions),
              }
              if (!config.props.rawId) config.props.rawId = getRawId()
              this.$set(this.activeData[key], this.modifyItem[key].key, config)
            } else {
              // 简单属性直接保存
              let value = this.modifyItem[key].value
              if (key === 'on' || key === 'nativeOn') {
                value = stringToFunc(this.modifyItem[key].value)
              }
              this.$set(this.activeData[key], this.modifyItem[key].key, value )
            }
          } else {
            // 复杂属性需要转换key、value变为对象
            const rootValue = this.modifyItem[key].value
            const transformValue = this.transformKeyValue(rootValue, this.modifyItem[key].type)
            this.$set(this.activeData[key], this.modifyItem[key].key, transformValue )
          }
          this.modifyItem = {}
        },
        // key-value对象转化为正常对象
        transformKeyValue(keyVal, type) {
          if (type === '4') {
            let afterVal = {}
            afterVal[keyVal.key] = this.transformKeyValue(keyVal.value, keyVal.type)
            return afterVal
          } else if (type === '5') {
            let afterVal = []
            for(const i of keyVal) {
              if (i.type !== '5' && i.type !== '4') {
                afterVal.push(this.transformKeyValue(i.value, i.type))
              } else if (i.type === '4') {
                afterVal.push({
                  [i.key]: this.transformKeyValue(i.value, i.type)
                })
              }
            }
            return afterVal
          } else {
            return keyVal
          }
        },
        delModifyItem(data, key) {
            if (data.type) {
                if (data.type === '4') {
                    data.value = {}
                } else if (data.type === '5') {
                    data.value = []
                } else {
                    this.$delete(data, key)
                }
            } else {
                // if (data[key].type === '4') {
                //     data[key].value = {}
                // } else if (data[key].type === '5') {
                //     data[key].value = []
                // } else {
                    this.$delete(data, key)
                // }
            }
        },
        delKey(key, property) {
          this.$delete(this.activeData[property], key)
        },
        analysisProperty(data, property, subProperty) {
          console.log(data, property, subProperty)
          const x = data[property][subProperty]
          // if (['renderFun', 'on', 'nativeOn'].includes(property) || x && x.name) {
            this.$emit('changeComponentPanel', data, property, subProperty)
          // }
        }
    }
}