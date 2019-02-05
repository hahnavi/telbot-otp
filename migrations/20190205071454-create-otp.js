module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('otps', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    otp: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    exp: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    created_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updated_at: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('otps'),
};
