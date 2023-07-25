class Page extends HTMLElement {
  constructor() {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })

    document.addEventListener('changeStructure', this.handleChangeStructure.bind(this))
    document.addEventListener('DOMContentLoaded', () => {
      this.structure = JSON.parse(this.getAttribute('structure').replace(/'/g, '"'))
      this.emitStructure(this.structure)
    })
  }

  handleChangeStructure(event) {
    this.structure = event.detail.structure
    this.emitStructure(this.structure)
  }

  emitStructure = (structure) => {
    document.dispatchEvent(new CustomEvent('pageStructure', {
      detail: { 
        structure: structure
      }
    }))
  }
}

customElements.define('page-component', Page)
