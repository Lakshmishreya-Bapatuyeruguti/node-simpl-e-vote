const { sequelize } = require('../../../models');
const Elections = sequelize.models.Elections;
const startElection = async (req, res) => {
  try {
    const { connectedAddress } = req.body;
    const latestElection = await Elections.findOne({
      where: {
        organizerAddress: connectedAddress,
      },
      order: [['id', 'DESC']],
    });

    if (!latestElection) {
      return res
        .status(404)
        .json({ error: 'No election found for the organizer.' });
    }

    const election = await Elections.findOne({
      where: {
        id: latestElection.id,
      },
    });

    await election.update({ electionStarted: true });
    res
      .status(201)
      .json({ message: 'Election started successfully', election });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error.' });
  }
};
module.exports = startElection;
