module.exports = (app) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/api/email-controller.js')

  router.post('/', [authJwt.verifyUserToken], controller.create)
  router.post('/send-email', [authJwt.verifyUserToken], controller.sendEmail)
  router.get('/', [authJwt.verifyUserToken], controller.findAll)
  router.get('/:id', [authJwt.verifyUserToken], controller.findOne)
  router.put('/:id', [authJwt.verifyUserToken], controller.update)
  router.delete('/:id', [authJwt.verifyUserToken], controller.delete)

  app.use('/api/emails', router)
}
