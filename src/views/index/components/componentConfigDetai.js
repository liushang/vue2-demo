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
              {/* <span>{x}</span> */}
              <el-input v-model={this.activeData[rootWord][x]} placeholder="请输入字段名（v-model）s"  style="width: 165px"/>
              <i class="el-icon-close" onClick={() => this.delKey.bind(x, rootWord)} />
          </el-form-item>)
      })}
      <el-form-item>
      {this.getValue(modifyItem, rootWord)}
      </el-form-item>
      <el-button onClick={() => !modifyItem[rootWord] ? this.addProperty(modifyItem, rootWord, '4') : this.saveProperty(rootWord)}>{!modifyItem[rootWord] ? '新建' : '保存'}</el-button> <el-button onClick={() => this.delModifyItem(modifyItem, rootWord)}>取消</el-button>
  </el-form-item>)
  },
  mounted() {

  },
  methods: {
      getValue(data, keyword) {
          console.log('getValue')
          console.log(data)
          console.log(keyword)
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
          console.log('dataactive存在')
          for (const i in data[key]) {
            list.push(i)
          }
        }
        return list
      },
      changeOptions(e, key, data) {
          // console.log(this.valueTypeInitial)
          // console.log(this.valueTypeInitial[e])
          data[key].value = e === '5' ? [] : this.valueTypeInitial[e]
          // this.$set(data[key], value, this.valueTypeInitial[e])
          // console.log(JSON.stringify(data))
      },
      addProperty(data, key, type) {
        console.log(data)
        if (type === '4') {
          this.$set(data, key, {
            key: '',
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
            console.log('arr新增元素', arr)
          }
          this.$set(data, key, arr)
        }
        console.log('modufyitem', this.modifyItem)
      },
      saveProperty(key, data = this.activeData) {
        if (!(key in data)) this.$set(data, key, {})
        this.$set(this.activeData[key], this.modifyItem[key].key, this.modifyItem[key].value )
        console.log('新增属性')
        console.log(this.activeData)
        this.modifyItem = {}
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
  }
}