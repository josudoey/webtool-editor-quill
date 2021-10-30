// see https://docs.mathjax.org/en/latest/web/configuration.html
const ready = new Promise((resolve, reject) => {
  window.MathJax = {
    tex: {
      inlineMath: [['$', '$'], ['\\(', '\\)']]
    },
    svg: {
      fontCache: 'global'
    }
  }
  const mathjaxScript = document.createElement('script')
  mathjaxScript.setAttribute(
    'src',
    'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg-full.js'
  )
  mathjaxScript.setAttribute('async', '')
  mathjaxScript.onload = resolve
  mathjaxScript.onerror = reject
  document.head.appendChild(mathjaxScript)
  window.katex = {
    render (value, node) {
      const svg = window.MathJax.tex2svg(value)
      node.append(svg)
    }
  }
})

module.exports = {
  ready: () => ready
}
