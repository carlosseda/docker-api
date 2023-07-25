module.exports = (app) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/api/api-tracking-controller.js')

  router.get('/errors/:httpCode', [authJwt.verifyUserToken], controller.findAllErrors)

  app.use('/api/api-trackings', router)
}
