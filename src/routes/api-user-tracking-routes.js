module.exports = (app) => {
  const router = require('express').Router()
  const authJwt = require('../middlewares/auth-jwt.js')
  const controller = require('../controllers/api/user-tracking-controller.js')

  router.post('/', controller.create)
  router.get('/:userId', [authJwt.verifyUserToken], controller.findUserLogs)

  app.use('/api/user-trackings', router)
}
