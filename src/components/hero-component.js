class Hero extends HTMLElement {
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
      .hero{
        height: 80vh;
        max-height: 80vh;
        overflow: hidden;
        position: relative;
      }
      
      .hero-image{
        object-fit: cover;
        position: absolute;
        width: 100%;
        z-index: -1;
      }

      .hero-text{
        align-items: center;
        bottom: 10%;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        justify-content: center;
        left: 50%;
        position: absolute;
        top: 10%;
        transform: translateX(-50%);
        width: 80%;
      }
     
      .hero-title h2{
        color: hsl(209, 100%, 50%);
        font-family: 'Poppins', sans-serif;
        font-size: 5rem;
        margin: 0;
        text-align: center;
        z-index: 1000;
      }
      
      .hero-description p{
        color: hsl(209, 100%, 50%);
        font-family: 'Poppins', sans-serif;
        font-size: 1.75rem;
        letter-spacing: -.2px;
        line-height: 1.5;
        margin: 0;
        text-align: center;
      }
      
    </style>

    <div class="hero">
      <div class="hero-image">
          <picture>
            <source media="(min-width: 2048px)" srcset="images/hero-2560-1080.webp">
            <source media="(min-width: 1024px)" srcset="images/hero.webp">
            <source media="(min-width: 768px)" srcset="images/hero.webp">
            <source media="(min-width: 480px)" srcset="images/hero.webp">
            <img src="images/hero.webp" alt="Imagen hero">
          </picture>
      </div>
      <div class="hero-text">
        <div class="hero-title">
          <h2>The future of tech is here</h2>
        </div>
        <div class="hero-description">
          <p>Holisticly incentivize revolutionary collaboration and idea sharing before cost effective users. Actual focused services before highly efficient human capital.</p>
        </div>
        <div class="hero-button">
          <slot name="button"></slot>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('hero-component', Hero)
