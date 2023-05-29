'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Elections',
      [
        {
          id: 1,
          organizerAddress: '0x03C6FcED478cBbC9a4FAB34eF9f40767739D1Ff7',
          electionStarted: false,
          electionEnded: false,
          networkName: Mumbai,
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Elections', null, {});
  },
};
