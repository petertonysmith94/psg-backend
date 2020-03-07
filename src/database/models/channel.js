const Channel = (sequelize, DataTypes) => {
  // Model definition
  const Channel = sequelize.define('channel', {
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
      timestamps: false,
      indexes: [{
        unique: true,
        fields: ['id']
      }]
    }
  );

  return Channel;
}

export default Channel;