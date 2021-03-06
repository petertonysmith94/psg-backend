const Video = (sequelize, DataTypes) => {
  // Model definition
  const Video = sequelize.define('video', {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    title:  DataTypes.STRING(100),
    date: DataTypes.DATE
  }, {
    sequelize,
    tableName: 'videos',
    timestamps: false,
    indexes: [{
      unique: true,
      fields: ['id']
    }]
  });

  return Video;
}

export default Video;