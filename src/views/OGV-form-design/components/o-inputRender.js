// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            value: '313',
        }
    },
    // value: 213,
    props: ['form', 'keyword'],
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
          this.form[this.keyword] = this.value = event
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
              ref: 'oInput',
              on: {
                  blur: this.updateMsg,
                  input: this.input
              },
              props: {
                value: this.value
              },
              children: [ '确定', {
                  name: 'span',
              } ]
          }]
        }
      },
    },
    created() {
      this.value = this.form[this.keyword]
    },
    mounted() {}
};
export default base
