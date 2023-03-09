import bcrypt from "bcryptjs";
import { raw } from "body-parser";
import db from "../models/index";

let salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hashPassword = await hashUserPassword(data.password);
      await db.User.create({
        email: data.email,
        password: hashPassword,
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
        phoneNumber: data.phoneNumber,
        gender: data.gender,
        image: null,
        roleId: data.roleId === "1" ? true : false,
        positionId: null,
      });
      resolve("successful !!!");
    } catch (error) {
      reject(error);
    }
  });
};

let hashUserPassword = (password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let hash = await bcrypt.hashSync(password, salt);
      resolve(hash);
    } catch (error) {
      reject(error);
    }
  });
};

const getAllUser = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let allUser = db.User.findAll({
        raw: true,
      });
      resolve(allUser);
    } catch (error) {
      reject(error);
    }
  });
};

const getInfoUserById = async (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let user = await db.User.findOne({
        where: { id: id },
        raw: true,
      });
      if (user) {
        resolve(user);
      } else {
        resolve({});
      }
    } catch (error) {
      reject(error);
    }
  });
};

const updateUserData = async (formData) => {
  return new Promise(async (resolve, reject) => {
    try {
      let infoUser = await db.User.findOne({
        where: { id: formData.id },
      });
      if (infoUser) {
        infoUser.firstName = formData.firstName;
        infoUser.lastName = formData.lastName;
        infoUser.address = formData.address;
        infoUser.phoneNumber = formData.phoneNumber;

        await infoUser.save();
        resolve();
      } else {
        resolve();
      }
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  createNewUser,
  getAllUser,
  getInfoUserById,
  updateUserData,
};
