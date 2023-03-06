import db from '../models/index'
import crudService from '../service/crudService'

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll()

    res.render('home.ejs', { data: JSON.stringify(data) })
  } catch (e) {
    console.log(e)
  }
}

const getCRUD = (req, res) => {
  res.render('crud.ejs')
}

const postCRUD = async (req, res) => {
  let message = await crudService.createNewUser(req.body)
  console.log(message)
  res.send('post crud ' + JSON.stringify(req.body))
}

const displayGetCRUD = async (req, res) => {
  let data = await crudService.getAllUser()
  res.render('displayCRUD.ejs', { dataUser: data })
}

module.exports = {
  getHomePage,
  getCRUD,
  postCRUD,
  displayGetCRUD,
}