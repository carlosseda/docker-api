class Copyright extends HTMLElement {
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
      .copyright p{
        color: hsl(206, 13%, 79%);
        font-family: 'Poppins', sans-serif;
        font-size: 0.9rem;
        margin: 0;
        text-align: center;
      }
    </style>

    <div class="copyright">
      <p>Proland. All rights reserved</p>
    </div>
    `
  }
}

customElements.define('copyright-component', Copyright)
