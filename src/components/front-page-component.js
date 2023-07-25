import { API_URL } from '../config/config.js'

class FrontPage extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.load = false

    document.addEventListener('newUrl', this.handleNewUrl.bind(this))
  }

  static get observedAttributes () { return ['url'] }

  connectedCallback () {}

  async attributeChangedCallback (name, oldValue, newValue) {

    if(oldValue === newValue) return

    this.data = await this.setPageStructure()
    await this.render()
  }

  handleNewUrl (event) {
    this.setAttribute('url', event.detail.url)
  }

  async setPageStructure() {

    const url = new URL(`${API_URL}/front/front-pages/page`)
    url.searchParams.append('url', this.getAttribute('url'))

    try {
      const response = await fetch(url, {
        headers: {
          Authorization: 'Bearer ' + sessionStorage.getItem('accessToken')
        }
      })

      if(response.status == 500 || response.status == 404) {
        throw response
      }

      if(response.status == 200){
        const data = await response.json()
        return data
      }
    } catch (error) {
      
      const data = await error.json()

      document.dispatchEvent(new CustomEvent('message', {
        detail: {
          message: data.message || 'Fallo al cargar los datos',
          type: 'error'
        }
      }))
    }
  }

  async render () {

    this.shadow.innerHTML = ''
    const page = this.data.structure.page

    if (page.body) {
      if(page.body.style) {
        Object.keys(page.body.style).forEach(key => {
          document.body.style[key] = page.body.style[key]
        })
      }
    }

    if(page.header) {

      const header = document.createElement('header')

      if(page.header.style) {
        Object.keys(page.header.style).forEach(key => {
          header.style[key] = page.header.style[key]
        })
      }

      if(page.header.rows) {

        for (const row in page.header.rows) {

          const headerRow = document.createElement('div')
          headerRow.classList.add('row')

          if(page.header.rows[row].style) {
            Object.keys(page.header.rows[row].style).forEach(key => {
              headerRow.style[key] = page.header.rows[row].style[key]
            })
          }

          for (const component in page.header.rows[row].components) {

            const componentElement = page.header.rows[row].components[component]
            const customComponent = document.createElement(`${componentElement.name}`)

            Object.entries(componentElement).forEach(([key, value]) => {
              if(key != 'name') {
                customComponent.setAttribute(key, value)
              }
            })
                
            headerRow.appendChild(customComponent)
          }

          header.appendChild(headerRow)
        }
      }

      this.shadow.appendChild(header)
    }

    if(page.main) {

      const main = document.createElement('main')

      if(page.main.style) {
        Object.keys(page.main.style).forEach(key => {
          main.style[key] = page.main.style[key]
        })
      }

      if(page.main.rows) {

        for (const row in page.main.rows) {

          const mainRow = document.createElement('div')
          mainRow.classList.add('row')

          if(page.main.rows[row].style) {
            Object.keys(page.main.rows[row].style).forEach(key => {
              mainRow.style[key] = page.main.rows[row].style[key]
            })
          }

          for (const component in page.main.rows[row].components) {

            const componentElement = page.main.rows[row].components[component]
            const customComponent = document.createElement(`${componentElement.name}`)

            Object.entries(componentElement).forEach(([key, value]) => {
              if(key != 'name') {
                customComponent.setAttribute(key, value)
              }
            })

            mainRow.appendChild(customComponent)
          }
          
          main.appendChild(mainRow) 
        }
      }
    
      this.shadow.appendChild(main)
    }
  }
}

customElements.define('front-page-component', FrontPage)

