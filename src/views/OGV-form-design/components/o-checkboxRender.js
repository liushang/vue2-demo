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
      styles: {
        type: Object,
        default: () => {
          return {
          }
        }
      },
      attrs: {
        type: Object,
        default: () => {}
      },
      rawId: {
        type: Number,
        default: 0
      },
      children: {
        type: Array,
        default: () => ['确定']
      },
    },
    render,
    methods: {
        updateMsg() {
            console.log('updateMsg');
            console.log(this.configData)
        },
        change(event) {
            // this.$emit('oInput', event)
            console.log('我是switch')
            console.log(event)
            this.form[this.keyword] = this.val = event
            this.$root.$emit('DEAL_CHOOSE', this)
        }
    },
    inject: {
      containerInject: {
        default: () => {}
      }
    },
    computed: {
      ...computed,
      checkValue() {
        console.log()
        return this._provided.containerInject[this.rawId].checkbox
      },
      configComponents() {
        return {
          children: [{
              // 为了展示边框选中态特意加的
            name: 'span',
            attr: this.attrs,
            on: {
                click: e => {
                  e.preventDefault()
                  e.stopPropagation()
                  console.log('啊啊啊啊啊啊啊啊啊啊我是div')
                  this.containerInject[this.rawId].checkbox = !this.containerInject[this.rawId].checkbox 
                  this.$root.$emit('DEAL_CHOOSE', this)
                },
            },
            children: [{
              name: 'el-checkbox',
              attrs: {
                  size: 'small',
                  ...this.attrs,
                  value: this.containerInject[this.rawId].checkbox
              },
              style: Object.assign(this.style, this.styles),
              ref: 'oCheckbox',
              on: {
                  change: this.change
              },
              props: {
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
      console.log('___provi', this._provided)
    }
};
export default base
