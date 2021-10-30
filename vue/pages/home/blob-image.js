import Quill from 'quill/dist/quill.js'

// see https://github.com/quilljs/parchment#example
// see https://github.com/quilljs/quill/blob/develop/formats/image.js
const Image = Quill.imports['formats/image']
class BlobImageBlot extends Image {
  static sanitize (url) {
    if (/^blob:http/.test(url)) {
      return url
    }
    return super.sanitize(url)
  }
}
BlobImageBlot.blotName = 'blob-image'
BlobImageBlot.tagName = 'IMG'

export default BlobImageBlot
