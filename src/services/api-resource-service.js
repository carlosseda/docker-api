const OpenAI = require('../utils/openai')
const fs = require('fs').promises;
const { exec } = require('child_process');
const path = require('path')
const db = require('../models')
const AdminComponent = db.AdminComponent
const naming = require('../utils/naming')
const dateUtils = require('../utils/date')

module.exports = class ApiResourceService {

  constructor() {
    this.openai = new OpenAI()
    this.data = {}
    this.resourcesDictionary = {}
  }

  async generateApiResources(tableName, tableDefinition, modelDefinition) {

    this.tableName = tableName
    this.tableDefinition = tableDefinition
    this.modelDefinition = modelDefinition
    const singularName = naming.kebabCase(await naming.singularize(this.tableName))

    this.resourcesDictionary = {
      migration: {
        folder: '../migrations',
        generateFileName: `${dateUtils.dateNow()}-create-${naming.kebabCase(this.tableName)}-table.js`,
        prompt: (templateExample) => `Toma como ejemplo cómo está estructurado esta migración que usa sequelize:
        ${templateExample}. Genera una migración semejante de sequelize que genere la tabla ${this.tableName}. ${this.tableDefinition}.
        La migración generada debe ser lo más parecida que pueda al ejemplo que te he presentado y tener los campos dichos. Solo crea una tabla por migración.`
      },
      model: {
        folder: '../models',
        generateFileName: `${singularName}.js`,
        prompt: (templateExample) => `Toma como ejemplo cómo está estructurado el siguiente modelo:
        ${templateExample}. Genera un modelo semejante que represente la siguiente migración:
        ${this.data.migration}. ${this.modelDefinition}. El modelo generado debe aplicar validaciones y mensajes de error en castellano 
        siempre que sean necesarios y ser lo más parecido que pueda al ejemplo que te he presentado. No añadas la opción underscored.`
      },
      controller: {
        folder: '../controllers/admin',
        generateFileName: `${singularName}-controller.js`,
        prompt: (templateExample) =>  `Toma como ejemplo cómo está estructurado el siguiente controlador:
        ${templateExample}. Genera un controlador semejante que utilice el siguiente modelo:
        ${this.data.model}. El controlador debe tener todas las funciones que aparecen en el ejemplo, includa openAIFilter, y ser lo más parecido que pueda a él.`
      },
      route: {
        folder: '../routes',
        generateFileName: `api-${singularName}-routes.js`,
        prompt: (templateExample) => `Toma como ejemplo cómo está estructurado este fichero de rutas:
        ${templateExample}. Genera un fichero de rutas semejante que utilice el controlador siguiente:
        ${this.data.controller}. El fichero de rutas generado debe ser lo más parecido que pueda al ejemplo, la url base debe empezar por /api/admin más el nombre del recurso y
        la ruta al controlador siempre empezará por ../controllers/admin.`
      }
    };

    try {
      
      await this.generateCode('migration')
      await this.generateCode('model')
      await this.generateCode('controller')
      await this.generateCode('route')
      await this.runMigration()

      return {
        status: 200,
        message: 'Los recursos se han generado correctamente',
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  async generateAdminInterface(apiResourceId) {

    this.resourcesDictionary = {
      form: {
        prompt: (templateExample) => `Toma como ejemplo cómo está estructurado este json que representa un formulario:
        ${templateExample}. Genera un json semejante que utilice el modelo siguiente:
        ${this.data.model}. El json generado debe hacer uso únicamente de las claves y valores presentados en el ejemplo.
        Debe tener como mínimo tabs main y ser dividido en rows y formElements. Dentro de formElements habrá los campos del modelo.
        Los validadores que puedes usar son required, onlyLetters, onlyNumbers, telephone, email, password, date, time, datetime, 
        dni, nif, cif, postalCode, creditCard, iban, url, ip, mac, image, video, audio, pdf, doc, xls, ppt y zip.
        El json generado no debe tener saltos de línea ni espacios en blanco.`
      },
      table: {
        prompt: (templateExample) => `Toma como ejemplo cómo está estructurado este json que representa una tabla:
        ${templateExample}. Genera un json semejante que utilice el modelo siguiente:
        ${this.data.model}. El json generado debe hacer uso únicamente de las claves y valores presentados en el ejemplo y tener los campos presentes en el modelo.
        El json generado no debe tener saltos de línea ni espacios en blanco.`
      },
      filter: {
        prompt: (templateExample) => `Toma como ejemplo cómo está estructurado este json que representa un formulario que sirve para filtrar datos de una tabla:
        ${templateExample}. Genera un json semejante que utilice el modelo siguiente:
        ${this.data.model}. El json generado debe hacer uso únicamente de las claves y valores presentados en el ejemplo. 
        Solo tendra los tabs filter y openAI. Dentro de formElements en filter habrá los campos más relevantes del modelo por los cuales valdría la pena filtrar. 
        No hay validadores de notnull. El json generado no debe tener saltos de línea ni espacios en blanco.`
      }
    };

    try {

      const elements = {}

      elements.form = await this.generateJson('form')
      elements.table = await this.generateJson('table')
      elements.filter = await this.generateJson('filter')

      Object.entries(elements).forEach(([key, value]) => {

        const adminComponent = {
          apiResourceId: apiResourceId,
          element: key,
          structure: JSON.parse(value)
        }
  
        AdminComponent.create(adminComponent)
      })

      return {
        status: 200,
        message: 'La Interfaz se ha generado correctamente',
      }

    } catch (error) {
      throw new Error(error)
    }
  }

  async generateJson(resource) {
    const templateFile = await fs.readFile(path.join(__dirname, `../templates/${resource}.json`), 'utf8');
    const templateExample = templateFile.replace(/\s/g, '');

    this.openai.setCompletion('resourceGenerator', this.resourcesDictionary[resource].prompt(templateExample));
    const answer = await this.openai.getAnswer();
    this.data[resource] = this.openai.extractCode(answer);

    return this.data[resource];
  }

  async generateCode(resource) {
    const templateFile = await fs.readFile(path.join(__dirname, `../templates/${resource}.js`), 'utf8');
    const templateExample = templateFile.toString();

    this.openai.setCompletion('resourceGenerator', this.resourcesDictionary[resource].prompt(templateExample));
    const answer = await this.openai.getAnswer();
    this.data[resource] = this.openai.extractCode(answer);

    const fileName = this.resourcesDictionary[resource].generateFileName;
    const filePath = path.join(__dirname, `${this.resourcesDictionary[resource].folder}/${fileName}`);
    await fs.writeFile(filePath, this.data[resource]);

    return filePath;
  }

  async generateEndpoint(tableName) {

    const tables = await db.sequelize.getQueryInterface().showAllTables()

    if(tables.includes(tableName)) {
      throw new Error(error)
    }

    const endpoint = `${naming.kebabCase(tableName)}`

    return endpoint
  }

  async runMigration() {
    return new Promise((resolve, reject) => {
      exec('npx sequelize db:migrate', { cwd: path.resolve(__dirname, '../') }, (error, stdout, stderr) => {
        if (error) {
          console.error(`Error al ejecutar la migración: ${error.message}`);
          reject(error);
        } else if (stderr) {
          console.error(`Error al ejecutar la migración: ${stderr}`);
          reject(stderr);
        } else {
          console.log('Migración completada con éxito');
          resolve(stdout);
        }
      });
    });
  }
}

