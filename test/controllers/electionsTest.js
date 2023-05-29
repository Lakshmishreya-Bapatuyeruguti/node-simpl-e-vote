const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const Elections = sequelize.models.Elections;
require('dotenv').config();
describe('Election Model Testing', () => {
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
    const electionsTableExists = tableExists.includes('Elections');

    if (!electionsTableExists) {
      await Elections.sync();
    }
  });

  after(async () => {
    await sequelize.close();
    await sequelize.connectionManager.close();
  });

  it('should create a new election', async () => {
    const electionData = {
      organizerAddress: '0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7',
      electionStarted: false,
      electionEnded: false,
      networkName: 'Mumbai',
    };

    const election = await Elections.create(electionData);

    expect(election).to.exist;
    expect(election.organizerAddress).to.equal(electionData.organizerAddress);
    expect(election.electionStarted).to.be.false;
    expect(election.electionEnded).to.be.false;
    expect(election.networkName).to.equal(electionData.networkName);
  });
});
