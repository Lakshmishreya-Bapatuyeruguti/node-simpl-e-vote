const organizerAddress = '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04';
const voterAddress = '0x0A098Eda01Ce92ff4A4CCb7A4fFFb5A43EBC70DC';
const candidateRequestBody = {
  name: 'Lakshmi',
  candidateAddress: '0x1aE0EA34a72D944a8C7603FfB3eC30a6669E454C',
  partyName: 'LPS',
  connectedAddress: '0xCa567E8624aCfc77DD03C7bc7037f85F8D296d04',
};
const messages = {
  candidateMessage: 'Candidate Details Created successfully',
  voterMessage: 'Vote Added successfully',
};
module.exports = {
  organizerAddress,
  candidateRequestBody,
  messages,
  voterAddress,
};
