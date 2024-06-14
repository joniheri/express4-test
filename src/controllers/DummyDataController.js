let users = [
  {
    id: '1',
    name: 'Jon',
    identityNumber: 130101123123,
    emailAddress: 'jon@email.com',
    dateOfBirth: '1990-01-01',
  },
  {
    id: '2',
    name: 'Heri',
    identityNumber: 130101123121,
    emailAddress: 'heri@email.com',
    dateOfBirth: '1992-01-01',
  },
];

const getUsers = async (req, res) => {
  try {
    if (users?.length <= 0) {
      return res.send({
        status: `fail`,
        message: `Data user is Empty`,
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

module.exports = { getUsers };
