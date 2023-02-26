import express from "express"
import db from '../models/index'

const getHomePage = async (req, res) => {
  try {
    let data = await db.User.findAll()

    res.render('home.ejs', { data: JSON.stringify(data) })
  } catch (e) {
    console.log()
  }
}

module.exports = {
  getHomePage
}