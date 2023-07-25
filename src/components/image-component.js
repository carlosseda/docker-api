class Image extends HTMLElement {
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
      .image{
        align-items: center;
        display: flex;
        height: 100%;
        justify-content: center;
      }
    </style>

    <div class="image">
      <picture>
        <source media="(min-width: 1024px)" srcset="images/details.webp">
        <source media="(min-width: 768px)" srcset="images/details.webp">
        <source media="(min-width: 480px)" srcset="images/details.webp">
        <img src="images/details.webp" alt="Imagen detalles">
      </picture>
    </div>
    `
  }
}

customElements.define('image-component', Image)
