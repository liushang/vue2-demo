// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            val: '313',
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
        type: String | Number,
        default: ''
      },
      styles: {
        type: Object,
        default: () => {}
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
          this.form[this.keyword] = this.val = event
          console.log(this.form)
        }
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: [{
              name: 'el-input',
              attr: {
                  size: 'small',
                  type: 'primary',
              },
              style: Object.assign(this.style, this.styles),
              ref: 'oInput',
              on: {
                  blur: this.updateMsg,
                  input: this.input
              },
              props: {
                value: this.val
              },
              children: []
          }]
        }
      },
    },
    created() {
      this.val = this.value || (this.keyword && this.form[this.keyword]) || ''
    },
    mounted() {
    }
};
export default base
