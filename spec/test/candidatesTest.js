const { expect } = require('chai');
const { Sequelize } = require('sequelize');
const { sequelize } = require('../../models');
const { execSync } = require('child_process');
const Candidates = sequelize.models.Candidates;
const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../../app');
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
      { connectedAddess: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04' },
      process.env.JWT_SEC_KEY,
    );
    const requestBodyOrg = {
      organizerAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
      electionStarted: false,
      electionEnded: false,
      networkName: 'Sepolia',
    };
    await request(app)
      .post('/api/addElection')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBodyOrg);

    const requestBody = {
      name: 'Lakshmi',
      candidateAddress: '0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C',
      partyName: 'LPS',
      connectedAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
    };
    const response = await request(app)
      .post('/api/addCandidate')
      .set('Authorization', `Bearer ${token}`)
      .send(requestBody);
    expect(response.status).to.equal(201);
    expect(response.body.message).to.equal(
      'Candidate Details Created successfully',
    );
  });

  it('should fetch all candidates of election', async () => {
    const token = jwt.sign(
      { connectedAddess: '0xCA35b7d915458EF540aDe6068dFe2F44E8fa733c' },
      process.env.JWT_SEC_KEY,
    );

    const response = await request(app)
      .get('/api/showCandidates/1')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
  });

  it('should add votes ', async () => {
    const token = jwt.sign(
      { connectedAddess: '0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC' },
      process.env.JWT_SEC_KEY,
    );

    const response = await request(app)
      .put('/api/addVote/0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).to.equal(201);
    expect(response.body.candidate.votes).to.equal(1);
    expect(response.body.message).to.equal('Vote Added successfully');
  });
});
