class Product extends HTMLElement {
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
      .product{
        display: flex;
        height: 100%; 
        justify-content: space-between;
        position: relative;
        user-select: none;
        overflow: hidden;
        width: 100%;
      }
      .product-image{
        background-color: hsl(0, 0%, 97%);
        min-width: 50%;
        width: 50%;
        z-index: 1000;
      }
      .product-content{
        min-width: 50%;
        width: 50%;
        z-index: 999;
      }
    </style>

    <div class="product">
      <div class="product-image">
        <slot name="product-image"></slot>
      </div>
      <div class="product-content">
        <slot name="product-content"></slot>
      </div>
    </div>
    `
  }
}

customElements.define('product-component', Product)
