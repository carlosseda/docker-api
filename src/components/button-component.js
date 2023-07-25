class Button extends HTMLElement {
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
      button{
        all: unset;
        background-color: ${this.getAttribute('color')};
        border-radius: 30px;
        color: hsl(0, 0%, 100%);
        cursor: pointer;
        font-family: 'Poppins', sans-serif;
        font-weight: 600;
        text-transform: uppercase;
      }

      button.small{
        font-size: 1rem;
        padding: 0.75rem 2.5rem;
      }

      button.big{
        font-size: 2rem;
        padding: 1rem 4rem;
      }
      
      button:hover{
        background-color: hsl(0, 0%, 20%);
      }

    </style>

    <button class="${this.getAttribute('size')}"><slot>Click Me</slot></button>
    `

    this.shadow.querySelector('button').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent(this.getAttribute('event')))
    })
  }
}

customElements.define('button-component', Button)
