import express from "express"

const getHomePage = (req, res) => {
  res.render('home.ejs')
}

module.exports = {
  getHomePage
}