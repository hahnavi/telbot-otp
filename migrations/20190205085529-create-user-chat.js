
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('user_chats', {
    user_id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.STRING,
    },
    chat_id: {
      allowNull: false,
      type: Sequelize.INTEGER,
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
  down: queryInterface => queryInterface.dropTable('user_chats'),
};
