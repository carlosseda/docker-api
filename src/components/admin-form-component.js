class AdminForm extends HTMLElement {
  constructor () {
    super()
    this.shadow = this.attachShadow({ mode: 'open' })
    this.fingerprint = null
    this.images = []
  }

  connectedCallback () {
    document.addEventListener('showElement', this.handleShowElement.bind(this))
    document.addEventListener('refreshForm', this.handleRefreshForm.bind(this))
    document.addEventListener('attachImageToForm', this.handleAttachImageToForm.bind(this))
    document.addEventListener('fingerprint', this.handleFingerprint.bind(this))
    document.addEventListener('showDependants', this.handleShowDependants.bind(this))
    document.addEventListener('hideDependants', this.handleHideDependants.bind(this))

    document.addEventListener('DOMContentLoaded', () => {
      this.component = window.env.STRUCTURE.loadComponents['admin-form-component'][this.getAttribute('endpoint')][this.getAttribute('method')]
      this.render()
    }) 
  }

  handleShowElement = event => {
    if(event.detail.endpoint === this.getAttribute('endpoint')){
      this.showElement(event.detail.element)
    }
  }

  handleRefreshForm = event => {
    if(event.detail.endpoint === this.getAttribute('endpoint')){
      this.render()
    }
  }

  handleAttachImageToForm = event => {
    this.attachImageToForm(event.detail.image)
  } 

  handleFingerprint = event => {
    this.fingerprint = event.detail.fingerprint
  }

  handleShowDependants = event => {
    if(this.getAttribute('')){
      this.parentFormId = event.detail.parentFormId
      this.classList.remove('dependant')
    }
  }

  handleHideDependants = event => {
    if(this.getAttribute('dependant')){
      this.parentFormId = null
      this.classList.add('dependant')
    }
  }

  render = async () => {

    this.shadow.innerHTML =
        `
        <style>

            :host(.dependant) {
              display: none;
            }

            .tabs-container-menu{
              background-color: hsl(100, 100%, 100%);
              display: flex;
              height: 2.5rem;
              justify-content: space-between;
              width: 100%;
            }
            
            .tabs-container-menu ul{
              height: 2.5rem;
              display: flex;
              margin: 0;
              padding: 0;
            }
            
            .tabs-container-menu li{
              color: hsl(0, 0%, 50%);
              cursor: pointer;
              font-family: 'Roboto' , sans-serif;
              list-style: none;
              font-weight: 600;
              padding: 0.5rem;
              text-align: center;
            }
            
            .tabs-container-menu li.active,
            .tabs-container-menu li.active:hover{
              background-color:hsl(207, 85%, 69%);
              color: white;
            }

            .tabs-container-buttons{
              display: flex;
              padding: 0 0.5rem;
            }

            .tabs-container-buttons svg{
              cursor: pointer;
              height: 2.5rem;
              width: 2.5rem;
              fill: hsl(207, 85%, 69%);
            }

            .tabs-container-buttons svg:hover{
              fill: hsl(19, 100%, 50%);
            }

            .errors-container{
              background-color: hsl(0, 0%, 100%);
              display: none;
              flex-direction: column;
              gap: 1rem;
              margin-top: 1rem;
              padding: 1rem;
            }

            .errors-container.active{
              display: flex;
            }

            .errors-container .error-container{
              width: 100%;
            }

            .errors-container .error-container span{
              color: hsl(0, 0%, 50%);
              font-family: 'Roboto' , sans-serif;
              font-size: 1rem;
              font-weight: 600;
            }
            
            .tab-panel{
              display: none;
            }
            
            .tab-panel.active{
              display: block;
              padding-top: 1rem;
            }
            
            .row {
              display: flex;
              justify-content: space-between;
              gap: 2rem;
            }

            .locale-row{
              margin-top: 1rem;
            }

            .form-element{
              margin-bottom: 1rem;
              width: 100%;
            }

            .form-element.related {
              display: none;
            }

            .form-element.related.active {
              display: block;
            }
            
            .form-element-label{
              align-items: flex-end;
              display: flex;
              justify-content: space-between;
              margin-bottom: 1rem;
              width: 100%;
            }
            
            .form-element-label label,
            .form-element-label span{
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto' , sans-serif;
              font-weight: 600;
              font-size: 1rem;
              transition: color 0.5s;
            }

            .form-element-label label.invalid::after{
              content: '*';
              color: hsl(0, 100%, 50%);
              font-size: 1.5rem;
              margin-left: 0.2rem;
            }

            .form-element .input-option-buttons{
              background-color: hsl(0, 0%, 100%);
              display: flex;
              gap: 0.5rem;
              justify-content: flex-end;
              padding: 0.2rem 2%;
              width: 96%;
            }

            .form-element .input-option-button{
              cursor: pointer;
            }

            .form-element .input-option-button svg{
              fill: hsl(207, 85%, 69%);
              width: 2.5rem;
            }

            .form-element .input-option-button svg:hover{
              fill: hsl(19, 100%, 50%);
            }

            .form-element-label,
            .form-element-input{
              width: 100%;
            }

            input[type="submit"]{
              background: none;
              color: inherit;
              border: none;
              padding: 0;
              font: inherit;
              cursor: pointer;
              outline: inherit;
            }
            
            .form-element-input input, 
            .form-element-input textarea,
            .form-element-input select {
              background-color:hsl(226deg 64% 66%);
              border: none;
              border-bottom: 0.1rem solid hsl(0, 0%, 100%);
              border-radius: 0;
              box-sizing: border-box;
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto' , sans-serif;
              font-weight: 600;
              padding: 0.5rem;
              width: 100%;
            }

            .form-element-input input:focus,
            .form-element-input textarea:focus,
            .form-element-input select:focus{
              outline: none;
              border-bottom: 0.1rem solid hsl(207, 85%, 69%);
            }

            .form-element-input input.invalid,
            .form-element-input textarea.invalid{
              border-bottom: 0.2rem solid hsl(0, 100%, 50%);
            }

            .form-element-input textarea{
              height: 10rem;
            }

            .form-element-input .checkbox-container,
            .form-element-input .radio-container{
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .form-element-input .checkbox-container input,
            .form-element-input .radio-container input{
              width: 1rem;
              height: 1rem;
            }

            .form-element-input .checkbox-container label,
            .form-element-input .radio-container label{
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto' , sans-serif;
              font-weight: 600;
              font-size: 1rem;
            }

            .form-element-input .range-container{
              display: flex;
              align-items: center;
              gap: 0.5rem;
            }

            .form-element-input .range-container input{
              width: 100%;
            }

            .form-element-input .range-container label{
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto' , sans-serif;
              font-weight: 600;
              font-size: 1rem;
            }

            .form-element-input .range-container .range-value{
              color: hsl(0, 0%, 100%);
              font-family: 'Roboto' , sans-serif;
              font-weight: 600;
              font-size: 1rem;
            }

            .form-element-input .range-container input[type="range"]{
              -webkit-appearance: none;
              width: 100%;
              height: 0.5rem;
              border-radius: 0.5rem;
              background: hsl(0, 0%, 100%);
              outline: none;
              opacity: 0.7;
              -webkit-transition: .2s;
              transition: opacity .2s;
            }

            .form-element-input input[type="time"]::-webkit-calendar-picker-indicator,
            .form-element-input input[type="date"]::-webkit-calendar-picker-indicator{
              filter: invert(1);
            }
        </style>
        
        <form autocomplete="off">
                                
            <input autocomplete="false" name="hidden" type="text" style="display:none;">

            <div class="tabs-container-menu">
                <div class="tabs-container-buttons">
                    <div id="create-button"> 
                        <svg viewBox="0 0 24 24">
                            <path d="M19.36,2.72L20.78,4.14L15.06,9.85C16.13,11.39 16.28,13.24 15.38,14.44L9.06,8.12C10.26,7.22 12.11,7.37 13.65,8.44L19.36,2.72M5.93,17.57C3.92,15.56 2.69,13.16 2.35,10.92L7.23,8.83L14.67,16.27L12.58,21.15C10.34,20.81 7.94,19.58 5.93,17.57Z" />
                        </svg>
                    </div>
                    <div id="store-button"> 
                        <label>
                            <input type="submit" value="">
                            <svg viewBox="0 0 24 24">
                                <path d="M0 0h24v24H0z" fill="none"/>
                                <path class="crud__create-button-icon" d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
                            </svg>
                        </label> 
                    </div>
                </div>
            </div>

            <div class="errors-container">

            </div>
        </form>
        `

    if(this.component.structure.tabs){

      this.createTabs(this.component.structure.tabs)

      for (const tab in this.component.structure.tabsContent) {
        this.createRowContent(this.component.structure.tabsContent[tab].rows, this.shadow.querySelector(`.tab-panel[data-tab="${tab}"]`))
      }
    }

    this.renderSubmitForm()
    this.renderClearForm()
    this.trackingFormInteraction()

    return new Promise(resolve => {
      resolve();
    });
  }

  createTabs = tabs => {
    const tabsContainerItems = document.createElement('div')
    const tabsContainerItemsList = document.createElement('ul')
    tabsContainerItems.classList.add('tabs-container-items')
    tabsContainerItems.append(tabsContainerItemsList)
    this.shadow.querySelector('.tabs-container-menu').prepend(tabsContainerItems)

    const tabsContainerContent = document.createElement('div')
    tabsContainerContent.classList.add('tabs-container-content')
    this.shadow.querySelector('form').append(tabsContainerContent)

    for (const tab in tabs) {
      const tabElement = document.createElement('li')
      tabElement.classList.add('tab-item')
      tabElement.dataset.tab = tab
      tabElement.innerHTML = tabs[tab].label
      this.shadow.querySelector('.tabs-container-items ul').append(tabElement)

      const tabPanel = document.createElement('div')
      tabPanel.dataset.tab = tab
      tabPanel.classList.add('tab-panel')
      this.shadow.querySelector('.tabs-container-content').append(tabPanel)

      tabElement.addEventListener('click', () => {
        tabsContainerItemsList.querySelector('.active').classList.remove('active')
        tabsContainerContent.querySelector('.active').classList.remove('active')
        tabElement.classList.add('active')
        tabsContainerContent.querySelector(`[data-tab="${tabElement.dataset.tab}"]`).classList.add('active')
      })
    }

    this.shadow.querySelector('.tab-item').classList.add('active')
    this.shadow.querySelector('.tab-panel').classList.add('active')
  }

  createRowContent = (rows, container, locale = null) => {

    for (const row in rows) {

      if(row === 'locale') {
        const localeRowDiv = document.createElement('div')
        localeRowDiv.classList.add('locale-row')
        container.append(localeRowDiv)
        this.createLocaleTabs(localeRowDiv, rows[row].rows)
        continue
      }

      const rowDiv = document.createElement('div')
      rowDiv.classList.add('row')
      container.append(rowDiv)

      for (const name in rows[row].formElements) {

        const formElement = rows[row].formElements[name]

        if(formElement.type === 'hidden'){
          const input = document.createElement('input')
          input.type = formElement.type
          input.name = name
          input.value = formElement.value || ''
  
          this.shadow.querySelector('form').prepend(input)
          
          continue
        }

        const formElementContainer = document.createElement('div')
        formElementContainer.classList.add('form-element')
        formElement.related ? formElementContainer.classList.add('related') : null
        formElement.relatedActive ? formElementContainer.classList.add('active') : null
        rowDiv.append(formElementContainer)

      
        if(formElement.label) {
          formElementContainer.append(this.createLabel(formElement, name, locale))
        }

        if (formElement.element === 'input') {
          formElementContainer.append(this.createInput(formElement, name, locale))
        }

        if (formElement.element === 'textarea') {      
          formElementContainer.append(this.createTextarea(formElement, name, locale))
        }

        if (formElement.element === 'select') {
          formElementContainer.append(this.createSelect(formElement, name, locale))
        }

        if (formElement.element === 'subform') {
          this.createSubForm(formElement)
        }

        if (formElement.element === 'subtable') {
          this.createSubTable(formElement)
        }
      }
    }
  }

  createLocaleTabs = (container, rows) => {
    
    const response = window.axios.get(`${window.env.API_URL}languages/select-options`, {
      headers: {
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
      }
    }).then(response => {

      const languages = response.data

      const tabsContainerMenu = document.createElement('div')
      tabsContainerMenu.classList.add('tabs-container-menu')
      container.append(tabsContainerMenu)
  
      const tabsContainerItems = document.createElement('div')
      tabsContainerItems.classList.add('tabs-container-items')
      tabsContainerMenu.append(tabsContainerItems)
  
      const tabsCointainerItemsList = document.createElement('ul')
      tabsContainerItems.append(tabsCointainerItemsList)
  
      const tabsContainerContent = document.createElement('div')
      tabsContainerContent.classList.add('tabs-container-content')
      container.append(tabsContainerContent)
  
      for (const language of languages) {
  
        const tabElement = document.createElement('li')
        tabElement.classList.add('tab-item')
        tabElement.dataset.tab = language.alias
        tabElement.innerHTML = language.name
        tabsCointainerItemsList.append(tabElement)
  
        const tabPanel = document.createElement('div')
        tabPanel.dataset.tab = language.alias
        tabPanel.classList.add('tab-panel')
        tabsContainerContent.append(tabPanel)
  
        tabElement.addEventListener('click', () => {
          container.querySelector('.tabs-container-items ul').querySelector('.active').classList.remove('active')
          container.querySelector('.tabs-container-content').querySelector('.active').classList.remove('active')
          tabElement.classList.add('active')
          container.querySelector('.tabs-container-content').querySelector(`[data-tab="${tabElement.dataset.tab}"]`).classList.add('active')
        })

        this.createRowContent(rows, this.shadow.querySelector(`.tab-panel[data-tab="${language.alias}"]`), language.alias)
      }
  
      container.querySelector('.tab-item').classList.add('active')
      container.querySelector('.tab-panel').classList.add('active')
    })
  }

  createLabel = (formElement, name, locale) => {
    const formElementLabel = document.createElement('div')
    formElementLabel.classList.add('form-element-label')

    const label = document.createElement('label')
    label.innerText = formElement.label
    locale? label.setAttribute('for', `${name}-${locale}`) : label.setAttribute('for', name)
    formElementLabel.append(label)

    return formElementLabel
  }

  createInput = (formElement, name, locale) => {

    const formInputDiv = document.createElement('div')
    formInputDiv.classList.add('form-element-input')

    switch (formElement.type) {

      case 'checkbox':
      case 'radio': {
        const inputContainer = document.createElement('div')
        inputContainer.classList.add(`${formElement.type}-container`)

        formElement.options.forEach(option => {
          const input = document.createElement('input')
          const inputLabel = document.createElement('label')
          inputLabel.innerText = option.label
          input.id = locale ? `${name}-${locale}` : name
          input.type = formElement.type
          input.name = locale ? `locales.${locale}.${name}`: name
          input.value = option.value || ''
          input.checked = option.checked || false
          input.disabled = option.disabled || false

          inputContainer.append(inputLabel)
          inputContainer.append(input)
        })

        formInputDiv.append(inputContainer)

        break
      }

      case 'range': {
        const rangeContainer = document.createElement('div')
        rangeContainer.classList.add('range-container')

        const input = document.createElement('input')
        input.id = locale ? `${name}-${locale}` : name
        input.type = formElement.type
        input.name = locale ? `locales.${locale}.${name}`: name
        input.min = formElement.min || ''
        input.max = formElement.max || ''
        input.step = formElement.step || ''
        input.value = formElement.value || ''
        rangeContainer.append(input)

        const rangeValue = document.createElement('span')
        rangeValue.classList.add('range-value')
        rangeValue.textContent = formElement.value 
        rangeContainer.append(rangeValue)

        input.addEventListener('input', () => {
          rangeValue.innerText = input.value
        })

        formInputDiv.append(rangeContainer)

        break
      }

      case 'number':
      case 'date':
      case 'time':
      case 'datetime-local':
      case 'month':
      case 'week': {
        const input = document.createElement('input')
        input.id = locale ? `${name}-${locale}` : name
        input.type = formElement.type
        input.name = locale ? `locales.${locale}.${name}`: name
        input.min = formElement.min || ''
        input.max = formElement.max || ''
        input.step = formElement.step || ''
        input.placeholder = formElement.placeholder || ''
        input.value = formElement.value || ''
        input.readOnly = formElement.readOnly || false
        input.dataset.validate = formElement.validate || ''

        formInputDiv.append(input)

        break
      }

      case 'image': {
        if (!this.shadow.querySelector('image-gallery-component')) {
          const imageGallery = document.createElement('image-gallery-component')
          this.shadow.append(imageGallery)
        }

        const input = document.createElement('upload-image-button-component')
        input.id = locale ? `${name}-${locale}` : name
        locale? input.setAttribute('name', `locales.${locale}.${name}`) : input.setAttribute('name', name)
        input.setAttribute('languageAlias', locale)
        input.setAttribute('quantity', formElement.quantity)

        // input.accept = formElement.accept || '';
        // input.multiple = formElement.multiple || false;
        // input.required = formElement.required || false;
        // input.dataset.validate = formElement.validate || '';

        formInputDiv.append(input)

        break
      }

      default: {
        const input = document.createElement('input')
        input.id = locale ? `${name}-${locale}` : name
        input.type = formElement.type
        input.name = locale ? `locales.${locale}.${name}`: name
        input.value = formElement.value || ''
        input.placeholder = formElement.placeholder || ''
        input.dataset.validate = formElement.validate || ''

        if (formElement.maxLength) {
          input.maxLength = formElement.maxLength || ''
          const counter = document.createElement('span')
          this.shadow.querySelector(`label[for="${name}"]`).parentElement.append(counter)

          input.addEventListener('input', () => {
            if (input.value.length > 0) {
              counter.textContent = input.value.length + ' / ' + input.maxLength
            } else {
              counter.textContent = ''
            }
          })
        }

        formInputDiv.append(input)

        break
      }
    }

    return formInputDiv
  }

  createTextarea = (formElement, name, locale) => {

    const formInputDiv = document.createElement('div')
    formInputDiv.classList.add('form-element-input')

    const textarea = document.createElement('textarea')
    formInputDiv.append(textarea)

    textarea.id = locale ? `${name}-${locale}` : name
    textarea.name = locale ? `locales.${locale}.${name}` : name
    textarea.disabled = formElement.disabled || false
    textarea.readOnly = formElement.readOnly || false
    textarea.value = formElement.value || ''
    textarea.cols = formElement.cols || ''
    textarea.rows = formElement.rows || ''
    textarea.wrap = formElement.wrap || ''
    textarea.placeholder = formElement.placeholder || ''
    textarea.dataset.validate = formElement.validate || ''

    if (formElement.maxLength) {

      textarea.maxLength = formElement.maxLength || ''
      const counter = document.createElement('span')
      this.shadow.querySelector(`label[for="${name}"]`).parentElement.append(counter)

      textarea.addEventListener('input', () => {
        if (textarea.value.length > 0) {
          counter.textContent = textarea.value.length + ' / ' + textarea.maxLength
        } else {
          counter.textContent = ''
        }
      })
    }

    if(formElement.interfaceEditor) {

      if (!this.shadow.querySelector('interface-editor-component')) {
        const interfaceEditor = document.createElement('interface-editor-component')
        this.shadow.append(interfaceEditor)
      }

      const interfazEditorButtons = document.createElement('div')
      interfazEditorButtons.classList.add('input-option-buttons')
      formInputDiv.append(interfazEditorButtons)
      
      const interfazEditorButton = document.createElement('div')
      interfazEditorButton.classList.add('input-option-button')
      interfazEditorButton.classList.add('interface-editor-button')
      interfazEditorButton.innerHTML = '<svg viewBox="0 0 24 24"><path d="M21 2H3C1.9 2 1 2.9 1 4V16C1 17.11 1.9 18 3 18H10V20H8V22H16V20H14V18H21C22.11 18 23 17.11 23 16V4C23 2.9 22.11 2 21 2M21 16H3V4H21V16M15.84 8.2L14.83 9.21L12.76 7.18L13.77 6.16C13.97 5.95 14.31 5.94 14.55 6.16L15.84 7.41C16.05 7.62 16.06 7.96 15.84 8.2M8 11.91L12.17 7.72L14.24 9.8L10.08 14H8V11.91Z" /></svg>'
      interfazEditorButtons.append(interfazEditorButton)

      interfazEditorButton.addEventListener('click', () => {

        const element = this.shadow.querySelector('[name="element"]').value ?? 'page'

        document.dispatchEvent(new CustomEvent('showInterfaceEditor', {
          detail: {
            name: name,
            component: element,
            json: textarea.value ?? ''
          }
        })) 
      })
    }

    return formInputDiv
  }

  createSelect = (formElement, name, locale) => {
    const formInputDiv = document.createElement('div')
    formInputDiv.classList.add('form-element-input')

    const select = document.createElement('select')
    formInputDiv.append(select)

    select.id = locale ? `${name}-${locale}` : name
    select.name = locale ? `locales.${locale}.${name}` : name
    select.disabled = formElement.disabled || false
    select.required = formElement.required || false
    select.multiple = formElement.multiple || false

    if(formElement.options) {
      formElement.options.forEach(option => {
        const optionElement = document.createElement('option')
        optionElement.value = option.value
        optionElement.innerText = option.label
        select.append(optionElement)

        if(option.selected) {
          optionElement.selected = true
        }
      })
    }

    if(formElement.endpoint) {

      const url = new URL(`${window.env.API_URL}${formElement.endpoint}/select-options`)
      url.searchParams.append('select', true)

      window.axios.get(url, {
        headers: {
          Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`
        }
      }).then(response => {
        response.data.forEach(option => {
          const optionElement = document.createElement('option')
          optionElement.value = option[formElement.value]
          optionElement.innerText = option.name
          select.append(optionElement)
        })
      }).catch(error => {
        console.log(error)
      })
    }

    if(formElement.selectRelated) {
      select.addEventListener('change', () => {
        for(const option of select.options) {
          this.shadow.querySelector(`[name="${option.value}"]`).closest('.form-element').classList.remove('active')
        }
        this.shadow.querySelector(`[name="${select.value}"]`).closest('.form-element').classList.add('active')
      })
    }

    return formInputDiv
  }

  renderSubmitForm = () => {

    this.shadow.querySelector('#store-button').addEventListener('click', async event => {

      event.preventDefault()

      const form = this.shadow.querySelector('form')

      if (!this.validateForm(form.elements)) {
        return
      }

      const formData = new FormData(form)

      if (this.shadow.querySelectorAll('input[type="checkbox"]').length > 0) {
        this.shadow.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
          const checkboxValues = []

          this.shadow.querySelectorAll(`input[name="${checkbox.name}"]:checked`).forEach(checkedCheckbox => {
            checkboxValues.push(checkedCheckbox.value)
          })

          formData.append(checkbox.name, checkboxValues)
        })
      }

      if(this.parentFormId) {
        formData.append('parentFormId', this.parentFormId)
      }

      const formDataJson = {};

      for (const [key, value] of formData.entries()) {
        if (key.includes('locales')) {
          const [prefix, locales, field] = key.split('.');

          if (!(prefix in formDataJson)) {
            formDataJson[prefix] = {};
          }

          if (!(locales in formDataJson[prefix])) {
            formDataJson[prefix][locales] = {};
          }

          formDataJson[prefix][locales][field] = value ?? null;
        }else{
          formDataJson[key] = value ?? null;
        }
      }

      if (this.images) {
        formDataJson.images = this.images
      }

      const url = formDataJson.id ? `${window.env.API_URL}${this.getAttribute('endpoint')}/${formDataJson.id}` : `${window.env.API_URL}${this.getAttribute('endpoint')}`
      const method = formDataJson.id ? 'PUT' : 'POST'
      delete formDataJson.id

      try{      
        const axios = window.axios
        const response = await axios(url, {
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${window.sessionStorage.getItem('accessToken')}`
          },
          data: JSON.stringify(formDataJson)
        })

        if (response.status === 500) {
          throw response
        }
  
        if (response.status === 200) {  

          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: 'Datos guardados correctamente',
              type: 'success'
            }
          }))
  
          this.images = []
          this.render()
  
          document.dispatchEvent(new CustomEvent('refreshTable', {
            detail: {
              subtable: this.getAttribute('subtable') ? this.getAttribute('subtable') : null,
              endpoint: this.getAttribute('endpoint'),
              data: response.data.rows ? response.data.rows : null
            }
          }))
        } 
      }catch(error){
        
        error = error.response.data

        if (error.errors) {
          error.errors.forEach(error => {
            const errorContainer = document.createElement('div')
            const errorMessage = document.createElement('span')
            errorContainer.classList.add('error-container')
            errorMessage.textContent = error.message
            errorContainer.append(errorMessage)

            this.shadow.querySelector('.errors-container').append(errorContainer)
            this.shadow.querySelector('.errors-container').classList.add('active')
          })

          document.dispatchEvent(new CustomEvent('message', {
            composed: true,
            detail: {
              message: 'Fallo al guardar los datos',
              type: 'error'
            }
          }))
        }

        if (error.message) {
          document.dispatchEvent(new CustomEvent('message', {
            detail: {
              message: error.message || 'Fallo al guardar los datos',
              type: 'error'
            }
          }))
        }
      }
    })
  }

  renderClearForm = () => {
    this.shadow.querySelector('#create-button').addEventListener('click', () => {
      this.images = []
      this.render()

      document.dispatchEvent(new CustomEvent('hideDependants')) 
    })
  }

  validateForm = formInputs => {
    let validForm = true

    const validators = {
      required: {
        regex: /\S/g,
        message: 'El campo es obligatorio'
      },
      onlyLetters: {
        regex: /^[a-zA-Z\s]+$/g,
        message: 'El campo sólo puede contener letras'
      },
      onlyNumbers: {
        regex: /\d/g,
        message: 'El campo sólo puede contener números'
      },
      telephone: {
        regex: /^\d{9}$/g,
        message: 'El campo debe contener 9 números'
      },
      email: {
        regex: /\w+@\w+\.\w+/g,
        message: 'El campo debe contener un email válido'
      },
      password: {
        regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/g,
        message: 'El campo debe contener al menos 8 caracteres, una mayúscula, una minúscula y un número'
      },
      date: {
        regex: /^\d{4}-\d{2}-\d{2}$/g,
        message: 'El campo debe contener una fecha válida'
      },
      time: {
        regex: /^\d{2}:\d{2}$/g,
        message: 'El campo debe contener una hora válida'
      },
      datetime: {
        regex: /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}$/g,
        message: 'El campo debe contener una fecha y hora válida'
      },
      dni: {
        regex: /^\d{8}[a-zA-Z]$/g,
        message: 'El campo debe contener un DNI válido'
      },
      nif: {
        regex: /^[a-zA-Z]\d{7}[a-zA-Z]$/g,
        message: 'El campo debe contener un NIF válido'
      },
      cif: {
        regex: /^[a-zA-Z]\d{7}[a-zA-Z0-9]$/g,
        message: 'El campo debe contener un CIF válido'
      },
      postalCode: {
        regex: /^\d{5}$/g,
        message: 'El campo debe contener un código postal válido'
      },
      creditCard: {
        regex: /^\d{16}$/g,
        message: 'El campo debe contener una tarjeta de crédito válida'
      },
      iban: {
        regex: /^[a-zA-Z]{2}\d{22}$/g,
        message: 'El campo debe contener un IBAN válido'
      },
      url: {
        regex: /^(http|https):\/\/\w+\.\w+/g,
        message: 'El campo debe contener una URL válida'
      },
      ip: {
        regex: /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/g,
        message: 'El campo debe contener una IP válida'
      },
      mac: {
        regex: /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/g,
        message: 'El campo debe contener una MAC válida'
      },
      image: {
        regex: /\.(gif|jpg|jpeg|tiff|png)$/g,
        message: 'El campo debe contener una imagen válida'
      },
      video: {
        regex: /\.(avi|mp4|mov|wmv|flv|mkv)$/g,
        message: 'El campo debe contener un vídeo válido'
      },
      audio: {
        regex: /\.(mp3|wav|ogg|flac|aac)$/g,
        message: 'El campo debe contener un audio válido'
      },
      pdf: {
        regex: /\.(pdf)$/g,
        message: 'El campo debe contener un PDF válido'
      },
      doc: {
        regex: /\.(doc|docx)$/g,
        message: 'El campo debe contener un documento válido'
      },
      xls: {
        regex: /\.(xls|xlsx)$/g,
        message: 'El campo debe contener una hoja de cálculo válida'
      },
      ppt: {
        regex: /\.(ppt|pptx)$/g,
        message: 'El campo debe contener una presentación válida'
      },
      zip: {
        regex: /\.(zip|rar|7z|tar|gz)$/g,
        message: 'El campo debe contener un archivo comprimido válido'
      }
    }

    for (let i = 0; i < formInputs.length; i++) {
      if (formInputs[i].dataset.validate) {
        formInputs[i].dataset.validate.split(',').forEach((option) => {
          if (formInputs[i].value.match(validators[option].regex) == null) {
            if (!formInputs[i].classList.contains('invalid')) {
              formInputs[i].classList.add('invalid')
              formInputs[i].closest('.form-element').querySelector('label').classList.add('invalid')

              const errorContainer = document.createElement('div')
              const errorMessage = document.createElement('span')
              errorContainer.classList.add('error-container')
              errorMessage.textContent = `${formInputs[i].closest('.form-element').querySelector('label').textContent}: ${validators[option].message}`
              errorContainer.append(errorMessage)

              this.shadow.querySelector('.errors-container').append(errorContainer)
            }

            validForm = false
          } else {
            formInputs[i].classList.remove('invalid')
            formInputs[i].closest('.form-element').querySelector('label').classList.remove('invalid')
          }
        })
      }
    }

    if (!validForm) {
      this.shadow.querySelector('.errors-container').classList.add('active')

      document.dispatchEvent(new CustomEvent('message', {
        detail: {
          message: 'Los datos del formulario no son válidos',
          type: 'error'
        }
      }))
    }

    return validForm
  }

  showElement = async element => {

    // this.render()
    this.shadow.querySelector('form').reset()
    this.images = []

    Object.entries(element).forEach(([key, value]) => {
      
      if (Array.isArray(value)) {

        if(key == 'locales') {
          value.forEach(locale => {
            this.shadow.querySelector(`[name="locales\\.${locale.languageAlias}\\.${locale.key}"]`).value = locale.value != 'null' ? locale.value : ''
          })
        } else {
          document.dispatchEvent(new CustomEvent('showDependants', {
            detail: {
              subtable: key,
              data: value,
              parentFormId: element.id
            }
          }))
        }
      } 

      if (this.shadow.querySelector(`[name="${key}"]`)) {

        if (typeof value === 'object') {
          value = JSON.stringify(value, null, 2)
        }

        this.shadow.querySelector(`[name="${key}"]`).value = value != 'null' ? value : ''

        if (this.shadow.querySelector(`[name="${key}"]`).tagName == 'SELECT') {
          const options = this.shadow.querySelector(`[name="${key}"]`).querySelectorAll('option')

          options.forEach(option => {
            if (option.value == value) {
              option.setAttribute('selected', true)
            }
          })
        }

        if (this.shadow.querySelector(`[name="${key}"]`).type == 'radio') {
          const radios = this.shadow.querySelector(`[name="${key}"]`).closest('.form-element').querySelectorAll('input[type="radio"]')

          radios.forEach(radio => {
            if (radio.value == value) {
              radio.setAttribute('checked', true)
            }
          })
        }

        if (this.shadow.querySelector(`[name="${key}"]`).type == 'checkbox') {
          const checkbox = this.shadow.querySelectorAll(`[name="${key}"]`)

          checkbox.forEach(check => {
            if (check.value == value) {
              check.setAttribute('checked', true)
            }
          })
        }
      }

      if (key == 'images') {
        document.dispatchEvent(new CustomEvent('showThumbnails', {
          detail: {
            images: value
          }
        }))
      }
    })
  }

  attachImageToForm = attachedImage => {
    const index = this.images.findIndex(image =>
      image.filename === attachedImage.previousImage &&
      image.languageAlias === attachedImage.languageAlias &&
      image.name === attachedImage.name
    )

    if (index == -1) {
      this.images.push(attachedImage)
    } else {
      if (attachedImage.delete && attachedImage.create) {
        this.images.splice(index, 1)
      }

      if (attachedImage.update && attachedImage.create) {
        this.images.splice(index, 1)
        this.images[index] = attachedImage
        delete attachedImage.update
      } else {
        this.images.splice(index, 1)
        this.images[index] = attachedImage
      }
    }
  }

  trackingFormInteraction = () => {

    const handleFormInput = event => {

      const inputElement = event.target;
      const inputValue = inputElement.value;
      const inputName = inputElement.name;
  
      if (inputElement.tagName == 'TEXTAREA') {
        const data = {
          event: 'formInteraction',
          eventTime: Date.now(),
          path: window.location.pathname,
          element: 'textarea',
          name: inputName,
          value: inputValue,
          fingerprint: this.fingerprint
        }
  
        window.axios.post(`${window.env.API_URL}trackings`,
          { data: data }
        )
  
      }else{
        const data = {
          event: 'formInteraction',
          eventTime: Date.now(),
          element: 'input',
          path: window.location.pathname,
          name: inputName,
          value: inputName.includes("password") || inputName.includes("repeatPassword") ? inputValue : null,
          fingerprint: this.fingerprint
        }
  
        window.axios.post(`${window.env.API_URL}trackings`,
          { data: data }
        )
      }
    };
  
    const handleFormSelect = event => {
      const selectElement = event.target;
      const selectedOption = selectElement.options[selectElement.selectedIndex].value;
      const selectName = selectElement.name;

      const data = {
        event: 'formInteraction',
        eventTime: Date.now(),
        path: window.location.pathname,
        element: 'select',
        name: selectName,
        value: selectedOption,
        fingerprint: this.fingerprint
      }
  
      window.axios.post(`${window.env.API_URL}trackings`,
        { data: data }
      )
    };
  
    const handleFormCheckbox = event => {
      const checkboxElement = event.target;
      const checkboxValue = checkboxElement.checked;
      const checkboxName = checkboxElement.name;

      const data = {
        event: 'formInteraction',
        eventTime: Date.now(),
        path: window.location.pathname,
        element: 'checkbox',
        name: checkboxName,
        value: checkboxValue,
        fingerprint: this.fingerprint
      }

      window.axios.post(`${window.env.API_URL}trackings`,
        { data: data }
      )
    };
  
    const formInputs = this.shadow.querySelectorAll('input, textarea, select');
  
    formInputs.forEach(input => {
      if (input.tagName === 'SELECT') {
        input.addEventListener('change', handleFormSelect);
      } else if (input.type === 'checkbox') {
        input.addEventListener('change', handleFormCheckbox);
      } else {
        input.addEventListener('blur', handleFormInput);
      }
    });
  };
}

customElements.define('admin-form-component', AdminForm)

