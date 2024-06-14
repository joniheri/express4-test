const { User: UserModel } = require('../../models');
const joi = require('joi').extend(require('@joi/date'));

const getUsers = async (_, res) => {
  try {
    const users = await UserModel.findAll();
    if (!users) {
      return res.send({
        status: `fail`,
        message: `Data user Not Found`,
      });
    }

    return res.send({
      status: `success`,
      message: `get users Success`,
      data: users,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: `fail`,
      message: `error catch`,
      error: error?.message,
    });
  }
};

const getUsersById = async (req, res) => {
  try {
    const id = req.params.id;

    const userById = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    if (!userById) {
      return res.send({
        status: `fail`,
        message: `Data user by id: ${id} Not Found`,
      });
    }

    return res.send({
      status: `success`,
      message: `get users Success`,
      data: userById,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: `fail`,
      message: `error catch`,
      error: error?.message,
    });
  }
};

const addUser = async (req, res) => {
  try {
    const dataInput = req.body;

    // ValidationInput
    const validationInput = joi.object({
      identityNumber: joi.string().required().min(3),
      emailAddress: joi.string().required().min(3).email(),
      name: joi.string().required().min(3),
      dateOfBirth: joi.date().format('YYYY-MM-DD').required(),
    });
    const validationInputError = validationInput.validate(dataInput).error;
    if (validationInputError) {
      return res.status(400).send({
        status: `fail`,
        message: validationInputError.details[0].message,
      });
    }
    // End ValidationInput

    // CheckIdentityNumberAlreadyExist
    const dataUserByIdentityNumber = await UserModel.findOne({
      where: {
        identityNumber: dataInput.identityNumber,
      },
    });
    if (dataUserByIdentityNumber) {
      return res.status(400).send({
        status: `fail`,
        message: `User with Identity Number:${dataInput.identityNumber} Already Exist`,
      });
    }
    // End CheckIdentityNumberAlreadyExist

    // CheckEmailAlreadyExist
    const dataUserByEmail = await UserModel.findOne({
      where: {
        emailAddress: dataInput.emailAddress,
      },
    });
    if (dataUserByEmail) {
      return res.status(400).send({
        status: `fail`,
        message: `User with email:${dataInput.emailAddress} Already Exist`,
      });
    }
    // End CheckEmailAlreadyExist

    // ProcessInsertData
    const insertData = await UserModel.create({
      identityNumber: dataInput.identityNumber,
      emailAddress: dataInput.emailAddress,
      name: dataInput.name,
      dateOfBirth: dataInput.dateOfBirth,
    });
    if (!insertData) {
      return res.status(400).send({
        status: `fail`,
        message: `Add data user Fail`,
      });
    }
    // End ProcessInsertData

    return res.send({
      status: `success`,
      message: `Add user Success`,
      dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: `fail`,
      message: `error catch`,
      error: error?.message,
    });
  }
};

const editUser = async (req, res) => {
  try {
    const id = req.params.id;
    const dataInput = req.body;

    // CheckIdAlreadyExist
    const userById = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    if (!userById) {
      return res.status(400).send({
        status: `fail`,
        message: `User with ID: ${id} Not Found`,
      });
    }
    // End CheckIdAlreadyExist

    // ValidationInput
    const validationInput = joi.object({
      identityNumber: joi.string().min(3),
      emailAddress: joi.string().min(3).email(),
      name: joi.string().min(3),
      dateOfBirth: joi.date().format('YYYY-MM-DD'),
    });
    const validationInputError = validationInput.validate(dataInput).error;
    if (validationInputError) {
      return res.status(400).send({
        status: `fail`,
        message: validationInputError.details[0].message,
      });
    }
    // End ValidationInput

    // ProcessUpdate
    const processUpdate = await UserModel.update(
      {
        identityNumber: dataInput.identityNumber,
        emailAddress: dataInput.emailAddress,
        name: dataInput.name,
        dateOfBirth: dataInput.dateOfBirth,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (!processUpdate) {
      return res.status(400).send({
        status: 'fail',
        message: `Edit data Fail`,
      });
    }
    // End ProcessUpdate

    return res.send({
      status: `success`,
      message: `Edit data Success`,
      dataInput,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: `fail`,
      message: `error catch`,
      error: error?.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;

    // CheckIdAlreadyExist
    const userById = await UserModel.findOne({
      where: {
        id: id,
      },
    });
    if (!userById) {
      return res.status(400).send({
        status: `fail`,
        message: `User with ID: ${id} Not Found`,
      });
    }
    // End CheckIdAlreadyExist

    // DeleteUser
    const deleteUser = await UserModel.destroy({
      where: {
        id: id,
      },
    });
    if (!deleteUser) {
      return res.status(400).send({
        status: `fail`,
        message: `Delete data Fail`,
      });
    }
    // end DeleteUser

    return res.send({
      status: `success`,
      message: `Delete data Success`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      status: `fail`,
      message: `error catch`,
      error: error?.message,
    });
  }
};

module.exports = {
  getUsers,
  getUsersById,
  addUser,
  editUser,
  deleteUser,
};
