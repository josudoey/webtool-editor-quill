import Quill from 'quill/dist/quill.js'

// see https://github.com/quilljs/parchment#example
const Parchment = Quill.imports.parchment
class BlobImageBlot extends Parchment.Embed {
  static create (url) {
    const node = super.create()
    node.setAttribute('src', url)
    return node
  }

  static formats (domNode) {
    return domNode.getAttribute('src') || true
  }

  format (name, value) {
    if (name !== 'blob-image' || !value) {
      super.format(name, value)
      return
    }

    this.domNode.setAttribute('src', value)
  }

  formats () {
    return BlobImageBlot.formats(this.domNode)
  }
}
BlobImageBlot.blotName = 'blob-image'
BlobImageBlot.tagName = 'IMG'

export default BlobImageBlot
