class Logo extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.title = this.getAttribute('title')
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
    `
    <style>
        h1{
          font-family: 'Poppins', sans-serif;
          margin: 0;
        }
    </style>

    <div class="logo">
      <h1>${this.title}</h1>
    </div>
    `
  }
}

customElements.define('logo-component', Logo)
