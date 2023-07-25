const db = require('../../models')
const Fingerprint = db.Fingerprint
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {

    const fingerprint = await Fingerprint.findOne({ where: { fingerprint: req.body.data.fingerprint } })
    
    if (!fingerprint) {
      await Fingerprint.create(req.body.data)
    }
    
    const expirationDate = new Date();
    expirationDate.setFullYear(expirationDate.getFullYear() + 10);
    
    res.cookie('fingerprint', req.body.data.fingerprint, {
      expires: expirationDate,
      httpOnly: true
    });

    res.sendStatus(200)

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
  Fingerprint.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [['createdAt', 'DESC']],
    include: [{ model: db.Customer, as: 'Customer' }]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      }
      res.status(200).send(result)
    })
    .catch(error => {
      res.status(500).send({ message: error.message || 'Algún error ha surgido al recuperar los datos.' })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id
  Fingerprint.findByPk(id, { include: [{ model: db.Customer, as: 'Customer' }] })
    .then(data => {
      if (data) {
        res.status(200).send(data)
      } else {
        res.status(404).send({ message: `No se puede encontrar el elemento con la id=${id}.` })
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Algún error ha surgido al recuperar la id=' + id })
    })
}

exports.update = (req, res) => {
  const id = req.params.id
  Fingerprint.update(req.body, { where: { id } })
    .then(num => {
      if (num == 1) {
        res.status(200).send({ message: 'El elemento ha sido actualizado correctamente.' })
      } else {
        res.status(404).send({ message: `No se puede actualizar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento o el cuerpo de la petición está vacío.` })
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Algún error ha surgido al actualiazar la id=' + id })
    })
}

exports.delete = (req, res) => {
  const id = req.params.id
  Fingerprint.destroy({ where: { id } })
    .then(num => {
      if (num == 1) {
        res.status(200).send({ message: 'El elemento ha sido borrado correctamente' })
      } else {
        res.status(404).send({ message: `No se puede borrar el elemento con la id=${id}. Tal vez no se ha encontrado el elemento.` })
      }
    })
    .catch(error => {
      res.status(500).send({ message: 'Algún error ha surgido al borrar la id=' + id })
    })
}
