import { DataTypes } from 'sequelize';

module.exports = (sequelize) => {
  // Model definition
  const Channel = sequelize.define('Channel', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      channelName: {
        type: DataTypes.STRING(45),
        field: 'channel_name'
      }
    }, {
      tableName: 'channels',
      indexes: [{
        unique: true,
        fields: ['id']
      }]
    }
  );

  return Channel;
}