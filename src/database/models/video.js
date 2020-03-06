import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  // Model definition
  const Video = sequelize.define('Video', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      title:  DataTypes.STRING(100),
      date: DataTypes.DATE
    }, {
      sequelize,
      modelName: 'Video',
      tableName: 'videos',
      indexes: [{
        unique: true,
        fields: ['id']
      }]
    }
  )

  return Video;
}