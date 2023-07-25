class ProductInfo extends HTMLElement {
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
      .product-info{
        width: 100%;
        z-index: 1000;
      }
      
      .product-info-element{
        border-bottom: 1px solid hsl(207, 26%, 93%);
        padding: 2rem 0;
      }
      
      .product-info-element:first-child{
        padding-top: 0;
      }
      
      .product-info-element:last-child{
        border-bottom: none;
      }
      
      .product-category{
        margin-bottom: 0.5rem;
      }
      
      .product-category h4{
        color: hsl(207, 8%, 55%);
        font-family: 'Poppins', sans-serif;
        font-size: 1.3rem;
        font-weight: 500;
        margin: 0;
        text-transform: uppercase;
      }
      
      .product-title{
        margin-bottom: 0.5rem;
      }
      
      .product-title h2{
        color: hsl(208, 13%, 25%);
        font-family: 'Poppins', sans-serif;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0;
        text-transform: uppercase;
      }
      
      .product-model{
        margin-bottom: 1.5rem;
      }
      
      .product-model h3{
        color: hsl(207, 8%, 55%);
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        font-weight: 300;
        margin: 0;
        text-transform: uppercase;
      }
      
      .product-price{
        align-items: center;
        display: flex;
        gap: 1rem;
        user-select: none;
      }
      
      .product-price-before span{
        color: hsl(207, 8%, 55%);
        font-family: 'Poppins', sans-serif;
        font-size: 1.4rem;
        font-weight: 300;
        margin: 0;
        text-decoration: line-through;
      }
      
      .product-price-now span{
        color: hsl(209, 100%, 50%);
        font-family: 'Poppins', sans-serif;
        font-size: 1.8rem;
        font-weight: 600;
        margin: 0;
      }
      
      .product-price-offer{
        background-color: hsl(18, 100%, 57%);
        border-radius: 0.5rem;
        padding: 0.5rem 1rem;
      }
      
      .product-price-offer span{
        color: hsl(0, 0%, 100%);
        font-family: 'Poppins', sans-serif;
        font-size: 0.8rem;
        font-weight: 600;
        text-transform: uppercase;
      }
      
      .product-description p{
        color: hsl(207, 8%, 55%);
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        font-weight: 300;
        line-height: 1.5rem;
        margin: 0;
      }
      
      .product-options{
        align-items: center;
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        user-select: none;
      }
      
      .product-option-title{
        margin-bottom: 0.5rem;
      }
      
      .product-option-title span{
        color: hsl(208, 13%, 25%);
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        font-weight: 500;
        text-transform: uppercase;
      }

      .tabs-header{
        display: flex;
        list-style: none;
        margin: 0;
        margin-bottom: 1rem;
        padding: 0;
      }

      .tabs-header li {
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        padding: 0.5rem;
      }

      .tabs-header .active {
        background-color: lightgray;
      }

      .tab-contents .tab-content {
        display: none;
      }
      
      .tab-contents .active {
        display: block;
      }
    </style>

    <div class="product-info">
      <div class="product-info-element">
        <div class="product-category">
          <h4>smart watch</h4>
        </div>
        <div class="product-title">
          <h2>watch limited edition</h2>
        </div>
        <div class="product-model">
          <h3>model AS1500</h3>
        </div>
        <div class="product-price">
          <div class="product-price-before">
            <span>$299</span>
          </div>
          <div class="product-price-now">
            <span>$290</span>
          </div>
          <div class="product-price-offer">
            <span>early bird offer</span>
          </div>
        </div>
      </div>
      <div class="product-description">
        <ul class="tabs-header">
          <li class="active" data-content="description">Descripción</li>
          <li data-content="specifications">Características</li>
          <li data-content="opinions">Opiniones</li>
        </ul>
        <div class="tab-contents">
          <div class="tab-content active" data-content="description">
            <p>8mm Silver Aluminum Case with Blue Sport Band. Its perfect fit for tracking fitness. 100% waterproof. Buy this limted edition sports edition.</p>
          </div>
          <div class="tab-content" data-content="specifications">
            <p>8mm 100% waterproof. Buy this limted edition sports edition.</p>
          </div>
          <div class="tab-content" data-content="opinions">
            <p>Buy this limted edition sports edition.</p>
          </div>
        </div>
      </div>
      <div class="product-info-element">
        <div class="product-options">
          <div class="product-option">
            <div class="product-option-title">
              <span>available colors</span>
            </div>
            <div class="product-option-values">
              <span>available colors</span>
            </div>
          </div>
          <div class="product-option">
            <div class="product-option-title">
              <span>available sizes</span>
            </div>
            <div class="product-option-values">
              <span>available colors</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    `

    const tabsHeader = this.shadow.querySelector('.tabs-header')
    const tabContents = this.shadow.querySelector('.tab-contents')
    const tabs = tabsHeader.querySelectorAll('li')

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabsHeader.querySelector('.active').classList.remove('active')
        tabContents.querySelector('.active').classList.remove('active')
        tab.classList.add('active')
        tabContents.querySelector(`[data-content="${tab.dataset.content}"]`).classList.add('active')
      })
    })
  }
}

customElements.define('product-info-component', ProductInfo)
