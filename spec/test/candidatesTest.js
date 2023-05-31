const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const { execSync } = require('child_process');
const Candidates = sequelize.models.Candidates;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
const {
  organizerAddress,
  candidateRequestBody,
  messages,
  voterAddress,
} = require('../constants/candidatesConstants');
const { organizerRequestBody } = require('../constants/electionConstants');
require('dotenv').config();
describe('Candidate Model Testing', () => {
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

    await Candidates.sync();
  });

  after(async () => {
    execSync('npx sequelize-cli db:migrate:undo:all --env test', {
      stdio: 'inherit',
    });
    await sequelize.close();
    await sequelize.connectionManager.close();
  });

  it('should add candidates ', async () => {
    const token = jwt.sign(
      { connectedAddess: organizerAddress },
      process.env.JWT_SEC_KEY,
    );

    await request(app)
      .post('/api/addElection')
      .set('Authorization', `Bearer ${token}`)
      .send(organizerRequestBody);

    const response = await request(app)
      .post('/api/addCandidate')
      .set('Authorization', `Bearer ${token}`)
      .send(candidateRequestBody);
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal(messages.candidateMessage);
  });

  it('should fetch all candidates of election', async () => {
    const token = jwt.sign(
      { connectedAddess: organizerAddress },
      process.env.JWT_SEC_KEY,
    );

    const response = await request(app)
      .get('/api/showCandidates/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
  });

  it('should add votes ', async () => {
    const token = jwt.sign(
      { connectedAddess: voterAddress },
      process.env.JWT_SEC_KEY,
    );

    const response = await request(app)
      .put('/api/addVote/0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.candidate.votes).to.equal(1);
    expect(response.body.message).to.equal(messages.voterMessage);
  });
});
