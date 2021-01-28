// import { analysisRenderConfig, analysisDataRender } from '../../../schema/util';
import { render, computed } from '../../../schema/api';
let base = {
    data() {
        return {
          renderArr: []
        }
    },
    props: {
      config: {
        type: Array,
        default: () => [ {
            name: 'oButton',
            children: ['确定'],
            span: 4,
          }, {
            name: 'oInput',
            children: [],
            span: 3,
            offset: 7
          }
        ]
      },
    },
    render,
    methods: {
        updateMsg() {
            console.log('updateMsg');
        },
        change() {
            console.log('我是change');
        },
        input(event) {
          this.value = event
        }
    },
    computed: {
      ...computed,
      configComponents() {
        return {
          children: [{
              name: 'el-form',
              ref: 'oInput',
              on: {
                  blur: this.updateMsg,
                  input: this.input
              },
              props: {
                value: this.value
              },
              children: this.renderArr
          }]
        }
      },
    },
    mounted() {
      let config = this.config.map(x => {
        return {
          name: 'el-col',
          attr: {
            span: x.span,
            offset: x.offset
          },
          children: [
            x
          ]
        }
      })
      this.renderArr = [{
        name: 'el-row',
        children: config
      }]
    }
};
export default base