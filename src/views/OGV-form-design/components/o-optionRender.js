// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '我是label',
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
          return {}
        }
      },
      on: {
        type: Object,
        default: () => {}
      },
      nativeOn: {
        type: Object,
        default: () => {}
      },
      renderFun: {
        type: Function,
        default: x => x
      },
      styles: {
        type: Object,
        default: () => {
          return {
          }
        }
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
          this.$emit('oOppption', event)
          // this.configComponents.children[0].props.value = event
          // this.form[this.keyword] = event
          console.log('oOppption')
          this.form[this.keyword] = this.val = event
          console.log(this.form)
          this.$root.$emit('DEAL_CHOOSE', this)
        },
        click(event) {
          // this.configComponents.children[0].props.value = event
          // this.form[this.keyword] = event
          console.log('oOppptionyyyyyyyyyyyy')
          this.form[this.keyword] = this.val = event
          console.log(this.form)
          this.$emit('changeVal', event)
          this.$root.$emit('DEAL_CHOOSE', this)
        }
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: this.renderFun([{
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
              name: 'el-option',
              attrs: Object.assign({
                  size: 'small',
              }, this.attrs),
              style: Object.assign(this.style, this.styles),
              ref: 'oOption',
              on: {
                  blur: this.updateMsg,
                  input: this.input,
                  click: this.click,
                  focus: () => {
                  },
              },
              nativeOn: {
                click: () => {
                  console.log('啊啊啊啊啊啊啊啊啊啊啊啊option')
                  this.$parent.$parent.$parent.value = this.val
                  console.log(this.$parent.$parent.$parent)
                  this.$emit('changeVal', this.val)
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
              },
              props: {
                value: this.val,
                rawId: this.rawId
              },
            }]
          }])
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
