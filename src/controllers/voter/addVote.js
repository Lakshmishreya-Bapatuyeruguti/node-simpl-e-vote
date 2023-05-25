const { sequelize } = require('../../../models');
const Candidates = sequelize.models.Candidates;
const addVote = async (req, res) => {
  try {
    console.log(req.params.address);
    const candidate = await Candidates.findOne({
      where: { candidateAddress: req.params.address },
    });
    await candidate.update({ votes: candidate.votes + 1 });
    res.status(201).json({ message: 'Vote Added successfully' });
  } catch (error) {
    res.status(501).json({ message: 'INTERNAL SERVER ERROR' });
  }
};
module.exports = addVote;
