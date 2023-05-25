'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Candidates extends Model {
    static associate(models) {
      Candidates.belongsTo(models.Elections, { foreignKey: 'electionId' });
    }
  }
  Candidates.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      candidateAddress: DataTypes.STRING,
      partyName: DataTypes.STRING,
      votes: DataTypes.INTEGER,
      electionId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Elections', // Name of the referenced table
          key: 'id', // Primary key of the referenced table
        },
      },
    },
    {
      sequelize,
      modelName: 'Candidates',
      timestamps: false,
    },
  );

  return Candidates;
};
