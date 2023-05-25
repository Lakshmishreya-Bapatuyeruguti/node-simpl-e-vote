'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Elections extends Model {
    static associate(models) {
      Elections.hasMany(models.Candidates, { foreignKey: 'electionId' });
    }
  }
  Elections.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      organizerAddress: DataTypes.STRING,
      electionStarted: DataTypes.BOOLEAN,
      electionEnded: DataTypes.BOOLEAN,
      networkName: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Elections',
      timestamps: false,
    },
  );

  return Elections;
};
