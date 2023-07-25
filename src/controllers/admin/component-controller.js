const db = require('../../models')
const AdminComponent = db.AdminComponent
const Op = db.Sequelize.Op

exports.create = (req, res) => {

  try {
    JSON.parse(req.body.structure);
  } catch (error) {
    res.status(500).send({
      errors: [
        {message:'El JSON no es válido o no está correctamente formateado.'}
      ]
    })
  }

  req.body.structure = JSON.stringify(JSON.parse(req.body.structure))
  req.body.apiResourceId = req.body.parentFormId

  AdminComponent.create(req.body).then(data => {
    AdminComponent.findAndCountAll({
      attributes: ['id', 'element'],
      where: {apiResourceId: req.body.apiResourceId},
      order: [['createdAt', 'ASC']]
    }).then( result => {
      res.status(200).send(result)
    }).catch(error => {
      res.status(500).send({
        message: error.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
  }).catch(error => {
    res.status(500).send({
      message: error.errors || 'Algún error ha surgido al insertar el dato.'
    })
  })
}

exports.findAll = (req, res) => {
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit
  const whereStatement = {}

  for (const key in req.query) {
    if (req.query[key] != '' && key != 'page' && key != 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  AdminComponent.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [['createdAt', 'ASC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      }

      res.status(200).send(result)
    }).catch(error => {
      res.status(500).send({
        message: error.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  AdminComponent.findByPk(id).then(data => {
    if (data) {
      res.status(200).send(data)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: error.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}

exports.update = (req, res) => {

  const id = req.params.id

  try {
    JSON.parse(req.body.structure);
  } catch (error) {
    res.status(500).send({
      errors: [
        {message:'El JSON no es válido o no está correctamente formateado.'}
      ]
    })
  }

  req.body.structure = JSON.stringify(JSON.parse(req.body.structure))

  AdminComponent.update(req.body, {
    where: { id }
  }).then(num => {

    if (num == 1) {
      AdminComponent.findAndCountAll({
        attributes: ['id', 'element'],
        where: {apiResourceId: req.body.apiResourceId},
        order: [['createdAt', 'ASC']]
      }).then( result => {
        res.status(200).send(result)
      }).catch(error => {
        res.status(500).send({
          message: error.errors || 'Algún error ha surgido al recuperar los datos.'
        })
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

exports.delete = async (req, res) => {

  const id = req.params.id

  adminComponent = await AdminComponent.findByPk(id)

  AdminComponent.destroy({
    where: { id }
  }).then(num => {

    if (num == 1) {
      AdminComponent.findAndCountAll({
        attributes: ['id', 'element'],
        where: {apiResourceId: adminComponent.dataValues.apiResourceId},
        order: [['createdAt', 'ASC']]
      }).then( result => {
        res.status(200).send({
          message: 'El elemento ha sido borrado correctamente.',
          result: result
        })
      }).catch(error => {
        res.status(500).send({
          message: error.errors || 'Algún error ha surgido al recuperar los datos.'
        })
      })
    } else {
      res.status(404).send({
        message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.`
      })
    }
  }).catch(error => {
    console.log(err)
    res.status(500).send({
      message: 'Algún error ha surgido al borrar la id=' + id
    })
  })
}
