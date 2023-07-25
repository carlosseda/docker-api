const PageService = require('../../services/page-service')
const db = require('../../models')
const e = require('express')
const AdminPage = db.AdminPage
const Op = db.Sequelize.Op

exports.create = (req, res) => {
  AdminPage.create(req.body).then(data => {
    res.status(200).send(data)
  }).catch(error => {
    res.status(500).send({
      message: error.errors || 'Algún error ha surgido al insertar el dato.'
    })
  })
}

exports.findAll = (req, res) => {
  const AdminPage = req.query.AdminPage || 1
  const limit = parseInt(req.query.size) || 10
  const offset = (AdminPage - 1) * limit

  const whereStatement = {}
  const condition = Object.keys(whereStatement).length > 0 ? { [Op.and]: [whereStatement] } : {}

  AdminPage.findAndCountAll({
    where: condition,
    attributes: ['id', 'name', 'url'],
    limit,
    offset,
    order: [['createdAt', 'DESC']]
  })
    .then(result => {
      result.meta = {
        total: result.count,
        AdminPages: Math.ceil(result.count / limit),
        currentAdminPage: AdminPage
      }

      res.status(200).send(result)
    }).catch(error => {
      console.log(err)
      res.status(500).send({
        message: error.errors || 'Algún error ha surgido al recuperar los datos.'
      })
    })
}

exports.findOne = (req, res) => {
  const id = req.params.id

  AdminPage.findByPk(id).then(data => {
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

  AdminPage.update(req.body, {
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

  AdminPage.destroy({
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

exports.getPage = async (req, res) => {
  const startTime = Date.now();
  const pageService = new PageService();

  const url = req.params[0] || 'admin';

  try {
    const adminPage = await AdminPage.findOne({
      include: [
        {
          attributes: ['id', 'title', 'description', 'keywords', 'url', 'prefix'],
          model: db.LocaleSeo,
          as: 'localeSeo',
          where: {
            url: url,
            prefix: 'admin'
          }
        }
      ]
    });

    if (!adminPage) {
      const errorPage = await pageService.getStaticPage('404');
      return res.status(404).send(errorPage);
    }

    adminPage.dataValues.structure = JSON.parse(adminPage.dataValues.structure);

    // const cache = await req.cacheService.getCache('admin', req.originalUrl, adminPage.dataValues.structure);

    // if (cache) {
    //   const log = createLog(req, adminPage.dataValues.localeSeoId, startTime);
    //   req.trackingService.createPageLog(log);
    //   return res.status(200).send(cache);
    // }

    const page = await pageService.generatePage(adminPage.dataValues, req.cookies);
    // await req.cacheService.generateCache('admin', req.originalUrl, adminPage.dataValues.structure, page);

    const log = createLog(req, adminPage.dataValues.localeSeoId, startTime);
    req.trackingService.createPageLog(log);
    return res.status(200).send(page);
  } catch (err) {
    console.log(err);
    const errorPage = await pageService.getStaticPage('500');
    res.status(500).send(errorPage);
  }
};

function createLog(req, localeSeoId, startTime) {
  return {
    userId: req.userId,
    fingerprint: req.body.data?.fingerprint ?? req.cookies.fingerprint ?? null,
    ip: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
    isRobot: req.isRobot,
    localeSeoId,
    startTime,
    endTime: Date.now(),
    latencyMS: Date.now() - startTime
  };
}

