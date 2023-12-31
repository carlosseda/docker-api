const OpenAI = require('../../utils/openai')
const db = require('../../models')
const MODELNAME = db.MODELNAME
const Op = db.Sequelize.Op

exports.create = async (req, res) => {
  try {
    const data = await MODELNAME.create(req.body)
    res.status(200).send(data)
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Algún error ha surgido al insertar el dato.',
      errors: error.errors
    })
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

  MODELNAME.findAndCountAll({
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
        message: error.message || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  MODELNAME.findByPk(id).then(data => {
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

  MODELNAME.update(req.body, {
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

  MODELNAME.destroy({
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

exports.openAIFilter = async (req, res) => {
  let prompt = `
        {
            mysqlGenerator: true,
            table: TABLENAME,
            tableStructure: [name,surname,identifyNumber,startingServiceDate,onService,email,phone,mobile,address,province,postalCode,township],
            question: "prompt",
            config: {
                selectFields: [id,name,surname,email], 
                whereDefault: {deletedAt: null}, 
                like: true
            }
        } 
    `

  prompt = prompt.replace(/\s+/g, '')
  prompt = prompt.replace('prompt', `Mostrar los que ${req.body.prompt}`)

  const openAI = new OpenAI()

  try {
    openAI.setCompletion('mysqlGenerator', prompt)
    let data = await openAI.getAnswer()
    const bannedWords = /DROP|UPDATE|DELETE|INSERT|ALTER|CREATE|TRUNCATE/

    if (bannedWords.test(data)) {
      data = 'SELECT * FROM TABLENAME'
    }

    const page = req.query.page || 1
    const limit = req.query.size || 1
    const offset = (page - 1) * limit

    const result = await db.sequelize.query(
      data,
      {
        type: db.sequelize.QueryTypes.SELECT,
        limit,
        offset
      }
    )

    res.status(200).send(result)
  } catch (error) {
    console.log(error)
    res.status(500).send({
      message: 'No ha sido posible filtrar.'
    })
  }
}
