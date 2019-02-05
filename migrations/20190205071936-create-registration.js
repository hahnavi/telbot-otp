
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('registrations', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    token: {
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
  down: queryInterface => queryInterface.dropTable('registrations'),
};
