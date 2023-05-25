const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 5000;
const { connect } = require('./dbConnect');
const addElectionRoute = require('./src/routes/elections/addElection');
const addCandidateRoute = require('./src/routes/candidates/addCandidate');
const startElectionRoute = require('./src/routes/elections/startElection');
const showElectionsRoute = require('./src/routes/elections/showElections');
const showCandidatesRoute = require('./src/routes/candidates/showCandidates');
const endElectionRoute = require('./src/routes/elections/endElection');
const loginRoute = require('./src/routes/auth/auth');
const addVoteRoute = require('./src/routes/voter/addVote');
const jwtAuthMiddleware = require('./src/middlewares/jwtAuthMiddleware');
require('dotenv').config();

connect();

app.use(express.json());

app.use(cors());

app.use('/api/login', loginRoute);
app.use('/api/addElection', jwtAuthMiddleware, addElectionRoute);
app.use('/api/addCandidate', jwtAuthMiddleware, addCandidateRoute);
app.use('/api/startElection', jwtAuthMiddleware, startElectionRoute);
app.use('/api/showElections', jwtAuthMiddleware, showElectionsRoute);
app.use('/api/showCandidates', jwtAuthMiddleware, showCandidatesRoute);
app.use('/api/endElection', jwtAuthMiddleware, endElectionRoute);
app.use('/api/addVote', jwtAuthMiddleware, addVoteRoute);

app.listen(PORT, () => {
  console.log('Server is up and running on port: ', PORT);
});
