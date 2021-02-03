// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '',
            style: {}
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
      styles: {
        type: Object,
        default: () => {
          return {
            border: '1px solid #409EFF'
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
          this.$emit('oInput', event)
          // this.configComponents.children[0].props.value = event
          // this.form[this.keyword] = event
          console.log('oInput')
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
              name: 'el-input',
              attrs: Object.assign({
                  size: 'small',
              }, this.attrs),
              style: Object.assign(this.style, this.styles),
              ref: 'oInput',
              on: {
                  blur: this.updateMsg,
                  input: this.input,
                  focus: () => {
                  },
              },
              props: {
                value: this.val,
                rawId: this.rawId
              },
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
