'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tasks extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Projects, {
        foreignKey: 'project_id'
      });
    }
  };
  Tasks.init({
    title: DataTypes.STRING,
    taskRelevance: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    project_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tasks',
  });
  return Tasks;
};