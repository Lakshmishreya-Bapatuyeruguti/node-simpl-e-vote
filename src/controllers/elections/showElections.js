const { sequelize } = require('../../../models');
const Elections = sequelize.models.Elections;
const showElections = async (req, res) => {
  try {
    console.log('...........', req.params.networkname);
    const allElections = await Elections.findAll({
      where: {
        networkName: req.params.networkname,
      },
    });
    res.status(201).json({ elections: allElections });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = showElections;
