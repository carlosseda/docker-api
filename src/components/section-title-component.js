class SectionTitle extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    this.render()
  }

  render () {
    this.shadow.innerHTML =
    `
    <style>
      .section-title{
        margin-bottom: 1rem;
      }
      
      .section-title h2{
        font-family: 'Poppins', sans-serif;
        font-size: 3rem;
        margin: 0;
        text-align: center;
        text-transform: uppercase;
      }
    </style>

    <div class="section-title">
      <h2>How it works</h2>
    </div>
    `
  }
}

customElements.define('section-title-component', SectionTitle)
