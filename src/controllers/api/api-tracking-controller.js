const db = require('../../models')
const Op = db.Sequelize.Op
const ApiTracking = db.ApiTracking

exports.findAllErrors = async (req, res) => {

  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 5
  const offset = (page - 1) * limit

  const whereStatement = {
    httpCode: req.params.httpCode
  }

  for (const key in req.query) {
    if (req.query[key] != '' && key != 'page' && key != 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  ApiTracking.findAndCountAll({
    where: condition,
    limit,
    offset,
    order: [['startTime', 'DESC']],
  })
    .then(result => {
      result.meta = {
        total: result.count,
        pages: Math.ceil(result.count / limit),
        currentPage: page
      }

      result.rows.forEach(element => {
        const date = new Date(element.dataValues.endTime)

        const year = date.getFullYear()
        const month = date.getMonth() + 1 
        const day = date.getDate()
        const hour = date.getHours()
        const minutes = date.getMinutes()
        const seconds = date.getSeconds()

        element.dataValues.endTime = `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
      })

      res.status(200).send(result)

    }).catch(error => {
      res.status(500).send({
        message: 'Algún error ha surgido al recuperar los datos.'
      })
    })
}