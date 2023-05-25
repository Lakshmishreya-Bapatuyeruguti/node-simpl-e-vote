const { sequelize } = require('../../../models');
const Candidates = sequelize.models.Candidates;
const showCandidates = async (req, res) => {
  try {
    console.log(req.params.id);
    const candidates = await Candidates.findAll({
      where: { electionId: req.params.id },
    });
    res.status(201).json({ candidates });
  } catch (error) {
    res.status(422).json({ error });
  }
};
module.exports = showCandidates;
