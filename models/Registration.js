module.exports = (sequelize, DataTypes) => {
  const Registration = sequelize.define('Registration', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    exp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  Registration.associate = () => {
    // associations can be defined here
  };
  return Registration;
};
