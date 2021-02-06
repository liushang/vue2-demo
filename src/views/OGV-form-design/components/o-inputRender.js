// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
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
      styles: {
        type: Object,
        default: () => {
          return {
          }
        }
      },
      attrs: {
        type: Object,
        default: () => {

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
          // this.form[this.keyword] = this.val = event
          this.containerInject[this.rawId].input = event
          console.log(this.form)
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
      val() {
        return this.containerInject[this.rawId] && this.containerInject[this.rawId].input || ''
      },
      configComponents() {
        return {
          children: [{
            // 为了展示边框选中态特意加的
            name: 'span',
            on: {
                click: e => {
                  e.preventDefault()
                  e.stopPropagation()
                  if (!this.containerInject[this.rawId]) {
                    this.$set(this.containerInject, this.rawId, {
                      input: ''
                    })
                  }
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
    created() {},
    mounted() {
    }
};
export default base
