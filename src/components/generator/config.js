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
    props: {
      value: "323",
    },
    __config__: {
      label: 'o-input',
      layout: 'oFormItem',
    },
  }, {
    name: 'oButton',
    props: {},
    __config__: {
      label: 'o-button',
      layout: 'oFormItem',
    },
  }, {
    name: 'oRow',
    props: {},
    __config__: {
      label: 'o-Row',
      layout: 'oFormItem',
    },
  }, {
    name: 'oCol',
    props: {},
    __config__: {
      label: 'o-Col',
      layout: 'oFormItem',
    },
  }, {
    name: 'oForm',
    props: {},
    __config__: {
      label: 'o-Form',
      layout: 'oFormItem',
    },
  }, {
    name: 'oFormItem',
    props: {},
    __config__: {
      label: 'o-FormItem',
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
