const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const Candidates = sequelize.models.Candidates;
require('dotenv').config();
describe('Candidates Model Testing', () => {
  let sequelize;

  before(async () => {
    // Create a separate Sequelize instance for the test database
    sequelize = new Sequelize(
      'testvotingapp',
      'postgres',
      process.env.PG_PASSWORD,
      {
        dialect: 'postgres',
      },
    );

    // Check if the Elections table exists
    const tableExists = await sequelize.getQueryInterface().showAllTables();
    const electionsTableExists = tableExists.includes('Candidates ');

    if (!electionsTableExists) {
      await Candidates.sync();
    }
  });

  after(async () => {
    await sequelize.close();
    await sequelize.connectionManager.close();
  });

  it('should create a new candidate', async () => {
    const candidateData = {
      name: 'Joshua',
      candidateAddress: '0xdD870fA1b7C4700F2BD7f44238821C26f7392148',
      partyName: 'JPM',
      votes: 0,
      electionId: 1,
    };

    const candidate = await Candidates.create(candidateData);

    expect(candidate).to.exist;
    expect(candidate.name).to.equal(candidateData.name);
    expect(candidate.candidateAddress).to.equal(candidateData.candidateAddress);
    expect(candidate.partyName).to.equal(candidateData.partyName);
    expect(candidate.votes).to.equal(candidateData.votes);
    expect(candidate.electionId).to.equal(candidateData.electionId);
  });
});
