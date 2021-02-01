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
                        {this.rootWord === 'children' ? <el-button onClick={() => this.addSubComponent(e, 'value')}>添加子组件</el-button> : ''}
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
              // '1': e => <el-input v-model={e.value}  style="width: 80px" />,
              // '2': e => <el-input v-model={e.value}  style="width: 80px" />,
              // '3': e => <el-input v-model={e.value}  style="width: 80px" />,
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
        }
    },
    render() {
        const modifyItem = this.modifyItem
        const propertyList = this.getList(this.rootWord)
        const rootWord = this.rootWord
        return (<el-form-item label={this.rootWord}>
        {propertyList.map(x => {
            return (<el-form-item label={x} label-width="40px">
                {['array', 'object'].includes(typeof this.activeData[rootWord][x]) ?
                <span>{JSON.stringify(this.activeData[rootWord][x])}</span> :
                <el-input v-model={this.activeData[rootWord][x]} placeholder="请输入字段名（v-model）s"  style="width: 165px"/>}
                <i class="el-icon-close" onClick={() => this.delKey(x, rootWord)} />
            </el-form-item>)
        })}
        <el-form-item>
        {this.getValue(modifyItem, rootWord)}
        </el-form-item>
        <el-button onClick={() => !modifyItem[rootWord] ? this.addProperty(modifyItem, rootWord, '4', 'rootWord') : this.saveProperty(rootWord)}>{!modifyItem[rootWord] ? '新建' : '保存'}</el-button> <el-button onClick={() => this.delModifyItem(modifyItem, rootWord)}>取消</el-button>
    </el-form-item>)
    },
    mounted() {
      // if (!this.activeData[this.rootWord]) {
      //   if (this.rootWord === 'children') {
      //     this.activeData[this.rootWord] = []
      //   } else {
      //     this.activeData[this.rootWord] = {}
      //   }
      // }
    },
    methods: {
        getValue(data, keyword) {
            // console.log(data[keyword])
            const options = this.options.map((x, i) => <el-option key={i} label={x.label} value={x.value}></el-option>)
            return data.hasOwnProperty(keyword) && data[keyword].type ? (<div><el-form-item>
                {/* {
                  !['1', '2', '3'].includes(data[keyword].type) ? <el-input v-model={data[keyword].key} style="width: 60px" /> : ''
                } */}
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
            for (const i in data[key]) {
              list.push(i)
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
          console.log(data)
          if (type === '4') {
            this.$set(data, key, {
              // children做特殊处理
              key: rootName && this.rootWord === 'children' ? this.activeData.children.length || 0 : '',
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
          }
        },
        saveProperty(key, data = this.activeData) {
          if (!(key in data)) this.$set(data, key, {})
          if (this.modifyItem[key].type !== '4' && this.modifyItem[key].type !== '5') {
            if (this.modifyItem[key].value === 'oCol') {
              const config = {
                name: 'oCol'
              }
              this.$set(this.activeData[key], this.modifyItem[key].key, config )
              console.log('增加子组件')
            } else {
              // 简单属性直接保存
              this.$set(this.activeData[key], this.modifyItem[key].key, this.modifyItem[key].value )
            }
          } else {
            // 复杂属性需要转换key、value变为对象
            const rootValue = this.modifyItem[key].value
            const transformValue = this.transformKeyValue(rootValue, this.modifyItem[key].type)
            // console.log('保存复杂属性')
            // console.log(this.activeData[key])
            // console.log(this.modifyItem[key].key)
            // console.log(transformValue)
            this.$set(this.activeData[key], this.modifyItem[key].key, transformValue )
          }
          console.log('新增属性')
          console.log(this.activeData)
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
          console.log('delete')
          this.$delete(this.activeData[property], key)
          console.log(this.activeData)
        },
        addSubComponent(e) {
          console.log(e)
          e.value = {
            // name: 
          }
        }
    }
}