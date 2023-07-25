module.exports = (app) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/api/page-tracking-controller.js')

  router.get('/latencies', [authJwt.verifyUserToken], controller.findAllLatencies)

  app.use('/api/page-trackings', router)
}
