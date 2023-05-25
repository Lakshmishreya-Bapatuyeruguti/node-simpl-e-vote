'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Elections', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      organizerAddress: {
        type: Sequelize.STRING,
      },
      electionStarted: {
        type: Sequelize.BOOLEAN,
      },
      electionEnded: {
        type: Sequelize.BOOLEAN,
      },
      networkName: {
        type: Sequelize.STRING,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Elections');
  },
};
