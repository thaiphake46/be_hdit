import express from "express";
import homeController from '../controller/homeController'

const router = express.Router()

const initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage)
  router.get('/hoidanit', (req, res) => {
    res.send('hello with hoidanit')
  })

  return app.use('/', router)
}

module.exports = initWebRoutes