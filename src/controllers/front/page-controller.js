const PageService = require('../../services/page-service')
const db = require('../../models')
const FrontPage = db.FrontPage
const Op = db.Sequelize.Op

exports.getPage = async (req, res) => {

  const startTime = Date.now()
  const pageService = new PageService()

  const url = req.params[0] || '/';

  try {
    const frontPage = await FrontPage.findOne({
      include: [
        {
          attributes: ['id','title', 'description', 'keywords', 'url', 'prefix'],
          model: db.LocaleSeo,
          as: 'localeSeo',
          where: {
            url: url,
            prefix: 'front'
          }
        }
      ]
    })

    if (!frontPage) {
      const errorPage = await pageService.getStaticPage('404')
      res.status(404).send(errorPage)
    }else{
      frontPage.dataValues.structure = JSON.parse(frontPage.dataValues.structure)
      const page = await pageService.generatePage(frontPage.dataValues)

      const log = {
        userId: req.userId ?? null,
        fingerprint: req.body.data?.fingerprint ?? req.cookies.fingerprint ?? null,
        ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        isRobot: req.isRobot,
        localeSeoId: frontPage.dataValues.localeSeoId,
        startTime: startTime,
        endTime: Date.now(),
        latencyMS: Date.now() - startTime
      }

      req.trackingService.createPageLog(log)
      res.status(200).send(page)
    }

  }catch(err){
    console.log(err)
    const errorPage = await pageService.getStaticPage('500')
    res.status(404).send(errorPage)
  }
}
