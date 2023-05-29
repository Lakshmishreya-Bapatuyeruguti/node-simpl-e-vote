const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const { execSync } = require('child_process');
const Elections = sequelize.models.Elections;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const {
  organizerAddress,
  organizerRequestBody,
  messages,
} = require('../constants/electionConstants');
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
      { connectedAddess: organizerAddress },
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
      { connectedAddess: organizerAddress },
      process.env.JWT_SEC_KEY,
    );
    const response = await request(app)
      .post('/api/addElection')
      .set('Authorization', `Bearer ${token}`)
      .send(organizerRequestBody);
    expect(response.status).to.equal(201);
  });

  it('should start the election ', async () => {
    const token = jwt.sign(
      { connectedAddess: organizerAddress },
      process.env.JWT_SEC_KEY,
    );
    const requestBody = {
      connectedAddress: organizerAddress,
    };
    const response = await request(app)
      .put('/api/startElection')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);

    expect(response.status).to.equal(201);
    expect(response.body.election.electionStarted).to.be.true;
    expect(response.body.message).to.be.equal(messages.startedMessage);
  });

  it('should end the election ', async () => {
    const token = jwt.sign(
      { connectedAddess: organizerAddress },
      process.env.JWT_SEC_KEY,
    );
    const requestBody = {
      connectedAddress: organizerAddress,
    };
    const response = await request(app)
      .put(`/api/endElection/1`)
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);
    expect(response.status).to.equal(201);
    expect(response.body.election.electionStarted).to.be.false;
    expect(response.body.election.electionEnded).to.be.true;
    expect(response.body.message).to.be.equal(messages.endedMessage);
  });
});
