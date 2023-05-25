const { sequelize } = require('../../../models');
const Elections = sequelize.models.Elections;
const startElection = async (req, res) => {
  try {
    const election = await Elections.findOne({
      where: {
        id: req.params.id,
      },
    });

    await election.update({ electionStarted: false, electionEnded: true });
    res.status(201).json({ message: 'Election Ended successfully' });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = startElection;
