class AdminTable extends HTMLElement {
  constructor () {
    super()
    this.queryString = null
    this.total = null
    this.currentPage = null
    this.lastPage = null
    this.data = null
    this.structure = null

    if(!this.shadowRoot) {
      this.shadow = this.attachShadow({ mode: 'open' })
    }
  }

  async connectedCallback () {
    document.addEventListener('refreshTable', this.handleRefreshTable.bind(this))
    document.addEventListener('newFilter', this.handleNewFilter.bind(this))
    document.addEventListener('showDependants', this.handleShowDependants.bind(this))
    document.addEventListener('hideDependants', this.handleHideDependants.bind(this))

    document.addEventListener('DOMContentLoaded', () => {
      this.component = window.env.STRUCTURE.loadComponents['admin-table-component'][this.getAttribute('endpoint')][this.getAttribute('method')]

      this.data = this.component.data.rows
      this.total = this.component.data.meta.total
      this.currentPage = this.component.data.meta.currentPage
      this.lastPage = this.component.data.meta.pages

      this.render()
    }) 
  }

  async handleRefreshTable (event) {
    if(event.detail.endpoint === this.getAttribute('endpoint')){
      this.loadData(event.detail.data).then(() => this.render())
    }
  }

  async handleNewFilter (event) {
    if(event.detail.endpoint === this.getAttribute('endpoint')){
      this.data = event.detail.rows
      this.total = event.detail.total
      this.currentPage = event.detail.currentPage
      this.lastPage = event.detail.lastPage
      this.queryString = event.detail.queryString

      this.render()
    }
  }

  async handleShowDependants (event) {
    if(this.getAttribute('dependant')){
      this.classList.remove('dependant')
      this.loadData(event.detail.data).then(() => this.render())
    }
  }

  handleHideDependants = event => {
    if(this.getAttribute('dependant')){
      this.classList.add('dependant')
    }
  }

  async loadData (data = null) {

    if (data) {
      this.data = data
      return
    }

    const url = window.env.API_URL + this.getAttribute('endpoint')

    try {
      const response = await window.axios.get(url, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
        }
      })

      if(response.status == 200) {
        this.data = response.data.rows
        this.total = response.data.meta.total
        this.currentPage = response.data.meta.currentPage
        this.lastPage = response.data.meta.pages
      }

      else if(response.status == 500) {
        throw response
      }
    } catch (error) {
      console.log(error)
    }
  }

  async render () {

    this.shadow.innerHTML =
        `
        <style>

          :host(.dependant){
            display: none;
          }

          .table-options {
            align-items: center;
            background-color: hsl(100, 100%, 100%);
            display: flex;
            height: 2.5rem;
            justify-content: space-between;
            margin-bottom: 1rem;
            padding: 0 0.5rem;
          }

          .table-options .table-name h3 {
            color: hsl(207, 85%, 69%);
            font-family: 'Roboto', sans-serif;
            font-size: 1rem;
          }

          .table-options .table-options-button {
            cursor: pointer;
          }

          .table-options .table-options-button{
            cursor: pointer;
          }

          .table-options .table-options-button svg {
            fill: hsl(207, 85%, 69%);
            height: 2rem;
            width: 2rem;
          }

          .table-options .table-options-button svg:hover {
            fill: hsl(19, 100%, 50%);
          }

          .table {
            width: 100%;
          }

          .table .table-row{
            background-color: hsl(226deg 64% 66%);
            box-shadow: 0 0 0.5em hsl(0deg 0% 0% / 0.5);
            margin-bottom: 1em;
          }

          .table-row ul{
            margin: 0;
            padding: 0.5rem; 
          }

          .table-row ul li {
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto', sans-serif;
            list-style: none;
          }

          .table-row .table-data-header{
            color: hsl(0, 0%, 100%);
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            margin-right: 0.5rem;
          }

          .table-row .table-data-header::after{
            content: ":";
            margin-left: 0.3rem;
          }

          .table-row .table-buttons{
            background-color: hsl(207, 85%, 69%);
            display: flex;
            justify-content: right;
            gap: 0.5rem;
          }

          .table-row .table-buttons svg {
            cursor: pointer;
            height: 2rem;
            width: 2rem;
          }

          .table-row .table-buttons svg path {
            fill: hsl(0, 0%, 100%);
          }

          .table-row .table-buttons svg:hover path {
            fill: hsl(19, 100%, 50%);
          }

          .sortable-group {
            display: flex;
            flex-direction: column;
            list-style: none;
            padding: 1rem 0;
          }

          .sortable-row {
            background-color: hsl(226deg 64% 66%);
            border: 1px solid #ddd;
            color: hsl(100, 100%, 100%);
            cursor: move;
            font-family: 'Roboto', sans-serif;
            font-weight: 700;
            margin: 0.5rem 0;
            padding: 1em;
          }

          .sortable-row.sortable-ghost {
            background-color: hsl(19, 100%, 50%);
          }

          .table-pagination {
              margin-top: 1em;
          }
          
          .table-pagination .table-pagination-info{
              color: hsl(0, 0%, 100%);
              display: flex;
              font-family: 'Roboto', sans-serif;
              justify-content: space-between;
          }

          .table-pagination .table-pagination-buttons p{
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto', sans-serif;
              margin: 1rem 0;
          }

          .table-pagination-info p{
              margin: 0;
          }
      
          .table-pagination .table-pagination-button{
              cursor: pointer;
              margin-right: 1em;
          }
      
          .table-pagination .table-pagination-button:hover{
              color: hsl(19, 100%, 50%);
          }
      
          .table-pagination .table-pagination-button.inactive{
              color: hsl(0, 0%, 69%);
          }
      </style>`

    const tableOptionsDiv = document.createElement('div')
    const tableButtonsDiv = document.createElement('div')
    tableOptionsDiv.classList.add('table-options')
    tableButtonsDiv.classList.add('table-options-buttons')
    tableOptionsDiv.appendChild(tableButtonsDiv)
    this.shadow.appendChild(tableOptionsDiv)

    if(this.getAttribute('label')) {
      const tableNameDiv = document.createElement('div')
      const tableName = document.createElement('h3')
      tableNameDiv.classList.add('table-name')
      tableNameDiv.appendChild(tableName)
      tableName.textContent = this.getAttribute('label')
      tableOptionsDiv.prepend(tableNameDiv)
    }

    if (this.getAttribute('filter')) {
      const filterButtonDiv = document.createElement('div')
      filterButtonDiv.classList.add('table-options-button')
      filterButtonDiv.classList.add('filter-button')
      filterButtonDiv.dataset.filter = false

      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 24 24')
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', 'M11 11L16.76 3.62A1 1 0 0 0 16.59 2.22A1 1 0 0 0 16 2H2A1 1 0 0 0 1.38 2.22A1 1 0 0 0 1.21 3.62L7 11V16.87A1 1 0 0 0 7.29 17.7L9.29 19.7A1 1 0 0 0 10.7 19.7A1 1 0 0 0 11 18.87V11M13 16L18 21L23 16Z')

      svg.appendChild(path)
      filterButtonDiv.appendChild(svg)
      tableButtonsDiv.appendChild(filterButtonDiv)
    }

    if (this.getAttribute('sortableLevels')) {
      const sortableButtonDiv = document.createElement('div')
      sortableButtonDiv.classList.add('table-options-button')
      sortableButtonDiv.classList.add('sortable-button')
      sortableButtonDiv.dataset.sortable = false
    
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('viewBox', '0 0 24 24')
    
      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path')
      path.setAttribute('d', 'M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z')
    
      svg.appendChild(path)
      sortableButtonDiv.appendChild(svg)
      tableButtonsDiv.appendChild(sortableButtonDiv)
    }

    const tableDiv = document.createElement('div');
    tableDiv.classList.add('table')
    this.shadow.appendChild(tableDiv)
    
    if(this.getAttribute('pagination')){
      this.shadow.innerHTML +=
        `<div class="table-pagination">
          <div class="table-pagination-info">
              <div class="table-pagination-total"><p><span id="total-page">${this.total}</span> registros</p></div>
              <div class="table-pagination-pages"><p>Página <span id="current-page">${this.currentPage}</span> de <span id="last-page">${this.lastPage}</span></p></div>
          </div>
          <div class="table-pagination-buttons">
              <p>
                  <span class="table-pagination-button" id="firstPageUrl">Primera</span>
                  <span class="table-pagination-button" id="previousPageUrl">Anterior</span>
                  <span class="table-pagination-button" id="nextPageUrl">Siguiente</span>
                  <span class="table-pagination-button" id="lastPageUrl">Última</span>
              </p>
          </div>
        </div>`
    }
      
    await this.getTableData()
    await this.renderTableButtons()

    if(this.getAttribute('pagination')){
      await this.renderPaginationButtons()
    }

    if(this.getAttribute('filter')) {
      await this.renderFilterButton()
    }
  }

  async renderSortableTable(parentElement, elements, nestedElement = false) {

    const table = this.shadow.querySelector('.table');
    const group = nestedElement ? parentElement : document.createElement('div');
    group.classList.add('sortable-group');

    if (!nestedElement) {
      parentElement.appendChild(group);
    }
  
    for(const item in elements) {

      const element = elements[item]

      if (element.parent && !nestedElement){
        continue
      } 

      const row = document.createElement('div')
      row.classList.add('sortable-row')
      row.textContent = element.locales ? element.locales[0].value : element.name
      row.dataset.id = element.id

      const nestedGroup = document.createElement('div');
      nestedGroup.classList.add('sortable-group');
      row.appendChild(nestedGroup);

      if (element.children) {
        await this.renderSortableTable(nestedGroup, element.children, true);
      }

      group.appendChild(row)
    }

    if(!nestedElement) {
      table.querySelectorAll('.sortable-group').forEach(group => {
        new window.Sortable(group, {
          group: 'nested',
          sort: true,
          animation: 150,
          fallbackOnBody: true,
          swapThreshold: 1,
          onEnd: async (event) => {
            const data = []
            const sortableElements = event.to.querySelectorAll('.sortable-row')
            sortableElements.forEach((element, index) => {
              data.push({
                id: element.dataset.id,
                parent: element.parentElement.parentElement.dataset.id ? element.parentElement.parentElement.dataset.id : null,
                order: index
              })
            })

            try{
              const url = `${window.env.API_URL}${this.getAttribute('endpoint')}/update-order`;
              const response = await window.axios.post(url, {
                headers: {
                  Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
                },
                data: JSON.stringify(data)
              })
  
              if (response.status === 200) {
                document.dispatchEvent(new CustomEvent('message', {
                  detail: {
                    message: response.data.message || 'Datos guardados correctamente',
                    type: 'success'
                  }
                }))
              } 
            }catch(error){
              document.dispatchEvent(new CustomEvent('message', {
                detail: {
                  message: error.message || 'Fallo al guardar los datos',
                  type: 'error'
                }
              }))
            }
          }
        })
      })
    }
  }

  async getTableData () {

    const table = this.shadow.querySelector('.table')

    this.data.forEach(element => {
      const tableRow = document.createElement('div')
      tableRow.classList.add('table-row')

      const tableButtons = document.createElement('div')
      tableButtons.classList.add('table-buttons')
      tableRow.appendChild(tableButtons)

      const tableRowData = document.createElement('ul')
      tableRowData.classList.add('table-row-data')
      tableRow.appendChild(tableRowData)

      Object.keys(this.component.structure.headers).forEach(key => {
        const tableElementData = document.createElement('li')
        const tableDataHeader = document.createElement('span')

        tableDataHeader.classList.add('table-data-header')
        tableDataHeader.innerHTML = this.component.structure.headers[key].label
        tableElementData.appendChild(tableDataHeader)

        if (element[key]) {
          tableElementData.innerHTML += element[key]
        } else if (element.locales) {
          element.locales.forEach(locale => {
            if (locale.key == key){
              tableElementData.innerHTML += locale.value
            }
          })
        }

        tableRowData.appendChild(tableElementData)
      })

      if(this.component.structure.buttons) {
        Object.keys(this.component.structure.buttons).forEach((key) => {
          const tableButton = document.createElement('div')
          tableButton.classList.add('table-button')

          if (key == 'edit') {
            tableButton.classList.add('edit-button')
            tableButton.dataset.id = element.id
            tableButton.innerHTML = `
                          <svg viewBox="0 0 24 24">
                              <path fill="currentColor" d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z" />
                          </svg>`
          }

          if (key == 'remove') {
            tableButton.classList.add('remove-button')
            tableButton.dataset.id = element.id
            tableButton.innerHTML = `
                          <svg viewBox="0 0 24 24">
                              <path d="M19,4H15.5L14.5,3H9.5L8.5,4H5V6H19M6,19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V7H6V19Z" />
                          </svg>`
          }

          tableButtons.appendChild(tableButton)
        })
      }

      table.append(tableRow)
    })
  }

  async renderTableButtons () {

    const editButtons = this.shadow.querySelectorAll('.edit-button')
    const removeButtons = this.shadow.querySelectorAll('.remove-button')
    const sortableButton = this.shadow.querySelector('.sortable-button')

    editButtons.forEach(editButton => {

      editButton.addEventListener('click', async () => {

        const url = `${window.env.API_URL}${this.getAttribute('endpoint')}/${editButton.dataset.id}`

        try{
          const response = await window.axios.get(url, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
            }
          })

          if(response.status == 500 || response.status == 404) {
            throw response
          }

          if(response.status == 200) {
            document.dispatchEvent(new CustomEvent('showElement', {
              detail: {
                endpoint: this.getAttribute('endpoint'),
                element: response.data
              }
            }))
          }
        }
        catch(error){
          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: error.message || 'Fallo al cargar el elemento',
              type: 'error'
            }
          })) 
        }
      })
    })

    removeButtons.forEach(removeButton => {

      removeButton.addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('showOverlayer'))
        document.dispatchEvent(new CustomEvent('showDeleteModal', {
          detail: {
            endPoint: this.getAttribute('endpoint') ,
            element: removeButton.dataset.id,
            subtable: this.getAttribute('subtable') ? this.getAttribute('subtable') : null
          }
        }))
      })
    })

    sortableButton?.addEventListener('click', async () => {
      if (sortableButton.dataset.sortable == 'false') {

        sortableButton.dataset.sortable = true

        const table = this.shadow.querySelector('.table')
        table.innerHTML = ''
    
        await this.renderSortableTable(table, this.data)
      }else {
        sortableButton.dataset.sortable = false
        this.render()
      }
    })
  }

  async renderFilterButton () {

    const filterButton = this.shadow.querySelector('.filter-button')

    filterButton.addEventListener('click', () => {

    })
  }

  async renderPaginationButtons () {

    const tablePaginationButtons = this.shadow.querySelectorAll('.table-pagination-button')

    tablePaginationButtons.forEach(tablePaginationButton => {

      tablePaginationButton.addEventListener('click', async () => {

        let page

        switch (tablePaginationButton.id) {
          case 'firstPageUrl':
            page = 1
            break

          case 'previousPageUrl':
            if (this.currentPage == 1) return
            page = parseInt(this.currentPage) - 1
            break

          case 'nextPageUrl':
            if (this.currentPage == this.lastPage) return
            page = parseInt(this.currentPage) + 1
            break

          case 'lastPageUrl':
            page = this.lastPage
            break
        }

        const url = this.queryString ? `${window.env.API_URL}${this.getAttribute('endpoint')}?page=${page}&${this.queryString}`:`${window.env.API_URL}${this.getAttribute('endpoint')}?page=${page}`

        try {
          const response = await window.axios.get(url, {
            headers: {
              Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
            }
          })

          if (response.status == 500) {
            throw response
          }

          if(response.status == 200) {
            this.data = response.data.rows
            this.total = response.data.meta.total
            this.currentPage = response.data.meta.currentPage
            this.lastPage = response.data.meta.pages
  
            this.render()
          }

        } catch (error) {
          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: error.message || 'Fallo al cargar los datos',
              type: 'error'
            }
          }))
        }
      })
    })
  }
}

customElements.define('admin-table-component', AdminTable)
