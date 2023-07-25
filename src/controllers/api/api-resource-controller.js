const ApiResourceService = require('../../services/api-resource-service')
const MenuService = require('../../services/menu-service')
const db = require('../../models')
const ApiResource = db.ApiResource
const Op = db.Sequelize.Op

exports.create = async (req, res) => {

  try{
    const apiResourceService = new ApiResourceService()
    const endpoint = await apiResourceService.generateEndpoint(req.body.tableName)
    
    const apiResource = await ApiResource.create({
      endpoint: endpoint,
      name: req.body.name,
      tableName: req.body.tableName,
      tableDefinition: req.body.tableDefinition,
      modelDefinition: req.body.modelDefinition
    })
  
    await apiResourceService.generateApiResources(req.body.tableName, req.body.tableDefinition)

    if(req.body.interface){
      const menuService = new MenuService()

      await apiResourceService.generateAdminInterface(apiResource.id)
      await menuService.addToAdminMenu(req.body.name)
    }

    res.status(200).send({
      message: 'Los recursos se han generado correctamente',
    })
  }catch(error) {
    console.log(error)

    if (error.errors) {
      res.status(422).send({
        message: error.errors
      })
    } else {
      res.status(500).send({
        message: 'Algún error ha surgido al generar los recursos.'
      })
    }
  }
}

exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = req.query.size || 5
  const offset = (page - 1) * limit
  const whereStatement = {}

  for (const key in req.query) {
    if (req.query[key] != '' && key != 'page' && key != 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  ApiResource.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  }).then(result => {
    result.meta = {
      total: result.count,
      pages: Math.ceil(result.count / limit),
      currentPage: page
    }

    res.status(200).send(result)

  }).catch(error => {
    res.status(500).send({
      message: error.message || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  ApiResource.findByPk(id, { 
    include: [
      {
        model: db.AdminComponent,
        as: 'adminComponents'
      }
    ]
  }).then(data => {
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    })
  })
}

exports.update = (req, res) => {
  
  const id = req.params.id

  ApiResource.update(req.body, {
    where: { id }
  }).then(num => {
    if (num == 1) {
      res.status(200).send({
        message: 'El elemento ha sido actualizado correctamente.'
      })
    } else {
      res.status(404).send({
        message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al actualiazar la id=' + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id

  ApiResource.destroy({
    where: { id }
  }).then(num => {
    if (num == 1) {
      res.status(200).send({
        message: 'El elemento ha sido borrado correctamente'
      })
    } else {
      res.status(404).send({
        message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al borrar la id=' + id
    })
  })
}
