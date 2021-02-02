// 表单属性【右面板】
export const formConf = {
  formRef: 'elForm',
  formModel: 'formData',
  size: 'medium',
  labelPosition: 'right',
  labelWidth: 100,
  formRules: 'rules',
  gutter: 15,
  disabled: false,
  span: 24,
  formBtns: true
}

// o-组件

export const oComponents = [
  {
    name: 'oInput',
    children: [],
    props: {
      value: 323,
      bb: 12
    },
    __config__: {
      label: 'el-input',
      layout: 'oFormItem',
    },
  }, {
    name: 'oButton',
    children: [
      '1'
    ],
    props: {
      children: [
        '1'
      ],
    },
    __config__: {
      label: 'el-button',
      layout: 'oFormItem',
    },
  }, {
    name: 'oRow',
    children: [
      '1'
    ],
    props: {
      children: [
        '1'
      ],
    },
    __config__: {
      label: 'el-Row',
      layout: 'oFormItem',
    },
  }, {
    name: 'oCol',
    children: [
      '1'
    ],
    props: {
      children: [
        '1'
      ],
    },
    __config__: {
      label: 'el-Col',
      layout: 'oFormItem',
    },
  }
]

// 输入型组件 【左面板】
export const inputComponents = []

// 选择型组件 【左面板】
export const selectComponents = []

// 布局型组件 【左面板】
export const layoutComponents = []
