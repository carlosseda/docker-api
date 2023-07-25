const {Window} = require('happy-dom')
const fs = require('fs').promises
const axios = require('axios')
const dotenv = require('dotenv')
const process = require('process')
const path = require('path')
const indexDir = path.dirname(require.main.filename)
const ComponentService = require('./component-service.js')

module.exports = class PageService {

  constructor() {
    this.loadComponents = []
    this.loadLibraries = []
    this.window = new Window();
    this.componentService = new ComponentService();
  }

  async generatePage(page, cookies = null) {

    const document = this.window.document
    const structure = page.structure.page

    const doctype = document.implementation.createDocumentType('html', '', '')
    document.appendChild(doctype)

    document.documentElement.setAttribute('lang', 'es')

    const viewport = document.createElement('meta')
    viewport.setAttribute('name', 'viewport')
    viewport.setAttribute('content', 'width=device-width, initial-scale=1.0')

    const title = document.createElement('title')
    title.innerHTML = page.localeSeo.title

    const metaDescription = document.createElement('meta')
    metaDescription.setAttribute('name', 'description')
    metaDescription.setAttribute('content', page.localeSeo.description)

    const metaKeywords = document.createElement('meta')
    metaKeywords.setAttribute('name', 'keywords')
    metaKeywords.setAttribute('content', page.localeSeo.keywords)

    document.head.appendChild(viewport) 
    document.head.appendChild(title)
    document.head.appendChild(metaDescription)
    document.head.appendChild(metaKeywords)

    const envScriptElement = document.createElement('script')
    envScriptElement.textContent = "window.env = {};"
    envScriptElement.textContent += `window.env.API_URL = "${process.env.API_URL}";`
    document.head.appendChild(envScriptElement);

    if(cookies && cookies.accessToken){
      this.window.sessionStorage.setItem('accessToken', cookies.accessToken)
    }

    // const componentPath = path.join(indexDir, 'src/pages/page-component.js');
    // const componentCode = await fs.readFile(componentPath, 'utf-8');
    // const componentScriptElement = document.createElement('script');
    // componentScriptElement.textContent = componentCode;
    // document.head.appendChild(componentScriptElement);
    // this.loadComponents.push('page-component')

    // const pageComponent = document.createElement(`page-component`)
    // pageComponent.setAttribute('structure', JSON.stringify(structure).replace(/"/g, "'"))
    // document.body.appendChild(pageComponent)
    
    if(structure.head?.scripts?.libraries) {

      for (const library in structure.head.scripts.libraries) {

        const libraryElement =  structure.head.scripts.libraries[library]

        if(!this.loadLibraries.includes(libraryElement.name)) {

          const libraryPath = path.join(indexDir, libraryElement.path)
          const libraryCode = await fs.readFile(libraryPath, 'utf-8')
          const libraryScriptElement = document.createElement('script')
          
          libraryScriptElement.setAttribute('defer', '')

          libraryScriptElement.textContent = libraryCode;
          document.head.appendChild(libraryScriptElement)

          this.loadLibraries.push(libraryElement.name)
        }
      }
    }

    if(structure.head?.scripts?.preloadComponents) {

      for (const preloadComponent in structure.head.scripts.preloadComponents) {

        const preloadComponentElement =  structure.head.scripts.preloadComponents[preloadComponent]
          
        if(!this.loadComponents.includes(preloadComponentElement.name)) {

          const preloadComponentPath = path.join(indexDir, 'src/components', `${preloadComponentElement.name}.js`);
          const preloadComponentCode = await fs.readFile(preloadComponentPath, 'utf-8')
          const preloadComponentScriptElement = document.createElement('script')

          preloadComponentScriptElement.textContent = preloadComponentCode
          document.head.appendChild(preloadComponentScriptElement)

          this.loadComponents.push(preloadComponentElement.name)
        }
      }
    }

    for(const element in structure) {

      if(element !== 'body' && element !== 'head' && !document.querySelector(element)){
        document.body.appendChild(document.createElement(element))
      }

      if(structure[element].style) {
        Object.keys(structure[element].style).forEach(key => {
          document.querySelector(element).style[key] = structure[element].style[key]
        })
      }

      if(structure[element].rows) {
        const elementTag = document.querySelector(element)
        await this.generateRows(document, page, structure[element].rows, elementTag)
      }
    }

    const envStoreScriptElement = document.createElement('script')
    envStoreScriptElement.textContent += `window.env.STRUCTURE = ${JSON.stringify(this.componentService)};`   
    document.head.appendChild(envStoreScriptElement);

    const html = document.documentElement.outerHTML

    return html
  }

  async generateRows(document, page, rows, parentElement) {

    const rowElements = await Promise.all(Object.values(rows).map(async row => {

      const rowElement = document.createElement('div')
      rowElement.classList.add('row')

      if(row.style) {
        Object.keys(row.style).forEach(key => {
          rowElement.style[key] = row.style[key]
        })
      }

      for (const componentColumn in row.columns) {
        
        const componentElement =  row.columns[componentColumn]

        if(!this.loadComponents.includes(componentElement.name)) {

          const componentPath = path.join(indexDir, 'src/components', `${componentElement.name}.js`);
          const componentCode = await fs.readFile(componentPath, 'utf-8');
          const componentScriptElement = document.createElement('script');

          componentScriptElement.textContent = componentCode;
          document.head.appendChild(componentScriptElement);

          this.loadComponents.push(componentElement.name)
        }
        
        const customComponent = document.createElement(`${componentElement.name}`)

        if(componentElement.structure) {
          this.componentService.componentStructure(componentElement)
        }

        if(componentElement.endpoint && componentElement.method == 'GET') {
          const endpoint = `${process.env.API_URL}${componentElement.endpoint}`;  

          const response = await axios.get(endpoint, {
            headers: {
              'Authorization': `Bearer ${this.window.sessionStorage.getItem('accessToken')}`,
            }
          })

          this.componentService.componentData(componentElement, response.data)
        }

        Object.entries(componentElement).forEach(([key, value]) => {
          if(key == 'dependant'){
            customComponent.classList.add('dependant')
            customComponent.setAttribute('dependant', value)
          }

          if(key != 'name' && key != 'style' && key != 'rows' && key != 'dependant' && key != 'structure') {
            customComponent.setAttribute(key, value)
          }
        })

        const column = document.createElement('div')
        column.classList.add('column')
        column.appendChild(customComponent)
        rowElement.appendChild(column)

        if(componentElement.style) {
          Object.keys(componentElement.style).forEach(key => {
            column.style[key] = componentElement.style[key]
          })
        }
        
        if(row.columns[componentColumn].rows) {
          await this.generateRows(document, page, row.columns[componentColumn].rows, column)
        }
      }

      return rowElement
    }))

    parentElement.append(...rowElements);
  }

  async getStaticPage(url) {

    const pageFile = path.join(indexDir, 'src/pages', `${url}.html`)

    try {
      const content = await fs.readFile(pageFile, 'utf8')
      return content;
    } catch (err) {
      const errorFile = path.join(indexDir, 'src/pages', '404.html')
      const errorContent = await fs.readFile(errorFile, 'utf8')
      return errorContent;
    }
  }

  async setCookie(name, value, options = {}) {
    const cookieOptions = {
      path: '/',
      ...options
    };
  
    const cookie = `${name}=${value}; ${Object.entries(cookieOptions)
      .map(([key, value]) => `${key}=${value}`)
      .join('; ')}`
  
    return cookie;
  }
}

