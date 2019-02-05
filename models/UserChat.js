module.exports = (sequelize, DataTypes) => {
  const UserChat = sequelize.define('UserChat', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    chat_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {});
  UserChat.associate = () => {
    // associations can be defined here
  };
  return UserChat;
};
