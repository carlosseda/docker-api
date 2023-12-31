class DeleteElementModal extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    document.addEventListener('showDeleteModal', this.handleShowDeleteModal.bind(this))
    document.addEventListener('hideOverlayer', this.handleHideOverlayer.bind(this))
  }

  connectedCallback () {
    this.render()
  }

  handleShowDeleteModal (event) {
    this.url = `${window.env.API_URL}${event.detail.endPoint}/${event.detail.element}`
    this.endPoint = event.detail.endPoint
    this.subtable = event.detail.subtable
    this.shadow.querySelector('.modal-delete').classList.add('active')
  }

  handleHideOverlayer (event) {
    if (this.shadow.querySelector('.modal-delete').classList.contains('active')) {
      this.shadow.querySelector('.modal-delete').classList.remove('active')
    }
  }

  render () {
    this.shadow.innerHTML =
      `
      <style>
          .modal-delete{
              background-color: hsl(0, 0%, 100%);
              position: fixed;
              left: 0;
              right: 0;
              margin-left: auto;
              margin-right: auto;
              opacity: 0;
              top: 30%;
              transition: opacity 0.3s ease;
              width: 40%;
              z-index: -1;
          }

          .modal-delete.active{
              opacity: 1;
              z-index: 3000;
          }
          
          .modal-delete-header{
              background-color: $grey;
              border-bottom: 1px solid #e9ecef;
              padding: 0.5em 1em;
              text-align: center;
          }

          .modal-delete-header h4{
              font-size: 1.2em;
              font-family: 'Roboto', sans-serif;
              margin: 0;
          }
          
          .modal-delete-footer{
              display: flex;
          }

          .modal-delete-option{
              color: hsl(0, 0%, 100%);
              cursor: pointer;
              font-weight: 600;
              font-family: 'Roboto', sans-serif;
              text-align: center;
              width: 50%;
          }

          .modal-delete-option#delete-cancel{
              background-color: hsl(183, 98%, 35%);;
          }

          .modal-delete-option#delete-confirm{
              background-color: hsl(0, 65%, 55%);
          }
      </style>

      <div class="modal-delete">
          <div class="modal-delete-content">

              <div class="modal-delete-header">
                  <h4>¿Quiere eliminar este registro?</h4>
              </div>

              <div class="modal-delete-footer">
                  <div class="modal-delete-option" id="delete-confirm">
                      <h4>Sí</h4>
                  </div>
                  <div class="modal-delete-option " id="delete-cancel">
                      <h4>No</h4>
                  </div>
              </div>
          </div>
      </div>
      `

    this.shadow.querySelector('#delete-confirm').addEventListener('click', async () => {

      try{
        const response = await window.axios.delete(this.url, {
          headers: {
            Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
          }
        })

        if (response.status == 500 || response.status == 400) {
          throw new Error(response.data.message)
        }

        if (response.status == 200) {
          document.dispatchEvent(new CustomEvent('refreshTable', {
            detail: {
              endpoint: this.endPoint,
              data: response.data?.result?.rows ?? null
            }
          }))

          document.dispatchEvent(new CustomEvent('refreshForm', {
            detail: {
              endpoint: this.endPoint,
            }
          }))

          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: response.data.message,
              type: 'success'
            }
          }))

          document.dispatchEvent(new CustomEvent('hideOverlayer'))

          this.shadow.querySelector('.modal-delete').classList.remove('active')
        }
      }
      catch(error){
        document.dispatchEvent(new CustomEvent('message', {
          detail: {
            message: error.message,
            type: 'error'
          }
        }))
      }
    })

    this.shadow.querySelector('#delete-cancel').addEventListener('click', () => {
      document.dispatchEvent(new CustomEvent('hideOverlayer'))
      this.shadow.querySelector('.modal-delete').classList.remove('active')
    })
  }
}

customElements.define('delete-element-modal-component', DeleteElementModal)
