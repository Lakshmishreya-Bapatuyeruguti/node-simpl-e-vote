const organizerAddress = '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04';

const organizerRequestBody = {
  organizerAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
  electionStarted: false,
  electionEnded: false,
  networkName: 'Sepolia',
};
const messages = {
  startedMessage: 'Election started successfully',
  endedMessage: 'Election Ended successfully',
};
module.exports = { organizerAddress, organizerRequestBody, messages };
