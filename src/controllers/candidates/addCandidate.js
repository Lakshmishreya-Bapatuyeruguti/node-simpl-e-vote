const { sequelize } = require('../../../models');
const Candidates = sequelize.models.Candidates;
const Elections = sequelize.models.Elections;
const addCandidate = async (req, res) => {
  try {
    const { name, candidateAddress, partyName, connectedAddress } = req.body;
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

    const candidate = await Candidates.create({
      name,
      candidateAddress,
      partyName,
      votes: 0,
      electionId: latestElection.id,
    });
    console.log(candidate, '..............');
    res.status(201).json({ message: 'Candidate Details Created successfully' });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = addCandidate;
