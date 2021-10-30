import 'quill/dist/quill.core.js'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import './style.css'
import Quill from 'quill/dist/quill.js'
import BlobImageBlot from './blob-image.js'
import { render, staticRenderFns } from './render.pug'
import './mathjax.js'
import './highlightjs.js'
Quill.register(BlobImageBlot)
Quill.imports['formats/image'] = BlobImageBlot
Quill.imports['formats/code-block'].className = ''

const QuillMode = 'quill'
const CodeMode = 'code'

export default {
  render,
  staticRenderFns,
  data: () => {
    return {
      QuillMode,
      CodeMode,
      editor: null,
      mode: QuillMode,
      result: 'Quill Example'
    }
  },
  created () {
  },
  async mounted () {
    this.editor = new Quill(this.$refs.editor, {
      modules: {
        syntax: {
          highlight (code) {
            return window.hljs.highlightAuto(code).value
          }
        },
        toolbar: {
          container: this.$refs.toolbar,
          handlers: { // see https://quilljs.com/docs/modules/toolbar/#handlers
            'code-block' (value) {
              const quill = this.quill
              if (!value) {
                quill.format('code-block', false)
                return
              }
              const delta = quill.format('code-block', value)
            },
            image (value) {
              if (!value) {
                return
              }
              const quill = this.quill
              // see https://quilljs.com/docs/api/#getselection
              const { index } = quill.getSelection()
              const input = document.createElement('input')
              input.setAttribute('type', 'file')
              input.setAttribute('accept', 'image/*')
              input.setAttribute('multiple', '')
              input.onchange = () => {
                for (const file of input.files) {
                  const src = URL.createObjectURL(file)
                  quill.insertEmbed(index, 'blob-image', src)
                }
              }
              input.click()
            }
          }
        }
      },
      theme: 'snow',
      enabled: true
    })
  },
  updated () {
  },
  methods: {
    showQuill () {
      this.editor.root.innerHTML = this.result
      this.mode = QuillMode
    },
    showCode () {
      this.result = this.editor.root.innerHTML
      this.mode = CodeMode
    }
  }
}
