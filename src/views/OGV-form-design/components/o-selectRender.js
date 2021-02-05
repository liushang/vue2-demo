// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '',
            style: {
              border: '1px solid #409EFF'
            }
        }
    },
    props: {
      form: {
        type: Object,
        default: () => {
          return {
            'a': 12
          }
        }
      },
      keyword: {
        type: String,
        default: 'a'
      },
      value: {
        type: String,
        default: ''
      },
      attrs: {
        type: Object,
        default: () => {
          return {
            placeholder: '请选择活动区域',
          }
        }
      },
      styles: {
        type: Object,
        default: () => {
          return {
          }
        }
      },
      children: {
        type: Array,
        default: () => []
      },
      rawId: {
        type: Number,
        default: 0
      },
    },
    render,
    methods: {
        updateMsg() {
            console.log('updateMsg');
            console.log(this.configData)
        },
        change() {
            console.log('我是change');
            console.log(this.configData);
        },
        input(event) {
          console.log(event)
          this.$emit('oSelect', event)
          // this.configComponents.children[0].props.value = event
          // this.form[this.keyword] = event
          console.log('oSelect')
          this.form[this.keyword] = this.val = event
          console.log(this.form)
          this.$root.$emit('DEAL_CHOOSE', this)
        }
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: [{
            // 为了展示边框选中态特意加的
            name: 'span',
            on: {
                click: e => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('啊啊啊啊啊啊啊啊啊啊我是div')
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
            },
            children: [{
              name: 'el-select',
              attrs: Object.assign({
                  size: 'small',
              }, this.attrs),
              style: Object.assign(this.style, this.styles),
              ref: 'oSelect',
              on: {
                  blur: this.updateMsg,
                  input: this.input,
                  changeVal: () => {
                    console.log('changevaloooooooooooooooo')
                    console.log('changevaloooooooooooooooo')
                  }
              },
              nativeOn: {
                click: () => {
                  console.log('啊啊啊啊啊啊啊啊啊啊啊啊nativeon')
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
              },
              props: {
                value: this.val,
                rawId: this.rawId
              },
              children: this.children
            }]
        }]
        }
      },
    },
    created() {
      this.val = this.value || (this.keyword && this.form[this.keyword]) || this.attrs.value || ''
    },
    mounted() {
    }
};
export default base
