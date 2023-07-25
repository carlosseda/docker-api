module.exports = (app) => {
  const auth = require('../controllers/auth/user-auth-controller.js')

  app.post('/api/auth/users/signin', auth.signin)
}
