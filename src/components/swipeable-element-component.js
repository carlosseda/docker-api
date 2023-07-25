class SwipeableElement extends HTMLElement {
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

      .swipe{
        transform: translateX(-50%);
      }

      .swipeable-element{
        display: flex;
        justify-content: space-between;
        height: 100%;
        min-width: 200%;
        position: relative;
        transition: all 0.5s ease;
        width: 200%;
        z-index: 1000;
      }

      .swipeable-element-content{
        max-width: 100%;
        padding: 4% 5%;
        width: 90%;
      }

      .swipeable-element-content.primary{
        z-index: 999;
      }

      .swipeable-element-content.secondary{
        z-index: 999;
      }

      .swipe-button-container button{
        all: unset;
        background-color: hsl(209, 100%, 50%);
        border-radius: 0.5rem;
        color: hsl(0, 0%, 100%);
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-size: 1.2rem;
        font-weight: 600;
        margin: 0 auto;
        padding: 1.5rem 0;
        text-transform: uppercase;
        text-align: center;
        width: 100%;
      }

      .swipe-button-container button:hover,
      .swipe-button-container button:focus{
        background-color: hsl(208, 13%, 25%);
        color: hsl(0, 0%, 100%);
      }
      
      .swipe-back-button-container{
        margin: 0 auto;
        margin-bottom: 2rem;
        width: max-content;
      }
      
      .swipe-back-button-container button{
        all: unset;
        background-color: hsl(204, 56%, 98%);
        border: 1px solid hsl(210, 11%, 89%);
        border-radius: 1rem;
        color: hsl(208, 11%, 74%);
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        margin: 0 auto;
        padding: 0.5rem 1rem;
        text-align: center;
        width: max-content;
      }
      
      .swipe-back-button-container button:hover,
      .swipe-back-button-container button:focus{
        background-color: hsl(208, 13%, 25%);
        color: hsl(0, 0%, 100%);
      }
    </style>

    <div class="swipeable-element">
      <div class="swipeable-element-content primary">
        <slot name="primary-swipe-content"></slot>
        <div class="swipe-button-container">
          <button class="swipe-button">checkout</button>
        </div>
      </div>
      <div class="swipeable-element-content secondary">
        <div class="swipe-back-button-container">
          <button class="swipe-button">go back</button>
        </div>
        <slot name="secondary-swipe-content"></slot>
      </div>
    </div>
    `

    const swipeableButtons = this.shadow.querySelectorAll('.swipe-button')

    swipeableButtons.forEach((swipeableButton) => {
      swipeableButton.addEventListener('click', () => {
        swipeableButton.closest('.swipeable-element').classList.toggle('swipe')
      })
    })
  }
}

customElements.define('swipeable-element-component', SwipeableElement)
