const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const { execSync } = require('child_process');
const Elections = sequelize.models.Elections;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
require('dotenv').config();
describe('Election Model Testing', () => {
  let sequelize;

  before(async () => {
    sequelize = new Sequelize(
      'testvotingapp',
      'postgres',
      process.env.PG_PASSWORD,
      {
        dialect: 'postgres',
      },
    );
    execSync('npx sequelize-cli db:migrate --env test', {
      stdio: 'inherit',
    });
    await Elections.sync();
  });

  after(async () => {
    execSync('npx sequelize-cli db:migrate:undo:all --env test', {
      stdio: 'inherit',
    });
    await sequelize.close();
    await sequelize.connectionManager.close();
  });

  it('should fetch all elections of network', async () => {
    const token = jwt.sign(
      { connectedAddess: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c' },
      process.env.JWT_SEC_KEY,
    );
    const response = await request(app)
      .get('/api/showElections/Mumbai')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body).to.be.an('object');
    const elections = response.body.elections;
    elections.forEach((election) => {
      expect(election.networkName).to.equal('Mumbai');
    });
  });

  it('should add election ', async () => {
    const token = jwt.sign(
      { connectedAddess: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04' },
      process.env.JWT_SEC_KEY,
    );
    const requestBody = {
      organizerAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
      electionStarted: false,
      electionEnded: false,
      networkName: 'Sepolia',
    };
    const response = await request(app)
      .post('/api/addElection')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);
    expect(response.status).to.equal(201);
  });

  it('should start the election ', async () => {
    const token = jwt.sign(
      { connectedAddess: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04' },
      process.env.JWT_SEC_KEY,
    );
    const requestBody = {
      connectedAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
    };
    const response = await request(app)
      .put('/api/startElection')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(response.status).to.equal(201);
    expect(response.body.election.electionStarted).to.be.true;
    expect(response.body.message).to.be.equal('Election started successfully');
  });

  it('should end the election ', async () => {
    const token = jwt.sign(
      { connectedAddess: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04' },
      process.env.JWT_SEC_KEY,
    );
    const requestBody = {
      connectedAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
    };
    const response = await request(app)
      .put(`/api/endElection/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);
    expect(response.status).to.equal(201);
    expect(response.body.election.electionStarted).to.be.false;
    expect(response.body.election.electionEnded).to.be.true;
    expect(response.body.message).to.be.equal('Election Ended successfully');
  });
});
