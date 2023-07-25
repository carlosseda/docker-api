const db = require('../../models')
const MenuItem = db.MenuItem
const Op = db.Sequelize.Op

exports.create = (req, res) => {

  req.body.menuId = req.body.parentFormId

  MenuItem.create(req.body).then(async data => {

    await req.localeService.create('menu-item', data.id, req.body.locales)

    res.status(200).send(data)

  }).catch(error => {
    if (error.errors) {
      res.status(422).send({
        message: error.errors
      })
    } else {
      console.log(error)
      res.status(500).send({
        message: 'Algún error ha surgido al generar los recursos.'
      })
    }
  })
}

exports.findAll = (req, res) => {
  
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit

  const whereStatement = {}
  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  MenuItem.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
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

  MenuItem.findByPk(id, {
    include: [
      {
        attributes: ['languageAlias', 'key', 'value'],
        model: db.Locale,
        as: 'locales'
      }
    ]
  }).then(data => {
    if (data) {
      data.dataValues.link = data.localeSeoId ? 'localeSeoId' : 
                            data.localeSeoSlugId ? 'localeSeoSlugId' : 
                            data.customUrl ? 'customUrl' : 
                            null;
        
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

  MenuItem.update(req.body, {
    where: { id }
  }).then(async num => {
    if (num == 1) {
      await req.localeService.update('menu-item', id, req.body.locales)

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
      message: 'Algún error ha surgido al actualizar la id=' + id
    })
  })
}

exports.delete = (req, res) => {
  const id = req.params.id

  MenuItem.destroy({
    where: { id }
  }).then(num => {
    if (num == 1) {
      req.localeService.delete('menu-item', id)

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

exports.updateOrder = async (req, res) => {

  const data = JSON.parse(req.body.data);

  const items = await Promise.all(data.map((item) => {
    MenuItem.update(item, { 
      where: { 
        id: item.id 
      } 
    }).then(num => {
      if (num == 1) {
        return item;
      } else {
        res.status(404).send({
          message: `No se puede actualizar el elemento con la id=${item.id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
        })
      }
    }).catch(error => {
      res.status(500).send({
        message: 'Algún error ha surgido al actualiazar la id=' + item.id
      })
    })
  }))

  res.status(200).send({
    message: 'El orden de los elementos ha sido actualizado correctamente.'
  })
}
