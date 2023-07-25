const db = require('../../models')
const LocaleSeo = db.LocaleSeo
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  LocaleSeo.create(req.body).then(data => {
    res.status(200).send(data)
  }).catch(error => {
    if (error.errors) {
      res.status(422).send({
        message: error.errors
      })
    } else {
      res.status(500).send({
        message: 'Algún error ha surgido al generar los recursos.'
      })
    }
  })
}

exports.findAll = async (req, res) => {

  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (page - 1) * limit

  const whereStatement = {}
  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  LocaleSeo.findAndCountAll({
    where: condition,
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
        message: 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = async (req, res) => {

  const id = req.params.id

  try{
    const data = await LocaleSeo.findByPk(id, {
      include: [{
        model: db.LocaleSeoSlug,
        as: 'slugs'
      }]
    })

    if (data) {

      res.status(200).send(data)

    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento con la id=${id}.`
      })
    }
  }catch(error){
    console.log(error)

    res.status(500).send({
      message: 'Algún error ha surgido al recuperar la id=' + id
    })
  }
}

exports.update = (req, res) => {
  const id = req.params.id

  LocaleSeo.update(req.body, {
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

  LocaleSeo.destroy({
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

exports.selectOptions = async (req, res) => {
  try{
    const data = await LocaleSeo.findAll({
      attributes: [ 
        ['id', 'id'],
        ['title', 'name']
      ],
      order: [['title', 'ASC']]
    })

    res.status(200).send(data)

    return

  }catch (error) {
    
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar los datos.'
    })

    return
  }
}

