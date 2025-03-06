'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('Courses', 'imageUrl', Sequelize.STRING)
    await queryInterface.addColumn('Courses', 'trailerUrl', Sequelize.STRING)
    await queryInterface.addColumn('Courses', 'membersJoined', Sequelize.INTEGER)
    await queryInterface.addColumn('Courses', 'level', Sequelize.STRING)
    await queryInterface.addColumn('Courses', 'instructorName', Sequelize.STRING)
    await queryInterface.addColumn('Courses', 'instructorAvatar', Sequelize.STRING)
    await queryInterface.addColumn('Courses', 'instructorBio', Sequelize.STRING)
    await queryInterface.addColumn('Courses', 'curriculum', Sequelize.ARRAY(Sequelize.STRING))
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Courses', 'imageUrl')
    await queryInterface.removeColumn('Courses', 'trailerUrl')
    await queryInterface.removeColumn('Courses', 'membersJoined')
    await queryInterface.removeColumn('Courses', 'level')
    await queryInterface.removeColumn('Courses', 'instructorName')
    await queryInterface.removeColumn('Courses', 'instructorAvatar')
    await queryInterface.removeColumn('Courses', 'instructorBio')
    await queryInterface.removeColumn('Courses', 'curriculum')
  }
};
