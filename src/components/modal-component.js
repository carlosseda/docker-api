class Modal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
  }

  connectedCallback () {
    document.addEventListener('modal', event => {
      this.shadow.querySelector('.modal').classList.add('active')
    })

    this.render()
  }

  render () {
    this.shadow.innerHTML =
    `
    <style>
      .modal{
        background-color: hsla(0, 0%, 100%, 0.8);
        height: 100vh;
        position: fixed;
        left: 0;
        opacity: 0;
        top: 0;
        transition: all 0.2s ease-in-out;
        width: 100%;
        z-index: -1;
      }
      
      .modal.active{
        opacity: 1;
        z-index: 2000;
      }
      
      .modal-content{
        background-color: hsl(0, 0%, 100%);
        border-radius: 0.5rem;
        box-shadow: 0 0 1rem hsla(0, 0%, 0%, 0.2);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        position: relative;
        width: 70%;
      }
      
      .modal-close-button{
        cursor: pointer;
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        z-index: 2000;
      }
      
      .modal-close-button svg{
        fill: hsl(205, 10%, 75%);
        width: 1.2rem;
      }
    </style>

    <div class="modal">
      <div class="modal-content">
        <div class="modal-close-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>close</title><path d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" /></svg>
        </div>
        <slot></slot>
      </div>
    </div>
    `

    const modalButton = this.shadow.querySelector('.modal-close-button')
    const modal = this.shadow.querySelector('.modal')

    modalButton.addEventListener('click', () => {
      modal.classList.toggle('active')
    })
  }
}

customElements.define('modal-component', Modal)
