class FlipCard extends HTMLElement {
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
      .flip-card{
        height: 70%;
        max-height: 70%;
        position: absolute;
        top: 40%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 25%;
      }
      
      .flip-card .flip-card-front{
        background-color: hsl(0, 0%, 100%);
        display: flex;
        height: 100%;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
        width: 100%;  
        backface-visibility: hidden;
        padding: 3rem 2rem;
        transform: perspective(1000px) rotateY(0deg);
        transition: 1s;
      }
      
      .flip-card.active .flip-card-front{
        transform: perspective(1000px) rotateY(180deg);
      }
      
      .flip-card .flip-card-back{
        background-color: hsl(0, 0%, 100%);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: absolute;
        top: 0;   
        left: 0;
        width: 100%;  
        height: 100%;
        padding: 3rem 2rem;
        backface-visibility: hidden;
        transform: perspective(1000px) rotateY(-180deg);
        transition: 1s;
      }
      
      .flip-card.active .flip-card-back{
        transform: perspective(1000px) rotateY(0deg);
      } 

      .flip-card-container-button button{
        all: unset;
        background-color: hsl(209, 100%, 50%);;
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
      
      .flip-card-close-button{
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
      }
      
      .flip-card-close-button svg{
        cursor: pointer;
        fill: hsl(205, 10%, 75%);
        width: 1.2rem;
      }
    </style>

    <div class="flip-card">
      <div class="flip-card-front">
        <slot name="front"></slot>
        <div class="flip-card-container-button">
          <button class="flip-button">Contact us</button>
        </div>
      </div>
      <div class="flip-card-back">
        <div class="flip-card-close-button flip-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        </div>
        <slot name="back"></slot>
      </div>
    </div>
    `

    const flipButtons = this.shadow.querySelectorAll('.flip-button')

    flipButtons.forEach((flipButton) => {
      flipButton.addEventListener('click', () => {
        flipButton.closest('.flip-card').classList.toggle('active')
      })
    })
  }
}

customElements.define('flip-card-component', FlipCard)
