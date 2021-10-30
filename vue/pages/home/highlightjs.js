// see https://www.npmjs.com/package/highlight.js?activeTab=readme#fetch-via-cdn

const scriptSrc = [
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/highlight.min.js'
]
const cssLinkHref = [
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/default.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.3.1/styles/github.min.css'
]

const loadScript = (src) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.setAttribute('src', src)
    script.onload = resolve
    script.onerror = reject
    document.head.appendChild(script)
  })
}

const loadCss = (href) => {
  return new Promise((resolve, reject) => {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', href)
    link.onload = resolve
    link.onerror = reject
    document.head.appendChild(link)
  })
}

const ready = new Promise((resolve, reject) => {
  const all = []
  for (const src of scriptSrc) {
    all.push(loadScript(src))
  }
  for (const href of cssLinkHref) {
    all.push(loadCss(href))
  }

  return Promise.all(all).then(() => {
    window.hljs.configure({
      languages: ['javascript', 'python', 'go', 'css', 'html']
    })
    resolve(window.hljs)
  }).catch(reject)
})

module.exports = ready
