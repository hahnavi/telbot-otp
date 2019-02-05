
module.exports = (sequelize, DataTypes) => {
  const Otp = sequelize.define('Otp', {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  }, {});
  Otp.associate = () => {
    // associations can be defined here
  };
  return Otp;
};
