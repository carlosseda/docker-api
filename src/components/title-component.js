class Title extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  static get observedAttributes () { return ['title'] }

  connectedCallback () {}

  attributeChangedCallback (name, oldValue, newValue) {
    this.render()
  }

  render () {
   
    const title = document.createElement('h2')
    title.style.color = 'hsl(0, 0%, 100%)'
    title.style.fontFamily = 'Roboto, sans-serif'
    title.style.fontSize = '2em'
    title.style.fontWeight = '600'
    title.style.margin = '0'
    title.style.textDecoration = 'none'
    title.style.textAlign = 'center'

    title.innerHTML = this.getAttribute('title')

    this.shadow.appendChild(title)
  }
}

customElements.define('title-component', Title)
