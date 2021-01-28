// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
            value: '313',
            llvalue: '313',
        }
    },
    // value: 213,
    props: ['form', 'key'],
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
          // this.$emit('input', event)
          this.configComponents.children[0].props.value = event
          // this.form[this.key] = event
          this.value = event
          console.log(this)
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
              // domProps: {
              //   value: 12
              // },
              children: [ '确定', {
                  name: 'span',
              } ]
          }]
        }
      },
    },
    mounted() {}
};
export default base
