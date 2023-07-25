module.exports = (app) => {
  const router = require('express').Router()
  const authJwt  = require("../middlewares/auth-jwt.js");
  const controller = require('../controllers/admin/page-controller.js')

  router.get('/*', [authJwt.verifyUserToken], controller.getPage)

  app.use('/admin', router)
}
