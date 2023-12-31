const db = require('../../models')
const nestItems = require('../../utils/nestItems')
const Menu = db.Menu
const Op = db.Sequelize.Op

exports.create = async (req, res) => {

  try {
    const data = await Menu.create(req.body)
    res.status(200).send(data)
  } catch (error) {
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

exports.findAll = async (req, res) => {

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

  Menu.findAndCountAll({
    where: condition,
    attributes: ['id', 'name'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
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
      message: error.message || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}

exports.findOne = (req, res) => {

  const id = req.params.id

  Menu.findByPk(id, {
    attributes: ['id', 'name'],
    include: [{
      attributes: ['id', 'order', 'parent', 'menuId'],
      model: db.MenuItem,
      as: 'menuItems',
      order: [
        ['parent', 'ASC'],
        ['order', 'ASC']
      ],
      include: [
        {
          model: db.Locale,
          as: 'locales',
          where: { languageAlias: req.userLanguage }
        }
      ]
    }]
  }).then(data => {
    if (data) {
      nestItems.get(data.menuItems, null, data.name)
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

  Menu.update(req.body, {
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

  Menu.destroy({
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

exports.getMenuItems = (req, res) => {

  const menuName = req.params.name

  Menu.findOne({
    where: { name: menuName },
    include: [{
      model: db.MenuItem,
      as: 'menuItems',
      order: [
        ['parent', 'ASC'],
        ['order', 'ASC']
      ],
      include: [
        {
          model: db.LocaleSeo,
          as: 'localeSeo'
        },
        {
          where: { languageAlias: req.userLanguage },
          model: db.Locale,
          as: 'locales'
        }
      ]
    }]
  }).then(data => {
    if (data) {
      const nestedData = nestItems.get(data.menuItems, null, data.name)

      res.status(200).send(nestedData)
    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con el nombre=${menuName}.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar el nombre=' + menuName
    })
  })
}


