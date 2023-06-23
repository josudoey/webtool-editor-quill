import { ref, onMounted, h } from 'vue'
import { QuillEditor } from './quill/editor/index.js'

import * as render from './render.pug'
export default {
  ...render,
  components: {
    QuillEditor
  },
  setup () {
    return {
      content: 'demo'
    }
  }
}
