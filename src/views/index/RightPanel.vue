<template>
  <div class="right-board" id="right-board">
    <el-tabs v-model="currentTab" class="center-tabs">
      <el-tab-pane label="组件属性" name="field" />
      <el-tab-pane label="表单属性" name="form" />
    </el-tabs>
    <div class="field-box">
      <!-- <a class="document-link" target="_blank" :href="documentLink" title="查看组件文档">
        <i class="el-icon-link" />
      </a> -->
      <el-scrollbar class="right-scrollbar" v-if="activeData && activeData.name">
        {{activeData.name}} ({{activeData.props.rawId}})
        <!-- 组件属性 -->
        <el-form v-show="currentTab==='field' && showField" v-if="activeData" size="small" label-width="90px">
          <div v-if="activeData.name">
            <InfiniteObject
              :activeData="activeData.props"
              :containerInject="containerInject"
              :rootWord="i"
              v-for="(i, index) in propertiesList"
              :initialType="i === 'children' ? 'array' : 'string'"
              :key="index"
              @changeComponentPanel="changeComponentPanel"
              :initialTypeShow="['renderFun', 'rawId', 'on', 'nativeOn'].includes(i) ? 'text' : 'input'"
              ></InfiniteObject>
          </div>
          <!-- <codemirror v-model="activeData.props.renderFun" :options="cmOptions" ref="cmEditor"/> -->
        </el-form>
        <!-- 表单属性 -->
        <el-form v-show="currentTab === 'form'" size="small" label-width="90px">
          <el-form-item label="表单名" v-for="(i, index) in formConf" :key="index">
            {{i}}
            <!-- <el-input v-model="formConf.formRef" placeholder="请输入表单名（ref）" /> -->
          </el-form-item>
          <InfiniteObject :activeData="formConf" rootWord="basicData" initialType="array" @changeComponentPanel="changeComponentPanel"></InfiniteObject>
        </el-form>
      </el-scrollbar>
    </div>
    <codeEditor :dataStr="renderCode" v-if="activeData && activeData.props && activeData.props.renderFun && showFunctionDialog" :options="cmOptions" @close="changeFuncCode" ref="cmEditor"/>
    <treeNode-dialog :visible.sync="dialogVisible" title="添加选项" @commit="addNode" />
  </div>
</template>
 
<script>
import { isArray } from 'util'
import TreeNodeDialog from '@/views/index/TreeNodeDialog'
import { isNumberStr } from '@/utils/index'
// import IconsDialog from './IconsDialog'
import {
  inputComponents, selectComponents, layoutComponents
} from '@/components/generator/config'
import InfiniteObject from './components/infiniteObject.js'
import CodeEditor from '../OGV-form-design/components/code-editor'
import { saveFormConf } from '@/utils/db'
import 'codemirror/mode/javascript/javascript.js'
import {
  stringToFunc
} from '@/utils/db'
// import theme style
import 'codemirror/theme/base16-dark.css'
const dateTimeFormat = {
  date: 'yyyy-MM-dd',
  week: 'yyyy 第 WW 周',
  month: 'yyyy-MM',
  year: 'yyyy',
  datetime: 'yyyy-MM-dd HH:mm:ss',
  daterange: 'yyyy-MM-dd',
  monthrange: 'yyyy-MM',
  datetimerange: 'yyyy-MM-dd HH:mm:ss'
}

// 使changeRenderKey在目标组件改变时可用
const needRerenderList = ['tinymce']

export default {
  components: {
    TreeNodeDialog,
    InfiniteObject,
    CodeEditor,
    // ComponentConfigDetail
    // IconsDialog
  },
  props: ['showField', 'activeData', 'formConf', 'containerInject'],
  mounted() {
    console.log(this.activeData)
  },
  data() {
    return {
      // 展示弹窗
      showFunctionDialog: false,
      currentTab: 'field',
      currentNode: null,
      dialogVisible: false,
      iconsVisible: false,
      currentIconModel: null,
      // 修改item
      modifyItem: {},
      options: [{
        value: '1',
        label: '字符串'
      }, {
        value: '2',
        label: '数字'
      }, {
        value: '3',
        label: '布尔值'
      }, {
        value: '4',
        label: '对象'
      }, {
        value: '5',
        label: '数组'
      }],
      cmOptions: {
        tabSize: 4,
        mode: 'text/javascript',
        theme: 'base16-dark',
        lineNumbers: true,
        line: true,
        // more CodeMirror options...
      },
      tempCodeArr: []
    }
  },
  computed: {
    renderCode() {
      const [ data, property, subProperty ] = this.tempCodeArr
      if (data[property][subProperty]) {
        return data[property][subProperty].toString()
      } else {
        return data[property].toString()
      }
    },
    propertiesList() {
      return Object.keys(this.activeData.props)
    },
    codemirror() {
      return this.$refs.cmEditor.codemirror
    }
  },
  watch: {
    formConf: {
      handler(val) {
        saveFormConf(val)
      },
      deep: true
    }
  },
  methods: {
    changeFuncCode(code) {
      console.log('changeFuncCode')
      this.showFunctionDialog = false
      this.$emit('renderAgain')
      console.log(data, property, subProperty)
      const [ data, property, subProperty ] = this.tempCodeArr
      if (data[property][subProperty]) {
        data[property][subProperty] = stringToFunc(code)
      } else {
        data[property] = stringToFunc(code)
      }
      // this.activeData.props.renderFunStr = code
      // this.activeData.props.renderFun = stringToFunc(code)
    },
    addData() {
      console.log('addData')
    },
    delData() {
      console.log('delData')
    },
    // 向上传递改变组件面板内容
    changeComponentPanel(data, property, subProperty) {
      console.log(property, subProperty)
      if (property === 'renderFun' || property === 'on' || property === 'nativeOn') {
        // 函数编辑窗
        this.tempCodeArr = [data, property, subProperty]
        this.showFunctionDialog = true
      } else { 
        // json编辑窗
        this.$emit('panelContent', data, property, subProperty)
      }
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
    addProperty(key, data = this.activeData) {
      this.$set(this.modifyItem, key, {
        key: '',
        type: '1',
        value: ''
      })
    },
    addChildren(data = this.activeData) {
      data.push({})
    },
    saveProperty(key, data = this.activeData) {
      if (!(key in data)) this.$set(data, key, {})
      this.$set(this.activeData[key], this.modifyItem[key].key, this.modifyItem[key].value )
      console.log('新增属性')
      console.log(this.activeData)
      this.modifyItem = {}
    },
    delModifyItem(key, data = this.activeData) {
      this.$delete(this.modifyItem, key, '')
      // delete this.modifyItem[key]
    },
    delKey(key, property) {
      this.$delete(this.activeData[property], key)
    },
    addReg() {
      this.activeData.__config__.regList.push({
        pattern: '',
        message: ''
      })
    },
    addSelectItem() {
      this.activeData.__slot__.options.push({
        label: '',
        value: ''
      })
    },
    addTreeItem() {
      ++this.idGlobal
      this.dialogVisible = true
      this.currentNode = this.activeData.options
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node">
          <span>{node.label}</span>
          <span class="node-operation">
            <i on-click={() => this.append(data)}
              class="el-icon-plus"
              title="添加"
            ></i>
            <i on-click={() => this.remove(node, data)}
              class="el-icon-delete"
              title="删除"
            ></i>
          </span>
        </div>
      )
    },
    append(data) {
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      this.dialogVisible = true
      this.currentNode = data.children
    },
    remove(node, data) {
      this.activeData.__config__.defaultValue = [] // 避免删除时报错
      const { parent } = node
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    },
    addNode(data) {
      this.currentNode.push(data)
    },
    setOptionValue(item, val) {
      item.value = isNumberStr(val) ? +val : val
    },
    setDefaultValue(val) {
      if (Array.isArray(val)) {
        return val.join(',')
      }
      // if (['string', 'number'].indexOf(typeof val) > -1) {
      //   return val
      // }
      if (typeof val === 'boolean') {
        return `${val}`
      }
      return val
    },
    onDefaultValueInput(str) {
      if (isArray(this.activeData.__config__.defaultValue)) {
        // 数组
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          str.split(',').map(val => (isNumberStr(val) ? +val : val))
        )
      } else if (['true', 'false'].indexOf(str) > -1) {
        // 布尔
        this.$set(this.activeData.__config__, 'defaultValue', JSON.parse(str))
      } else {
        // 字符串和数字
        this.$set(
          this.activeData.__config__,
          'defaultValue',
          isNumberStr(str) ? +str : str
        )
      }
    },
    onSwitchValueInput(val, name) {
      if (['true', 'false'].indexOf(val) > -1) {
        this.$set(this.activeData, name, JSON.parse(val))
      } else {
        this.$set(this.activeData, name, isNumberStr(val) ? +val : val)
      }
    },
    setTimeValue(val, type) {
      const valueFormat = type === 'week' ? dateTimeFormat.date : val
      this.$set(this.activeData.__config__, 'defaultValue', null)
      this.$set(this.activeData, 'value-format', valueFormat)
      this.$set(this.activeData, 'format', val)
    },
    multipleChange(val) {
      this.$set(this.activeData.__config__, 'defaultValue', val ? [] : '')
    },
    dateTypeChange(val) {
      this.setTimeValue(dateTimeFormat[val], val)
    },
    rangeChange(val) {
      this.$set(
        this.activeData.__config__,
        'defaultValue',
        val ? [this.activeData.min, this.activeData.max] : this.activeData.min
      )
    },
    rateTextChange(val) {
      if (val) this.activeData['show-score'] = false
    },
    rateScoreChange(val) {
      if (val) this.activeData['show-text'] = false
    },
    colorFormatChange(val) {
      this.activeData.__config__.defaultValue = null
      this.activeData['show-alpha'] = val.indexOf('a') > -1
      this.activeData.__config__.renderKey = +new Date() // 更新renderKey,重新渲染该组件
    },
    openIconsDialog(model) {
      this.iconsVisible = true
      this.currentIconModel = model
    },
    setIcon(val) {
      this.activeData[this.currentIconModel] = val
    },
    tagChange(tagIcon) {
      let target = inputComponents.find(item => item.__config__.tagIcon === tagIcon)
      if (!target) target = selectComponents.find(item => item.__config__.tagIcon === tagIcon)
      this.$emit('tag-change', target)
    },
    changeRenderKey() {
      if (needRerenderList.includes(this.activeData.__config__.tag)) {
        this.activeData.__config__.renderKey = +new Date()
      }
    }
  }
}
</script>
<style lang="less">
#right-board{
  .el-form-item{
    margin-bottom: 8px;
  }
}
</style>
<style lang="less" scoped>
.right-board {
  width: 550px;
  position: absolute;
  right: 0;
  top: 0;
  padding-top: 3px;
  .field-box {
    position: relative;
    height: calc(100vh - 42px);
    box-sizing: border-box;
    overflow: hidden;
  }
  .el-scrollbar {
    height: 100%;
  }
}
.select-item {
  display: flex;
  border: 1px dashed #fff;
  box-sizing: border-box;
  & .close-btn {
    cursor: pointer;
    color: #f56c6c;
  }
  & .el-input + .el-input {
    margin-left: 4px;
  }
}
.select-item + .select-item {
  margin-top: 4px;
}
.select-item.sortable-chosen {
  border: 1px dashed #409eff;
}
.select-line-icon {
  line-height: 32px;
  font-size: 22px;
  padding: 0 4px;
  color: #777;
}
.option-drag {
  cursor: move;
}
.time-range {
  .el-date-editor {
    width: 227px;
  }
  ::v-deep .el-icon-time {
    display: none;
  }
}
.document-link {
  position: absolute;
  display: block;
  width: 26px;
  height: 26px;
  top: 0;
  left: 0;
  cursor: pointer;
  background: #409eff;
  z-index: 1;
  border-radius: 0 0 6px 0;
  text-align: center;
  line-height: 26px;
  color: #fff;
  font-size: 18px;
}
.node-label{
  font-size: 14px;
}
.node-icon{
  color: #bebfc3;
}
</style>
