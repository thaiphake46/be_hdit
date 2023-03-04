import bcrypt from 'bcryptjs'
import db from '../models/index';

let salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password)
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        image: null,
        roleId: data.roleId === '1' ? true : false,
        positionId: null,
      })
      resolve('successful !!!')
    } catch (error) {
      reject(error)
    }
  })
}

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash)
    } catch (error) {
      reject(error)
    }
  })
}

module.exports = {
  createNewUser
}