const db = require('../../models')
const User = db.User
const Op = db.Sequelize.Op

exports.create = (req, res) => {

  User.create(req.body).then(async data => {

    await req.imageService.resizeImages('user', data.id, req.body.images)
    req.cacheService.hydrateCache('admin','usuarios','users', User, ['id', 'name', 'email'])

    res.status(200).send(data)

  }).catch(error => {
    console.log(error)

    if (error.errors) {
      res.status(422).send({
        message: error.errors
      })
    } else {
      res.status(500).send({
        message: 'Algún error ha surgido al insertar el dato.'
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

  User.findAndCountAll({
    where: condition,
    attributes: ['id', 'name', 'email'],
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

exports.findOne = (req, res) => {
  const id = req.params.id

  User.findByPk(id, {
    attributes: ['id', 'name', 'email']
  }).then(async data => {

    if (data) {

      let images = await req.imageService.getAdminImages('user', data.id);

      data.dataValues.images = images;

      res.status(200).send(data);

    } else {
      res.status(404).send({
        message: `No se puede encontrar el elemento.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al recuperar el elemento.'
    })
  })
}

exports.update = (req, res) => {
  const id = req.params.id

  if(req.body.password == ''){
    delete req.body.password;
  }

  User.update(req.body, {
    where: { id }
  }).then(async num => {
    if (num == 1) {

      if(req.body.images && req.body.images.length > 0){
        await req.imageService.deleteImages('user', id);
        await req.imageService.resizeImages('user', id, req.body.images);
      }

      res.status(200).send({
        message: 'El elemento ha sido actualizado correctamente.'
      })
    } else {
      res.status(404).send({
        message: `No se puede actualizar el elemento. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al actualiazar el elemento.'
    })
  })
}

exports.delete = (req, res) => {
  
  const id = req.params.id

  User.destroy({
    where: { id }
  }).then(num => {
    if (num == 1) {

      req.imageService.deleteImages();

      res.status(200).send({
        message: 'El elemento ha sido borrado correctamente'
      })
    } else {
      res.status(404).send({
        message: `No se puede borrar el elemento. Tal vez no se ha encontrado el elemento.`
      })
    }
  }).catch(error => {
    res.status(500).send({
      message: 'Algún error ha surgido al borrar el elemento.'
    })
  })
}
