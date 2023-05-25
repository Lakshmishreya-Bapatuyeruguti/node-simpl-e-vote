const { sequelize } = require('../../../models');
const Elections = sequelize.models.Elections;
const addElection = async (req, res) => {
  try {
    const { organizerAddress, electionStarted, electionEnded, networkName } =
      req.body;
    const election = await Elections.create({
      organizerAddress,
      electionStarted,
      electionEnded,
      networkName,
    });
    const electionCount = await Elections.count();
    res.status(201).json({
      message: 'Election Details Created successfully',
      electionCount,
    });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = addElection;
