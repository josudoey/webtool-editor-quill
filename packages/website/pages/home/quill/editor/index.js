import { ref, onMounted, h } from 'vue'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

export const QuillEditor = {
  compatConfig: { COMPONENT_V_MODEL: false },
  props: {
    content: {
      type: String
    },
    toolbar: {
      type: Object
    }
  },
  emits: [
    'update:modelValue'
  ],
  setup (props, { emit }) {
    const editor = ref(null)

    onMounted(async () => {
      await import('quill/dist/quill.core.js')
      const QuillModule = await import('quill')
      const { default: Quill } = QuillModule
      const quill = new Quill(editor.value, {
        modules: {},
        theme: 'snow',
        enabled: true
      })

      quill.root.innerHTML = props.content
      quill.on('editor-change', function (eventName) {
        const html = quill.root.innerHTML
        emit('update:content', html)
      })
    })

    return {
      editor
    }
  },
  render () {
    // ref https://github.com/vueup/vue-quill/blob/master/packages/vue-quill/src/components/QuillEditor.ts
    return [
    //   toolbar,
      h('div', { ref: 'editor', ...this.$attrs })
    ]
  }
}
