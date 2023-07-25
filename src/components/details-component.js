class Details extends HTMLElement {
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
      .details{
        display: flex;
        gap: 2rem;
        justify-content: space-between;
        margin: 0 auto;
        user-select: none;
        width: 100%;
      }
      
      .details-column{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      
      .details-item{
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        user-select: none;
      }
      
      .details-item-icon svg{
        fill:$primary-color;
        width: 2rem;
      }
      
      .details-item-title{
        margin-bottom: 0.5rem;
      }
      
      .details-item-title h3{
        font-family: 'Poppins', sans-serif;
        font-size: 1.3rem;
        margin: 0;
      }
      
      .details-item-description p{
        font-family: 'Poppins', sans-serif;
        font-size: 1rem;
        line-height: 1.5;
        margin: 0;
      }
      
      .details-image{
        padding: 0 5rem;
        width: max-content;
      }
    </style>

    <div class="details">
      <div class="details-column">
        <div class="details-item">
          <div class="details-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>key-variant</title><path d="M22,18V22H18V19H15V16H12L9.74,13.74C9.19,13.91 8.61,14 8,14A6,6 0 0,1 2,8A6,6 0 0,1 8,2A6,6 0 0,1 14,8C14,8.61 13.91,9.19 13.74,9.74L22,18M7,5A2,2 0 0,0 5,7A2,2 0 0,0 7,9A2,2 0 0,0 9,7A2,2 0 0,0 7,5Z" /></svg>                        
          </div>
          <div class="details-item-text">
            <div class="details-item-title">
              <h3>Fast and secure</h3>
            </div>
            <div class="details-item-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </div>
          </div>
        </div>
        <div class="details-item">
          <div class="details-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>diamond-stone</title><path d="M16,9H19L14,16M10,9H14L12,17M5,9H8L10,16M15,4H17L19,7H16M11,4H13L14,7H10M7,4H9L8,7H5M6,2L2,8L12,22L22,8L18,2H6Z" /></svg>                        
          </div>
          <div class="details-item-text">
            <div class="details-item-title">
              <h3>Voice Assistant</h3>
            </div>
            <div class="details-item-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </div>
          </div>
        </div>
        <div class="details-item">
          <div class="details-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>bullhorn-outline</title><path d="M12,8H4A2,2 0 0,0 2,10V14A2,2 0 0,0 4,16H5V20A1,1 0 0,0 6,21H8A1,1 0 0,0 9,20V16H12L17,20V4L12,8M15,15.6L13,14H4V10H13L15,8.4V15.6M21.5,12C21.5,13.71 20.54,15.26 19,16V8C20.53,8.75 21.5,10.3 21.5,12Z" /></svg>                        </div>
          <div class="details-item-text">
            <div class="details-item-title">
              <h3>Apps you love</h3>
            </div>
            <div class="details-item-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </div>
          </div>
        </div>
      </div>
      <div class="details-column">
        <div class="details-image">
          <picture>
            <source media="(min-width: 1024px)" srcset="images/details.webp">
            <source media="(min-width: 768px)" srcset="images/details.webp">
            <source media="(min-width: 480px)" srcset="images/details.webp">
            <img src="images/details.webp" alt="Imagen detalles">
          </picture>
        </div>
      </div>
      <div class="details-column">
        <div class="details-item">
          <div class="details-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>thumb-up-outline</title><path d="M5,9V21H1V9H5M9,21A2,2 0 0,1 7,19V9C7,8.45 7.22,7.95 7.59,7.59L14.17,1L15.23,2.06C15.5,2.33 15.67,2.7 15.67,3.11L15.64,3.43L14.69,8H21C22.11,8 23,8.9 23,10V12C23,12.26 22.95,12.5 22.86,12.73L19.84,19.78C19.54,20.5 18.83,21 18,21H9M9,19H18.03L21,12V10H12.21L13.34,4.68L9,9.03V19Z" /></svg>                        
          </div>
          <div class="details-item-text">
            <div class="details-item-title">
              <h3>Stay in touch</h3>
            </div>
            <div class="details-item-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </div>
          </div>
        </div>
        <div class="details-item">
          <div class="details-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>account</title><path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z" /></svg>                        </div>
          <div class="details-item-text">
            <div class="details-item-title">
              <h3>Designed for you</h3>
            </div>
            <div class="details-item-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </div>
          </div>
        </div>
        <div class="details-item">
          <div class="details-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>map-clock-outline</title><path d="M15,12H16.5V16.25L19.36,17.94L18.61,19.16L15,17V12M16,9C16.69,9 17.37,9.1 18,9.29V4.7L15,5.86V9.07C15.33,9 15.66,9 16,9M23,16A7,7 0 0,1 16,23C13,23 10.4,21.08 9.42,18.4L8,17.9L2.66,19.97L2.5,20A0.5,0.5 0 0,1 2,19.5V4.38C2,4.15 2.15,3.97 2.36,3.9L8,2L14,4.1L19.34,2.03L19.5,2A0.5,0.5 0 0,1 20,2.5V10.25C21.81,11.5 23,13.62 23,16M9,16C9,13.21 10.63,10.8 13,9.67V5.87L9,4.47V16.13H9C9,16.09 9,16.04 9,16M16,11A5,5 0 0,0 11,16A5,5 0 0,0 16,21A5,5 0 0,0 21,16A5,5 0 0,0 16,11M4,5.46V17.31L7,16.15V4.45L4,5.46Z" /></svg>                        
          </div>
          <div class="details-item-text">
            <div class="details-item-title">
              <h3>Precise timepiece</h3>
            </div>
            <div class="details-item-description">
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    `
  }
}

customElements.define('details-component', Details)
