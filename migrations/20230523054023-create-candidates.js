'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Candidates', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      candidateAddress: {
        type: Sequelize.STRING,
      },
      partyName: {
        type: Sequelize.STRING,
      },
      votes: Sequelize.INTEGER,
      electionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Elections', // Name of the referenced table
          key: 'id', // Primary key of the referenced table
        },
        onUpdate: 'CASCADE', // Optional cascade onUpdate behavior
        onDelete: 'CASCADE', // Optional cascade onDelete behavior
      },
    });

    await queryInterface.addConstraint('Candidates', {
      fields: ['electionId'],
      type: 'foreign key',
      name: 'fk_candidates_electionId', // Optional constraint name
      references: {
        table: 'Elections',
        field: 'id',
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Candidates');
  },
};
