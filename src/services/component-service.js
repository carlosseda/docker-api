module.exports = class ComponentService {
  
  constructor() {
    this.loadComponents = {};
  }

  componentStructure = async (component) => {    
    if(!this.loadComponents[`${component.name}`]) {
      this.loadComponents[`${component.name}`] = {};
    }

    if(!this.loadComponents[`${component.name}`][`${component.endpoint}`]) {
      this.loadComponents[`${component.name}`][`${component.endpoint}`] = {};
    }

    this.loadComponents[`${component.name}`][`${component.endpoint}`][`${component.method}`] = component;
  }

  componentData = async (component, data) => {
    if(!this.loadComponents[`${component.name}`]) {
      this.loadComponents[`${component.name}`] = {};
    }

    if(!this.loadComponents[`${component.name}`][`${component.endpoint}`]) {
      this.loadComponents[`${component.name}`][`${component.endpoint}`] = {};
    }

    if(this.loadComponents[`${component.name}`][`${component.endpoint}`][`${component.method}`]){
      this.loadComponents[`${component.name}`][`${component.endpoint}`][`${component.method}`].data = data;
    }
  }
}