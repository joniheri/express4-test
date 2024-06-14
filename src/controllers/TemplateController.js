exports.template = async (req, res) => {
  try {
    return res.send({
      status: `success`,
      message: `Success`,
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
