class SectionDescription extends HTMLElement {
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
      .section-description {
        margin: 0 auto;
        width: 50%;
      }
      
      .section-description p{
        font-family: 'Poppins', sans-serif;
        font-size: 1.2rem;
        line-height: 1.5;
        margin: 0;
        text-align: center;
      }
      
      .section-description::after{
        background-color: hsl(300, 5%, 92%);
        content: "";
        display: block;
        height: 0.4rem;
        margin: 1rem auto 5rem;
        width: 10%;
      }
    </style>

    <div class="section-description">
      <p>Everybody loves tech gadgets, But our’s is different. Here is how it works. Its should be simple. Add how easy is to install your product</p>
    </div>
    `
  }
}

customElements.define('section-description-component', SectionDescription)
