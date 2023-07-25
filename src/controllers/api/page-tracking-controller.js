const db = require('../../models')
const Op = db.Sequelize.Op
const PageTracking = db.PageTracking

exports.findAllLatencies = async (req, res) => {
  
  const page = req.query.page || 1
  const limit = parseInt(req.query.size) || 5
  const offset = (page - 1) * limit

  const whereStatement = {}

  for (const key in req.query) {
    if (req.query[key] != '' && key != 'page' && key != 'size') {
      whereStatement[key] = { [Op.substring]: req.query[key] }
    }
  }

  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  PageTracking.findAndCountAll({
    where: condition,
    limit,
    offset,
    attributes: [
      'localeSeoId',
      [
        db.sequelize.literal('ROUND(AVG(latencyMS))'),
        'averageLatency'
      ]
    ],
    group: ['localeSeoId'],
    order: [[db.sequelize.col('averageLatency'), 'DESC']],
    include: [
      {
        as: 'localeSeo',
        model: db.LocaleSeo,
        attributes: ['prefix', 'url']
      }
    ]
  }).then(result => {

    result.meta = {
      total: result.count.length, 
      pages: Math.ceil(result.count.length / limit),
      currentPage: page
    }

    result.rows.forEach((item) => {
      item.dataValues.url = item.localeSeo.url
      item.dataValues.prefix = item.localeSeo.prefix
      delete item.dataValues.localeSeo
      delete item.dataValues.localeSeoId
    })

    return res.status(200).send(result)
  }).catch(error => {
    res.status(500).send({
      message: error.errors || 'Algún error ha surgido al recuperar los datos.'
    })
  })
}
