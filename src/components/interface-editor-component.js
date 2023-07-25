class InterfaceEditor extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.name = null
    this.json = null
  }

  connectedCallback () {
    document.addEventListener('showInterfaceEditor', this.handleShowInterfaceEditor.bind(this));
    document.addEventListener('hideOverlayer', this.handleHideOverlayer.bind(this))
    this.render()
  }

  handleShowInterfaceEditor = async event => {
    this.name = event.detail.name
    this.json = event.detail.json
    this.component = event.detail.component
    this.shadow.querySelector('.modal').classList.add('active')
    document.dispatchEvent(new CustomEvent('showOverlayer'))

    if(this.component) {
      await this.loadComponentOptions()
    }else{
      await this.loadComponents()
    }

    await this.loadJsonEditor()
  }

  handleHideOverlayer (event) {
    if (this.shadow.querySelector('.modal').classList.contains('active')) {
      this.shadow.querySelector('.modal').classList.remove('active')
    }
  }

  render () {

    this.shadow.innerHTML = 
      `
      <style>
        .modal {
          bottom: 30px;
          left: 30px;
          position: fixed;
          opacity: 0;
          top: 30px;
          right: 30px;
          z-index: -1;
          visibility: hidden;
        }

        .modal.active {
          opacity: 1;
          visibility: visible;
          z-index: 50000;
        }

        .modal-content {
          background-color: white;
          border: 1px solid #888;
          border-radius: 5px;
          box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2),0 6px 20px 0 rgba(0,0,0,0.19);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          position: relative;
          width: 100%;
        }

        .modal-header {
          align-items: center;
          display: flex;
          height: 5%;
          justify-content: space-between;
          padding: 1%;
          width: 98%;
        }

        .modal-header h2 {
          font-family: 'Roboto', sans-serif;
          margin: 0;
        }

        .modal-header .close {
          color: #aaa;
          float: right;
          font-size: 28px;
          font-weight: bold;
        }

        .modal-header .close:hover,
        .modal-header .close:focus {
          color: black;
          text-decoration: none;
          cursor: pointer;
        }

        .modal-body {
          display: flex;
          flex-direction: column;
          height: 85%;
        }

        .interface-editor {
          border-bottom: 1px solid #dcdcde;
          border-top: 1px solid #dcdcde;
          display: flex;
          height: 100%;
        }

        .interface-editor-visualization {
          align-content: flex-start;
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          height: 96%;
          overflow: scroll;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 1%;
          width: 80%;
        }

        .interface-editor-visualization-display{
          background-color: #f1f1f1;
          border: 1px solid #dcdcde;
          height: 10%;
          margin: 0 auto;
          width: 80%;
        }

        .interface-editor-components {
          background-color: #f1f1f1;
          height: 100%;
          overflow: scroll;
          overflow-y: auto;
          overflow-x: hidden;
          width: 20%;
        }

        .modal-footer {
            display: flex;
            justify-content: flex-end;
            padding: 1rem;
        }

        .modal-footer button {
            background-color: #ccc;
            border: none;
            border-radius: 5px;
            color: white;
            font-size: 16px;
            padding: 12px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            margin: 4px 2px;
            transition-duration: 0.4s;
        }

        .modal-footer button.active {
            background-color: hsl(207, 85%, 69%);
            cursor: pointer;
        }
      </style>

      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
              <h2>Editor visual</h2>
              <span class="close">&times;</span>
          </div>
          <div class="modal-body">
            <div class ="interface-editor">
              <div class="interface-editor-visualization">
                <div class="interface-editor-visualization-display">
                </div>
              </div>
              <div class="interface-editor-components">
              </div>
              <div class="interface-editor-component-options">
              </div>
            </div>
          </div>
          <div class="modal-footer">
              <button class="btn btn-primary">Generar JSON</button>
          </div>
        </div>
      </div>
    `

    this.shadow.querySelector('.close').addEventListener('click', () => {
      this.closeGallery()
    })
  }

  loadComponentOptions = async => {
    console.log(this.component)
  }

  loadComponents = async => {
  }

  async sendDataToForm () {
    // const image = {}
    // image.name = this.getAttribute('name')
    // image.alt = this.shadow.querySelector('input[name="alt"]').value
    // image.title = this.shadow.querySelector('input[name="title"]').value
    // image.languageAlias = this.getAttribute('languageAlias')
    // image.filename = this.shadow.querySelector('.image.selected').getAttribute('data-filename')

    // if (this.updateFile) {
    //   document.dispatchEvent(new CustomEvent('updateThumbnail', {
    //     detail: {
    //       previousImage: this.updateFile,
    //       image
    //     }
    //   }))
    // } else {
    //   document.dispatchEvent(new CustomEvent('createThumbnail', {
    //     detail: {
    //       image
    //     }
    //   }))
    // }

    document.dispatchEvent(new CustomEvent('hideOverlayer'))

    this.name = null
    this.json = null

    this.closeGallery()
  }

  async closeGallery () {

    document.dispatchEvent(new CustomEvent('hideOverlayer'))

    // this.shadow.querySelector('.modal-footer button').classList.remove('active')

    // this.shadow.querySelectorAll('.image').forEach(item => {
    //   item.classList.remove('selected')
    // })

    this.shadow.querySelector('.modal').classList.remove('active')
  }
}

customElements.define('interface-editor-component', InterfaceEditor)
