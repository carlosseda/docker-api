const {Window} = require('happy-dom')
const fs = require('fs').promises
const path = require('path')
const indexDir = path.dirname(require.main.filename)

module.exports = class CacheService {

  constructor() {
  }

  async generateCache(section, path, structure, page) {
    const resource = path.split('/').pop()
  
    try {
      await fs.access(`${indexDir}/src/pages/${section}/${resource}`)
    } catch (error) {
      await fs.mkdir(`${indexDir}/src/pages/${section}/${resource}`, { recursive: true })
    }
  
    try {
      await fs.writeFile(`${indexDir}/src/pages/${section}/${resource}/index.html`, page)
      await fs.writeFile(`${indexDir}/src/pages/${section}/${resource}/structure.json`, JSON.stringify(structure))
    } catch (error) {
      console.log(error)
    }
  }

  async getCache(section, resourceElement, structure) {

    const resource = resourceElement.split('/').pop()
    const filePath = `${indexDir}/src/pages/${section}/${resource}/structure.json`

    try {
      await fs.access(filePath);
      const structureCache = await fs.readFile(filePath, 'utf-8')
      
      if (JSON.stringify(structure) == structureCache) {
        const pageCache = await fs.readFile(`${indexDir}/src/pages/${section}/${resource}/index.html`, 'utf-8')      
        return pageCache
      } else {
        return null
      }
    } catch (error) {
      return null
    }
  }

  async hydrateCache(section, resourceElement, endpoint, model, attributes) {

    const window = new Window()
    const document = window.document
    const resource = resourceElement.split('/').pop()
    const cacheFile = `${indexDir}/src/pages/${section}/${resource}/index.html`

    try {

      await fs.access(cacheFile)
      const pageCache = await fs.readFile(cacheFile, 'utf-8')
      window.document.documentElement.innerHTML = pageCache
      const component = document.querySelector(`[endpoint="${endpoint}"][method="GET"]`)

      if(component?.getAttribute('pagination')) {
        const page = 1
        const limit = 10
        const offset = (page - 1) * limit

        const data = await model.findAndCountAll({
          attributes,
          limit,
          offset,
          order: [['createdAt', 'DESC']]
        })
          
        data.meta = {
          total: data.count,
          pages: Math.ceil(data.count / limit),
          currentPage: page
        }

        component.setAttribute('data', JSON.stringify(data).replace(/"/g, "'"))
      }else{
        const data = await model.findAll({
          attributes
        })
        component.setAttribute('data', JSON.stringify(data).replace(/"/g, "'"))
      }

      const page = document.documentElement.outerHTML
      await fs.writeFile(`${indexDir}/src/pages/${section}/${resource}/index.html`, page)

    } catch (error) {
      console.log(error);
    }

  }
}

