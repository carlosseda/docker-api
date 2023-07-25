class CheckoutForm extends HTMLElement {
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
      .row{
        display: flex;
        gap: 1rem;
        justify-content: space-between;
        user-select: none;
        width: 100%;
      }

      .form-element{
        margin-bottom: 1.5rem;
        width: 100%;
      }

      .form-element-input{
        width: 100%;
      }

      ::placeholder {
        color: hsl(205, 10%, 75%);
        text-transform: capitalize;
      }

      .form-element-input input{
        background-color: hsl(204, 56%, 98%);
        border: 1px solid hsl(207, 26%, 93%);
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        height: 1rem;
        padding: 1.5rem 1rem;
        width: 100%;
      }

      .form-element-input input:focus{
        border: 1px solid hsl(209, 100%, 50%);
        outline: none;
      }

      .form-element-input textarea{
        background-color: hsl(204, 56%, 98%);
        border: 1px solid hsl(206, 29%, 91%);
        box-sizing: border-box;
        font-family: 'Poppins', sans-serif;
        font-weight: 300;
        height: 15vh;
        padding: 1rem;
        width: 100%;
      }

      .form-element-input textarea:focus{
        border: 1px solid hsl(209, 100%, 50%);
        outline: none;
      }

      .form-element-button{
        width: 100%;
      }

      .form-element-button button{
        all: unset;
        background-color: hsl(209, 100%, 50%);
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

      .form-element-button button:hover{
        background-color: hsl(0, 0%, 20%);
      }
    </style>

    <div class="checkout-form">
      <form>
        <div class="row">
            <div class="form-element">
                <div class="form-element-label">
                    <label for="name"></label>
                </div>
                <div class="form-element-input">
                    <input id="name" type="text" placeholder="name" name="name">
                </div>
            </div>
            <div class="form-element">
                <div class="form-element-label">
                    <label for="surname"></label>
                </div>
                <div class="form-element-input">
                    <input id="surname" type="text" placeholder="surame" name="surname">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-element">
                <div class="form-element-label">
                    <label for="email"></label>
                </div>
                <div class="form-element-input">
                    <input id="email" type="email" placeholder="e-mail adress" name="email">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-element">
                <div class="form-element-label">
                    <label for="address"></label>
                </div>
                <div class="form-element-input">
                    <input id="adress" type="text" placeholder="Adress" name="address">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-element">
                <div class="form-element-label">
                    <label for="country"></label>
                </div>
                <div class="form-element-input">
                    <input id="country" type="text" placeholder="country" name="country">
                </div>
            </div>
            <div class="form-element">
                <div class="form-element-label">
                    <label for="city"></label>
                </div>
                <div class="form-element-input">
                    <input id="city" type="email" placeholder="city" name="city">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="form-element-button">
                <button>finish purchase</button>
            </div>
        </div>
      </form>
    </div>
    `
  }
}

customElements.define('checkout-form-component', CheckoutForm)
